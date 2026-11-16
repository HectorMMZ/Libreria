const formEnvio = document.getElementById('formEnvio');

// =======================================================
// 1. CALCULAR Y MOSTRAR EL TOTAL AL ABRIR LA PÁGINA
// =======================================================
document.addEventListener('DOMContentLoaded', () => {
    const carritoGuardado = JSON.parse(localStorage.getItem("libros-en-carrito"));
    let totalCalculado = 0;
    
    if (carritoGuardado && carritoGuardado.length > 0) {
        carritoGuardado.forEach(libro => {
            totalCalculado += libro.precio * libro.cantidad;
        });
    } else {
        alert("Tu carrito está vacío, te regresaremos al catálogo.");
        window.location.href = "index.html";
        return;
    }
    
    const etiquetaTotal = document.getElementById('totalEnvio');
    if (etiquetaTotal) {
        etiquetaTotal.innerText = `Total a pagar: $${totalCalculado.toFixed(2)}`;
    }
});

// =======================================================
// 2. ENVIAR EL FORMULARIO A LA BASE DE DATOS
// =======================================================
if (formEnvio) {
    formEnvio.addEventListener('submit', async (e) => {
        e.preventDefault();

        const usuarioActivo = JSON.parse(localStorage.getItem('usuarioQuimera'));
        
        // Calculamos el total nuevamente para enviarlo seguro
        const carritoGuardado = JSON.parse(localStorage.getItem("libros-en-carrito")) || [];
        let totalCalculado = 0;
        let carritoFormateado = [];
        
        carritoGuardado.forEach(libro => {
            totalCalculado += libro.precio * libro.cantidad;
            // Acomodamos los libros EXACTAMENTE como los pide la clase ItemCarrito de tu C#
            carritoFormateado.push({
                IdLibro: libro.id,
                Cantidad: libro.cantidad,
                PrecioUnitario: libro.precio
            });
        });

        // Empaquetamos todo con los NOMBRES EXACTOS de tu clase CheckoutRequest de C#
        const datosEnvio = {
            // Si por alguna razón el id_usuario no está en el localStorage, le ponemos 1 por defecto para que no falle
            IdUsuario: usuarioActivo.id_usuario ? parseInt(usuarioActivo.id_usuario) : 1, 
            Total: totalCalculado,
            Direccion: document.getElementById('direccion').value,
            Ciudad: document.getElementById('ciudad').value,
            CodigoPostal: document.getElementById('codigo_postal').value,
            TelefonoEnvio: document.getElementById('telefono_envio').value,
            Carrito: carritoFormateado
        };

        try {
            // ¡Cambiamos la ruta a /api/checkout y actualizamos al puerto 7270!
            let respuesta = await fetch('https://localhost:7270/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosEnvio)
            });

            let resultado = await respuesta.json();

            if (respuesta.ok) {
                alert("¡Compra exitosa! Tus libros van en camino.");
                localStorage.removeItem("libros-en-carrito");
                window.location.href = "index.html";
            } else {
                alert("Error al procesar: " + (resultado.mensaje || "Error desconocido"));
            }
        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo conectar con el servidor. Verifica que Visual Studio esté corriendo.");
        }
    });
}