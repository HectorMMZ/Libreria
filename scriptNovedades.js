// Boton para agregar al carrito
var carritoDeCompras = [];

if (localStorage.getItem("productos-en-carrito")) {
    carritoDeCompras = JSON.parse(localStorage.getItem("productos-en-carrito"));
}

function activarBotonesNovedades() {
    var botones = document.querySelectorAll(".producto-agregar");

    for (var i = 0; i < botones.length; i++) {
        botones[i].onclick = function(evento) {
            var idBoton = evento.target.id;
            var libroEncontrado = libros.find(function(item) {
                return item.id === idBoton;
            });

            if (libroEncontrado) {
                var yaExiste = carritoDeCompras.find(function(item) {
                    return item.id === idBoton;
                });

                if (yaExiste) {
                    yaExiste.cantidad++; // Si ya existía, le sumamos 1
                } else {
                    libroEncontrado.cantidad = 1;
                    carritoDeCompras.push(libroEncontrado);
                }

                localStorage.setItem("productos-en-carrito", JSON.stringify(carritoDeCompras));

            }
        };
    }
}

activarBotonesNovedades();



// movimiento lanzamientos de la semana
var lanzamientoActual = 0;

function cambiarLanzamiento(direccion) {
    var tarjetas = document.querySelectorAll('.tarjeta-destacada-horizontal');
    if (tarjetas.length === 0) return;

    tarjetas[lanzamientoActual].classList.remove('activa');
    lanzamientoActual += direccion;
    
    if (lanzamientoActual >= tarjetas.length) {
        lanzamientoActual = 0;
    }
    if (lanzamientoActual < 0) {
        lanzamientoActual = tarjetas.length - 1;
    }
    
    tarjetas[lanzamientoActual].classList.add('activa');
}

function mostrarMasTendencias() {
    var elementosOcultos = document.querySelectorAll('.elemento-oculto');
    var boton = document.getElementById('boton-tendencias');
    
    for (var k = 0; k < elementosOcultos.length; k++) {
        elementosOcultos[k].classList.remove('elemento-oculto');
    }
    boton.style.display = 'none'; // Desaparece el botón
}