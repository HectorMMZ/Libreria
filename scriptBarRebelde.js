
// =========================================================
// 2. SISTEMA DINÁMICO DE NAVBAR (Lo que adaptamos de tu amiga)
// =========================================================
function verificarSesionUsuario() {
    // Intentamos buscar si hay un usuario guardado
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioQuimera'));
    const enlaceUsuario = document.querySelector('.BotonUsuario');

    if (usuarioActivo && enlaceUsuario) {
        // Sacamos el primer nombre
        const primerNombre = usuarioActivo.nombre.split(' ')[0];

        // Cambiamos el botón visualmente
        enlaceUsuario.innerHTML = `<i class="fa-solid fa-user-check"></i> <span style="margin-left: 10px;">Hola, ${primerNombre}</span>`;
        
        // ¡LA MAGIA AQUÍ! Cambiamos el enlace para que te lleve a tu perfil
        enlaceUsuario.href = "perfil.html"; 
    }
    
}

// Ejecutamos la verificación en cuanto carga cualquier página
document.addEventListener('DOMContentLoaded', verificarSesionUsuario);
// =========================================================
