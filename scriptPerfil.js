// 1. Verificamos que el usuario esté logueado
const usuarioActivo = JSON.parse(localStorage.getItem('usuarioQuimera'));

if (!usuarioActivo) {
    // Si no hay post-it de sesión, lo regresamos a que inicie sesión
    window.location.href = "usuario.html";
} else {
    // Le ponemos su nombre en la pantalla
    document.getElementById('saludoPerfil').innerText = "Bienvenido, " + usuarioActivo.nombre;
}

// 2. Botón para Cerrar Sesión
// 2. Botón para Cerrar Sesión (Ahora con pregunta)
const btnCerrarSesion = document.getElementById('btnCerrarSesion');
if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener('click', () => {
        
        // ¡NUEVO! Preguntamos antes de borrar la sesión
        let confirmacion = confirm("¿Estás seguro de que quieres cerrar sesión?");
        
        if (confirmacion) {
            // Si el usuario le dio a "Aceptar", borramos el post-it
            localStorage.removeItem('usuarioQuimera');
            window.location.href = "index.html"; 
        }
        // Si le da a "Cancelar", no hace nada y se queda en la página
    });
}


// 3. Botón para Cambiar Contraseña
const btnCambiarPass = document.getElementById('btnCambiarPass');
if (btnCambiarPass) {
    btnCambiarPass.addEventListener('click', async () => {
        const nuevaPass = document.getElementById('nuevaPassword').value;

        if (!nuevaPass) {
            alert("Por favor escribe una nueva contraseña.");
            return;
        }

        // Empacamos el correo del usuario actual y su nueva contraseña
        const datos = {
            correo: usuarioActivo.correo,
            nuevaPassword: nuevaPass
        };

        try {
            let respuesta = await fetch('https://localhost:7138/cambiar-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });

            let resultado = await respuesta.json();
            alert(resultado.mensaje);
            
            document.getElementById('nuevaPassword').value = ""; // Limpiamos la cajita
            
        } catch (error) {
            console.error(error);
            alert("No se pudo conectar con el servidor.");
        }
    });
}

// 4. Botón para Eliminar Cuenta
const btnEliminarCuenta = document.getElementById('btnEliminarCuenta');
if (btnEliminarCuenta) {
    btnEliminarCuenta.addEventListener('click', async () => {
        const pass = document.getElementById('passEliminar').value;

        if (!pass) {
            alert("Por favor escribe tu contraseña para confirmar.");
            return;
        }

        // Doble validación para evitar accidentes
        let confirmacionSegura = confirm("¿ESTÁS TOTALMENTE SEGURO? Esta acción no se puede deshacer.");
        if (!confirmacionSegura) {
            return; // Si se arrepiente, cortamos la función aquí
        }

        const datos = {
            correo: usuarioActivo.correo,
            password: pass
        };

        try {
            let respuesta = await fetch('https://localhost:7138/eliminar-cuenta', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });

            let resultado = await respuesta.json();

            if (resultado.exito) {
                alert(resultado.mensaje);
                // Le arrancamos el post-it de sesión porque ya no existe
                localStorage.removeItem('usuarioQuimera');
                window.location.href = "index.html"; 
            } else {
                alert(resultado.mensaje);
            }
            
        } catch (error) {
            console.error(error);
            alert("No se pudo conectar con el servidor.");
        }
    });
}