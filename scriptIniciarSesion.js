// =========================================================
// 1. ANIMACIONES DE DESLIZAMIENTO (Tus funciones originales)
// =========================================================
if (document.getElementById('Registrate')) {
    document.getElementById('Registrate').onclick = () => {
        document.getElementById('Registro').style.transform = "translateX(-420px)";
    };
}

if (document.getElementById('RegistroNuevo')) {
    document.getElementById('RegistroNuevo').onclick = () => {
        document.getElementById('Registro').style.transform = "translateX(0)";
    };
}

// =========================================================
// 2. ENVIAR REGISTRO NUEVO A LA BASE DE DATOS
// =========================================================
const btnCrearCuenta = document.getElementById('btnCrearCuenta');
if (btnCrearCuenta) {
    btnCrearCuenta.onclick = async (event) => {
        event.preventDefault(); // Evita que la página se recargue

        // AQUI CAMBIAMOS LOS NOMBRES PARA QUE COINCIDAN CON TU C# EXACTAMENTE
        const datos = {
            Nombre: document.getElementById('regNombre').value,
            Apellido: document.getElementById('regApellido').value,
            Correo: document.getElementById('regCorreo').value,
            Contrasena: document.getElementById('regPassword').value, // Era "password", C# espera "Contrasena"
            Telefono: document.getElementById('regTelefono').value
        };

        if (!datos.Nombre || !datos.Apellido || !datos.Correo || !datos.Contrasena) {
            alert("Por favor, llena los campos obligatorios.");
            return;
        }

        try {
            // ACTUALIZADO AL PUERTO 7270 Y RUTA /api/registro
            let respuesta = await fetch('https://localhost:7270/api/registro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });

            let resultado = await respuesta.json();

            if (respuesta.ok) { // C# manda status 200 si todo sale bien
                alert(resultado.mensaje);
                document.getElementById('Registro').style.transform = "translateX(0)";
            } else {
                alert("Error: " + resultado.mensaje);
            }
        } catch (error) {
            console.error(error);
            alert("No se pudo conectar con el servidor local. Verifica que Visual Studio esté en Play (Puerto 7270).");
        }
    };
}

// =========================================================
// 3. VALIDAR CUENTA E INICIAR SESIÓN (GUARDANDO LA SESIÓN)
// =========================================================
const btnIngresar = document.getElementById('btnIngresar');
if (btnIngresar) {
    btnIngresar.onclick = async (event) => {
        event.preventDefault();

        // NOMBRES EXACTOS PARA C#
        const datos = {
            Correo: document.getElementById('loginCorreo').value,
            Contrasena: document.getElementById('loginPassword').value
        };

        if (!datos.Correo || !datos.Contrasena) {
            alert("Por favor escribe tu correo y contraseña.");
            return;
        }

        try {
            // ACTUALIZADO AL PUERTO 7270 Y RUTA /api/login
            let respuesta = await fetch('https://localhost:7270/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });

            let resultado = await respuesta.json();

            if (respuesta.ok) {
                alert("¡Bienvenido a Librería Quimera!");
                
                // MÁGIA AQUÍ: Guardamos el nombre directo que nos manda tu nuevo C#
                localStorage.setItem('usuarioQuimera', JSON.stringify({
                    id_usuario: resultado.id_usuario,
                    nombre: resultado.nombre,
                    correo: datos.Correo
                }));

                // Redirigimos a la página principal
                window.location.href = "index.html";
            } else {
                alert(resultado.mensaje);
            }
        } catch (error) {
            console.error(error);
            alert("No se pudo conectar con el servidor local. Verifica que Visual Studio esté en Play (Puerto 7270).");
        }
    };
}