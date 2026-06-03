//Aqui es para saber si hay algo en el carrito
let LibrosEnCarrito =  localStorage.getItem("libros-en-carrito");
LibrosEnCarrito = JSON.parse(LibrosEnCarrito);




const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos")
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones")
const contenedorCarritoComprado = document.querySelector("#carrito-comprado")
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");



function cargarProductosCarrito(){

if(LibrosEnCarrito && LibrosEnCarrito.length > 0){

    contenedorCarritoVacio.classList.add("disable");
    contenedorCarritoProductos.classList.remove("disable");
    contenedorCarritoAcciones.classList.remove("disable");
    contenedorCarritoComprado.classList.add("disable");

    contenedorCarritoProductos.innerHTML = "";

    LibrosEnCarrito.forEach(producto => {
        
        const div = document.createElement("div");
        div.classList.add("carrito-producto");

        div.innerHTML= `
            
             <img class="carrito-producto-img" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="carrito-producto-titulo">
                        <small>Titulo</small>
                        <h3>${producto.titulo}</h3>
                    </div>
                    <div class="carrito-producto-cantidad">
                        <small>Cantidad</small>
                        <p>${producto.cantidad}</p>
                    </div>

                    <div class="carrito-producto-precio">
                        <small>Precio</small>
                        <p>$${producto.precio}</p>
                    </div>

                    <div class="carrito-producto-subtotal">
                        <small>Subtototal</small>
                        <p>$${producto.precio * producto.cantidad}</p>
                    </div>

             <button class="carrito-producto-eliminar" id="${producto.id}" ><i class="bi bi-trash3-fill"></i></button>
                    
        `;

        contenedorCarritoProductos.append(div);

    })

    }
    else{

        contenedorCarritoVacio.classList.remove("disable");
        contenedorCarritoProductos.classList.add("disable");
        contenedorCarritoAcciones.classList.add("disable");
        contenedorCarritoComprado.classList.add("disable");

    }

    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton =>{

        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e){
    const idBoton = e.currentTarget.id;
    const index = LibrosEnCarrito.findIndex(producto => producto.id === idBoton);

    LibrosEnCarrito.splice(index, 1);
       
    cargarProductosCarrito();

    localStorage.setItem("libros-en-carrito", JSON.stringify(LibrosEnCarrito));

}


botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito(){

    LibrosEnCarrito.length = 0;

    localStorage.setItem("libros-en-carrito", JSON.stringify(LibrosEnCarrito));
    cargarProductosCarrito();

}

function actualizarTotal(){

    const totalCalculado = LibrosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);

    total.innerText = `$${totalCalculado}`;

}

// Ahora este botón valida la sesión y te envía al formulario
botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito(){
    // 1. Validamos que haya algo en el carrito
    if (!LibrosEnCarrito || LibrosEnCarrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    // 2. ¡EL CANDADO! Validamos si hay alguien logueado
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioQuimera'));
    
    if (!usuarioActivo) {
        // Si no hay post-it de sesión, lo frenamos
        alert("¡Hola! Necesitas iniciar sesión o crear una cuenta para poder finalizar tu compra.");
        window.location.href = "usuario.html"; // Lo mandamos a la página de login
        return; // Cortamos la función para que no avance al envío
    }

    // 3. Si el carrito tiene libros y el usuario SÍ tiene sesión, le abrimos la puerta al envío
    window.location.href = "envio.html";
}
