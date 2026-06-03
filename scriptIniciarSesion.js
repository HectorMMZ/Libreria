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
// 2. SISTEMA DINÁMICO DE NAVBAR (Lo que adaptamos de tu amiga)
// =========================================================
// function verificarSesionUsuario() {
//     // Intentamos buscar si hay un usuario guardado en el navegador
//     const usuarioActivo = JSON.parse(localStorage.getItem('usuarioQuimera'));
    
//     // Buscamos el botón de "Mi cuenta" en el menú superior
//     const enlaceUsuario = document.querySelector('.BotonUsuario');

//     if (usuarioActivo && enlaceUsuario) {
//         // Separamos el primer nombre por si acaso
//         const primerNombre = usuarioActivo.nombre.split(' ')[0];

//         // Cambiamos el icono y ponemos un saludo personalizado dinámicamente
//         enlaceUsuario.innerHTML = `<i class="fa-solid fa-user-check"></i> <span style="margin-left: 10px;">Hola, ${primerNombre}</span>`;
        
//         // Si el usuario ya está logueado, al dar clic lo podemos mandar al index o a una página de perfil
//         enlaceUsuario.href = "index.html"; 
        
//         // TIP OPCIONAL: Añadir un botón pequeño para cerrar sesión si se desea
//         if (!document.getElementById('btn-cerrar-sesion-nav')) {
//             const btnLogout = document.createElement('a');
//             btnLogout.id = 'btn-cerrar-sesion-nav';
//             btnLogout.href = '#';
//             btnLogout.style.cssText = 'color: #ff8c8c; margin-left: 15px; font-size: 13px; text-decoration: none; font-weight: bold;';
//             btnLogout.innerHTML = '<i class="fa-solid fa-power-off"></i> Salir';
//             btnLogout.onclick = (e) => {
//                 e.preventDefault();
//                 if (confirm('¿Quieres cerrar sesión en Librería Quimera?')) {
//                     localStorage.removeItem('usuarioQuimera');
//                     window.location.reload();
//                 }
//             };
//             enlaceUsuario.insertAdjacentElement('afterend', btnLogout);
//         }
//     }
// }

// // Ejecutamos la verificación inmediatamente al cargar el archivo de JS
// document.addEventListener('DOMContentLoaded', verificarSesionUsuario);

// =========================================================
// 3. ENVIAR REGISTRO NUEVO A LA BASE DE DATOS
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
// 4. VALIDAR CUENTA E INICIAR SESIÓN (GUARDANDO LA SESIÓN)
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