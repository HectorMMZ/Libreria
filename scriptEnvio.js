const formEnvio = document.getElementById('formEnvio');

// =======================================================
// 1. CALCULAR Y MOSTRAR EL TOTAL AL ABRIR LA PÁGINA
// =======================================================
document.addEventListener('DOMContentLoaded', () => {
    // Leemos qué hay en el carrito
    const carritoGuardado = JSON.parse(localStorage.getItem("libros-en-carrito"));
    let totalCalculado = 0;
    
    // Si hay libros, hacemos la suma total
    if (carritoGuardado && carritoGuardado.length > 0) {
        carritoGuardado.forEach(libro => {
            totalCalculado += libro.precio * libro.cantidad;
        });
    } else {
        // Si llegaron aquí con el carrito vacío por accidente, los regresamos
        alert("Tu carrito está vacío, te regresaremos al catálogo.");
        window.location.href = "index.html";
        return;
    }
    
    // Inyectamos el total en el HTML
    const etiquetaTotal = document.getElementById('totalEnvio');
    if (etiquetaTotal) {
        etiquetaTotal.innerText = `Total a pagar: $${totalCalculado.toFixed(2)}`;
    }
});

// =======================================================
// 2. ENVIAR EL FORMULARIO A LA BASE DE DATOS (Tu código)
// =======================================================
if (formEnvio) {
    formEnvio.addEventListener('submit', async (e) => {
        e.preventDefault();

        // --- ¡NUEVO! Sacamos quién es el usuario que está comprando ---
        const usuarioActivo = JSON.parse(localStorage.getItem('usuarioQuimera'));

        const datosEnvio = {
            // --- ¡NUEVO! Le mandamos el correo al mesero ---
            correo_usuario: usuarioActivo.correo, 
            
            direccion: document.getElementById('direccion').value,
            ciudad: document.getElementById('ciudad').value,
            codigo_postal: document.getElementById('codigo_postal').value,
            telefono_envio: document.getElementById('telefono_envio').value,
            carrito: JSON.parse(localStorage.getItem("libros-en-carrito"))
        };

        try {
            let respuesta = await fetch('https://localhost:7138/finalizar-compra', {
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
                alert("Error al procesar: " + resultado.mensaje);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo conectar con el servidor.");
        }
    });
}