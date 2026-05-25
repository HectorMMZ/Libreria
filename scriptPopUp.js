document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("ModalOferta");
    const botonCerrar = document.getElementById("CerrarModal");

    // Verifica si el modal ya se mostró en esta sesión
    if (!sessionStorage.getItem("popupMostrado")) {
        // Muestra el modal después de 1 segundo de entrar a la página
        setTimeout(() => {
            modal.style.display = "flex";
        }, 1000);
    }

    // Al hacer clic en cerrar, oculta el modal y guarda el registro
    botonCerrar.addEventListener("click", () => {
        modal.style.display = "none";
        sessionStorage.setItem("popupMostrado", "true");
    });
});