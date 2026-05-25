const LibrosArray = [
    // Libros de clasicos ------------------------------------------------------------------------------------------
    {
    id: "libroClasico-01", //Su id del libro
        titulo:"Besos de Canelo y Hielo", //Este es el nombre que aparecera la pagina
        imagen: "./img/libro.jpg", //Aqui la imagen
        categoria:{
            nombre:  "Libros Clasicos",  //Esto es necesario para que se pueda separar por generos
            id:"clasicos"
        },
        precio: 299, //El precio
    }, 



    // Libros de romance ------------------------------------------------------------------------------------------
    {
        id: "libroRomance-01", //Su id del libro
        titulo:"Besos de Canelo y Hielo", //Este es el nombre que aparecera la pagina
        imagen: "./img/libro.jpg", //Aqui la imagen
        categoria:{
            nombre:  "Libros Romance",  //Esto es necesario para que se pueda separar por generos
            id:"romance"
        },
        precio: 299, //El precio

    },

    {
        id: "libroRomance-02", //Su id del libro
        titulo:"Mas Que rivales", //Este es el nombre que aparecera la pagina
        imagen: "./img/libro2.jpg", //Aqui la imagen
        categoria:{
            nombre:  "Libros Romance",  //Esto es necesario para que se pueda separar por generos
            id:"romance"
        },
        precio: 159, //El precio

    },

    {
        id: "libroRomance-03", //Su id del libro
        titulo:"Gril Haunts", //Este es el nombre que aparecera la pagina
        imagen: "./img/libro3.jpg", //Aqui la imagen
        categoria:{
            nombre:  "Libros Romance",  //Esto es necesario para que se pueda separar por generos
            id:"romance"
        },
        precio: 399, //El precio

    },

    {
        id: "libroRomance-04", //Su id del libro
        titulo:"Llamalo Como Quieras", //Este es el nombre que aparecera la pagina
        imagen: "./img/libro4.jpg", //Aqui la imagen
        categoria:{
            nombre:  "Libros Romance",  //Esto es necesario para que se pueda separar por generos
            id:"romance"
        },
        precio: 259, //El precio

    },

    {
        id: "libroRomance-05", //Su id del libro
        titulo:"Mala Publicidad", //Este es el nombre que aparecera la pagina
        imagen: "./img/libro5.jpg", //Aqui la imagen
        categoria:{
            nombre:  "Libros Romance",  //Esto es necesario para que se pueda separar por generos
            id:"romance"
        },
        precio: 199, //El precio

    },


    //Libro Fantasias ----------------------------------------------------------------------------------------
    

    {
        id: "libroFantasia-01", //Su id del libro
        titulo:"HARRY POTTER Y EL LEGADO MALDITO", //Este es el nombre que aparecera la pagina
        imagen: "./img/libro6.jpg", //Aqui la imagen
        categoria:{
            nombre:  "Libros Fantasia",  //Esto es necesario para que se pueda separar por generos
            id:"fantasia"
        },
        precio: 199, //El precio

    },

     {
        id: "libroFantasia-02", //Su id del libro
        titulo:"Una corte de niebla y furia", //Este es el nombre que aparecera la pagina
        imagen: "./img/libro7.jpg", //Aqui la imagen
        categoria:{
            nombre:  "Libros Fantasia",  //Esto es necesario para que se pueda separar por generos
            id:"fantasia"
        },
        precio: 159, //El precio

    },

     {
        id: "libroFantasia-03", //Su id del libro
        titulo:"La reina roja", //Este es el nombre que aparecera la pagina
        imagen: "./img/libro8.jpg", //Aqui la imagen
        categoria:{
            nombre:  "Libros Fantasia",  //Esto es necesario para que se pueda separar por generos
            id:"fantasia"
        },
        precio: 299, //El precio

    },

     {
        id: "libroFantasia-04", //Su id del libro
        titulo:"Nora Roberts: La eleccion", //Este es el nombre que aparecera la pagina
        imagen: "./img/libro9.jpg", //Aqui la imagen
        categoria:{
            nombre:  "Libros Fantasia",  //Esto es necesario para que se pueda separar por generos
            id:"fantasia"
        },
        precio: 259, //El precio

    },

     {
        id: "libroFantasia-05", //Su id del libro
        titulo:"Juego de tronos", //Este es el nombre que aparecera la pagina
        imagen: "./img/libro10.jpg", //Aqui la imagen
        categoria:{
            nombre:  "Libros Fantasia",  //Esto es necesario para que se pueda separar por generos
            id:"fantasia"
        },
        precio: 399, //El precio

    },

   //Ciencia Ficcion ----------------------------------------------------------------------------------------------------

   {
        id: "libroCienciaFiccion-01", //Su id del libro
        titulo:"Otra novela de terror", //Este es el nombre que aparecera la pagina
        imagen: "./img/libro11.jpg", //Aqui la imagen
        categoria:{
            nombre:  "Libros Ciencia Ficcion",  //Esto es necesario para que se pueda separar por generos
            id:"cienciaficcion"
        },
        precio: 399, //El precio

    },
    
    {
        id: "libroCienciaFiccion-02", //Su id del libro
        titulo:"Alas de sangre", //Este es el nombre que aparecera la pagina
        imagen: "./img/libro12.jpg", //Aqui la imagen
        categoria:{
            nombre:  "Libros Ciencia Ficcion",  //Esto es necesario para que se pueda separar por generos
            id:"cienciaficcion"
        },
        precio: 399, //El precio

    },
    
    {
        id: "libroCienciaFiccion-03", //Su id del libro
        titulo:"Delirio", //Este es el nombre que aparecera la pagina
        imagen: "./img/libro13.jpg", //Aqui la imagen
        autor: "Mario chan",
        categoria:{
            nombre:  "Libros Ciencia Ficcion",  //Esto es necesario para que se pueda separar por generos
            id:"cienciaficcion"
        },
        precio: 399, //El precio

    },
    

    {
        id: "libroCienciaFiccion-04", //Su id del libro
        titulo:"La guerra de los mundos", //Este es el nombre que aparecera la pagina
        imagen: "./img/libro14.jpg", //Aqui la imagen
        categoria:{
            nombre:  "Libros Ciencia Ficcion",  //Esto es necesario para que se pueda separar por generos
            id:"cienciaficcion"
        },
        precio: 399, //El precio

    },
    
    {
        id: "libroCienciaFiccion-05", //Su id del libro
        titulo:"Novum", //Este es el nombre que aparecera la pagina
        imagen: "./img/libro15.jpg", //Aqui la imagen
        categoria:{
            nombre:  "Libros Ciencia Ficcion",  //Esto es necesario para que se pueda separar por generos
            id:"cienciaficcion"
        },
        precio: 399, //El precio

    },
    
]

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

 
//Esto llama a los todos los libros
function cargarLibros(LibrosElegido)
    {

        contenedorProductos.innerHTML = "";

        LibrosElegido.forEach(producto => {

            const div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
                            <img class="producto-img" src="${producto.imagen}" alt="${producto.titulo}">
                             <div class="producto-detalles">
                                 <h3 class="producto-titulo">${producto.titulo}</h3>
                                 <h4 class = "producto-autor" style="color: #5d5a5a;">${producto.autor}</h4>
                                 <p class="producto-precio">$${producto.precio}</p>
                                 <button class="producto-agregar" id="${producto.id}">Agregar</button>
                             </div>
            `;
            contenedorProductos.append(div);
            
        })

        actualizarBotonesAgregar();

    }
    
// CONDICIONAL INTELIGENTE:
// Si el contenedor dinámico existe, dibuja los libros (Catálogo).
if (contenedorProductos) {
    cargarLibros(LibrosArray);
} else {
    // Si no existe (estamos en el Index), no dibujes nada, 
    // pero activa los escuchadores para tus tarjetas estáticas.
    actualizarBotonesAgregar();
}


//Esto hace que cuando le de click a las categorias solo llame a las id que tiene por categoria
botonesCategorias.forEach(boton =>{
    boton.addEventListener("click", (e) =>{

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");


        if(e.currentTarget.id != "todos"){

        const libroCategoria = LibrosArray.find(producto => producto.categoria.id === e.currentTarget.id);
        tituloPrincipal.innerText = libroCategoria.categoria.nombre;

        const productosBoton = LibrosArray.filter(producto => producto.categoria.id === e.currentTarget.id);
        cargarLibros(productosBoton);

        }
        else {
            if (tituloPrincipal) {
                tituloPrincipal.innerText = "Todos los libros";
            }
                cargarLibros(LibrosArray);
            }
    })

});


function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton =>{

        boton.addEventListener("click", agregarAlCarrito);
    });
}


//Esto hace que el carrito se actualize cuando agregas un libro con JSON con el almacenamiento local
let LibrosEnCarrito;

let LibrosEnCarritoLS = localStorage.getItem("libros-en-carrito");

if(LibrosEnCarritoLS) {
    LibrosEnCarrito = JSON.parse(LibrosEnCarritoLS);
    actulizarNumerito();

}
else{

    LibrosEnCarrito = [];

}


function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id;
    const libroAgregado = LibrosArray.find(producto => producto.id === idBoton);

    if (LibrosEnCarrito.some(producto => producto.id === idBoton)){
        const index = LibrosEnCarrito.findIndex(producto => producto.id === idBoton);
        LibrosEnCarrito[index].cantidad++; //El array decta si es verdadero o falso y con cantidad lo va sumando
   
    }
    else {
            libroAgregado.cantidad = 1;
            LibrosEnCarrito.push(libroAgregado);
    }
     
    actulizarNumerito();

    localStorage.setItem("libros-en-carrito", JSON.stringify(LibrosEnCarrito));
}

function actulizarNumerito(){
    let nuevoNumerito = LibrosEnCarrito.reduce((acc,producto) => acc + producto.cantidad, 0);
    
    // Solo intenta escribir el número si el elemento '#numerito' existe en el HTML actual
    if (numerito) {
        numerito.innerText = nuevoNumerito;
    }
}