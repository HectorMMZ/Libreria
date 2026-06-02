const express = require('express');
const sql = require('mssql/msnodesqlv8');
const cors = require('cors');
const app = express();

app.use(express.static(__dirname));
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// 1. Usamos EXACTAMENTE el texto que sí logró encontrar tu base de datos antes
const configSql = {
    connectionString: 'Driver={SQL Server};Server=(localdb)\\MSSQLLocalDB;Database=LibreriaQuimera;Trusted_Connection=yes;'
};

// 2. Abrimos la puerta UNA sola vez al prender el servidor
let pool;
sql.connect(configSql).then(conexion => {
    pool = conexion;
    console.log("=====================================");
    console.log("¡CONEXIÓN A SQL SERVER EXITOSA!");
    console.log("=====================================");
}).catch(error => {
    console.log("!!! ERROR AL CONECTAR A SQL !!!");
    console.log(error);
});

// --- RUTA PARA REGISTRAR ---
app.post('/api/registrar', async (req, res) => {
    console.log("Llegó un usuario nuevo:", req.body.nombre);
    try {
        await pool.request()
            .input('nombre', sql.VarChar, req.body.nombre)
            .input('apellido', sql.VarChar, req.body.apellido)
            .input('correo', sql.VarChar, req.body.correo)
            .input('password', sql.VarChar, req.body.password)
            .input('telefono', sql.VarChar, req.body.telefono)
            .query('INSERT INTO Usuarios (Nombre, Apellido, Correo, Contrasena, Telefono) VALUES (@nombre, @apellido, @correo, @password, @telefono)');

        console.log("¡Guardado exitoso!");
        res.json({ exito: true, mensaje: "¡Usuario registrado correctamente!" });
    } catch (error) {
        console.log("Error al guardar:", error);
        res.json({ exito: false, mensaje: "Hubo un error al guardar en la base de datos." });
    }
});

// --- RUTA PARA INICIAR SESIÓN ---
app.post('/api/login', async (req, res) => {
    try {
        let resultado = await pool.request()
            .input('correo', sql.VarChar, req.body.correo)
            .input('password', sql.VarChar, req.body.password)
            .query('SELECT * FROM Usuarios WHERE Correo = @correo AND Contrasena = @password');

        if (resultado.recordset.length > 0) {
            res.json({ exito: true, usuario: { nombre: resultado.recordset[0].Nombre, correo: resultado.recordset[0].Correo } });
        } else {
            res.json({ exito: false, mensaje: "Correo o contraseña incorrectos." });
        }
    } catch (error) {
        res.json({ exito: false, mensaje: "Error al iniciar sesión." });
    }
});

app.listen(3000, () => {
    console.log('SERVIDOR NODE CORRIENDO EN EL PUERTO 3000');
});