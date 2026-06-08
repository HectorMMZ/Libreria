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
    btnCrearCuenta.onclick = async () => {
        const datos = {
            nombre: document.getElementById('regNombre').value,
            apellido: document.getElementById('regApellido').value,
            correo: document.getElementById('regCorreo').value,
            password: document.getElementById('regPassword').value,
            telefono: document.getElementById('regTelefono').value
        };

        if (!datos.nombre || !datos.apellido || !datos.correo || !datos.password) {
            alert("Por favor, llena los campos obligatorios.");
            return;
        }

        try {
            let respuesta = await fetch('https://localhost:7138/registrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });

            let resultado = await respuesta.json();

            if (resultado.exito) {
                alert(resultado.mensaje);
                document.getElementById('Registro').style.transform = "translateX(0)";
            } else {
                alert("Error: " + resultado.mensaje);
            }
        } catch (error) {
            console.error(error);
            alert("No se pudo conectar con el servidor local.");
        }
    };
}

// =========================================================
// 3. VALIDAR CUENTA E INICIAR SESIÓN (GUARDANDO LA SESIÓN)
// =========================================================
const btnIngresar = document.getElementById('btnIngresar');
if (btnIngresar) {
    btnIngresar.onclick = async () => {
        const datos = {
            correo: document.getElementById('loginCorreo').value,
            password: document.getElementById('loginPassword').value
        };

        if (!datos.correo || !datos.password) {
            alert("Por favor escribe tu correo y contraseña.");
            return;
        }

        try {
            let respuesta = await fetch('https://localhost:7138/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });

            let resultado = await respuesta.json();

            if (resultado.exito) {
                alert("¡Bienvenido a Librería Quimera!");
                
                // MÁGIA AQUÍ: Guardamos los datos que nos regresó SQL Server en el navegador
                localStorage.setItem('usuarioQuimera', JSON.stringify({
                    nombre: resultado.usuario.nombre,
                    correo: resultado.usuario.correo
                }));

                // Redirigimos a la página principal
                window.location.href = "index.html";
            } else {
                alert(resultado.mensaje);
            }
        } catch (error) {
            console.error(error);
            alert("No se pudo conectar con el servidor local.");
        }
    };
}