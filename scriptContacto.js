const formContacto = document.getElementById('formContacto');

// MÁGIA EXTRA: Si el usuario ya inició sesión, le rellenamos su nombre y correo automáticamente
const usuarioActivo = JSON.parse(localStorage.getItem('usuarioQuimera'));

if (usuarioActivo) {
    if(document.getElementById('contactoNombre')) {
        document.getElementById('contactoNombre').value = usuarioActivo.nombre;
        document.getElementById('contactoCorreo').value = usuarioActivo.correo;
    }
}

// LÓGICA DEL FORMULARIO
if (formContacto) {
    formContacto.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evitamos que la página se recargue de golpe

        // 1. VALIDACIÓN: ¿Tiene sesión iniciada?
        if (!usuarioActivo) {
            alert("¡Atención! Necesitas iniciar sesión o crear una cuenta para poder enviarnos un mensaje.");
            // Lo mandamos a la página de login para que entre
            window.location.href = "usuario.html"; 
            return; // Cortamos el proceso aquí para que no envíe nada
        }

        // 2. Si sí tiene sesión, recolectamos los datos escritos
        const datos = {
            nombre: document.getElementById('contactoNombre').value,
            telefono: document.getElementById('contactoTelefono').value,
            correo: document.getElementById('contactoCorreo').value,
            mensaje: document.getElementById('contactoMensaje').value
        };

        // 3. Enviamos el mensaje al "mesero" (C#)
        try {
            let respuesta = await fetch('https://localhost:7138/enviar-contacto', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });

            let resultado = await respuesta.json();

            if (resultado.exito) {
                // Mostramos alerta de éxito y borramos lo que escribió en la cajita
                alert(resultado.mensaje);
                document.getElementById('contactoMensaje').value = ""; 
                document.getElementById('contactoTelefono').value = ""; 
            } else {
                alert("Hubo un problema: " + resultado.mensaje);
            }
        } catch (error) {
            console.error(error);
            alert("No se pudo conectar con el servidor.");
        }
    });
}