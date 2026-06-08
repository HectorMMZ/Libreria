let LibrosArray = [];

// Llamamos a nuestro servidor en C# (Asegúrate de que el número 7138 sea tu puerto correcto)
fetch('https://localhost:7138/obtener-productos') 
  .then(respuesta => respuesta.json())
  .then(datos => {
      // 1. Guardamos los datos de la base de datos en nuestro arreglo
      LibrosArray = datos; 
      
      // 2. ¡MAGIA! Hasta que ya tenemos los libros reales, le decimos a la página que los dibuje
      if (document.querySelector("#contenedor-productos")) {
          cargarLibros(LibrosArray);
      } else {
          actualizarBotonesAgregar();
      }
      
      // 3. Llenamos las tarjetas visuales
      sincronizarTarjetasEstaticas();
  })
  .catch(error => {
      console.error("Algo falló al traer los libros desde C#:", error);
  });



// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

 
//Esto llama a los todos los libros
function cargarLibros(LibrosElegido) {

    contenedorProductos.innerHTML = "";

    LibrosElegido.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");

        // 1. Creamos una variable para guardar el diseño de nuestro precio
        let diseñoPrecio = "";

        // 2. Si el libro tiene descuento (precioViejo), armamos el diseño con el precio tachado
        if (producto.precioViejo) {
            diseñoPrecio = `<p class="producto-precio"><span style="text-decoration: line-through; color: #999; font-size: 0.85em; margin-right: 8px;">$${producto.precioViejo}</span> <span style="color: #c9302c; font-weight: bold;">$${producto.precio}</span></p>`;
        } else {
            // 3. Si no tiene descuento, lo ponemos normal
            diseñoPrecio = `<p class="producto-precio" style="color: #856601;">$${producto.precio}</p>`;
        }

        // 4. Inyectamos la variable diseñoPrecio en la tarjeta
        div.innerHTML = `
            <img class="producto-img" src="${producto.imagen}" alt="${producto.titulo}">
             <div class="producto-detalles">
                 <h3 class="producto-titulo">${producto.titulo}</h3>
                 <h4 class="producto-autor" style="color: #5d5a5a;">${producto.autor}</h4> 
                 ${diseñoPrecio}
                 <button class="producto-agregar" id="${producto.id}">Agregar</button>
             </div>
        `;
        contenedorProductos.append(div);
    });

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


// AUTO-RELLENADO UNIVERSAL DE TARJETAS

function sincronizarTarjetasEstaticas() {
    const tarjetas = document.querySelectorAll('.TarjetaLibro, .TarjetaOferta');

    tarjetas.forEach(tarjeta => {
        const botonAgregar = tarjeta.querySelector('.producto-agregar');
        
        if (botonAgregar) {
            const idDelLibro = botonAgregar.id;
            const libro = LibrosArray.find(producto => producto.id === idDelLibro);
            
            if (libro) {
                const titulo = tarjeta.querySelector('.titulo-libro');
                const autor = tarjeta.querySelector('.autor-libro');
                const imagen = tarjeta.querySelector('img');

                //  Inyectamos Título y Autor
                if (titulo) titulo.innerText = libro.titulo;
                if (autor && libro.autor) autor.innerText = libro.autor;

                // 2. Inyectamos la Imagen
                if (imagen && libro.imagen) {
                    imagen.src = libro.imagen;
                    imagen.alt = `Portada de ${libro.titulo}`;
                }
                
                // Buscamos qué tipo de contenedor de precio tiene esta tarjeta
                const precioNormal = tarjeta.querySelector('.precio-libro'); // Para el Index
                const precioViejoOferta = tarjeta.querySelector('.PrecioViejo'); // Para Ofertas
                const precioNuevoOferta = tarjeta.querySelector('.PrecioNuevo'); // Para Ofertas

                // ESCENARIO A: Si estamos en el Index o Recomendaciones
                if (precioNormal) {
                    if (libro.precioViejo) {
                        precioNormal.innerHTML = `<span style="text-decoration: line-through; color: #999; font-size: 0.85em; margin-right: 8px;">$${libro.precioViejo}</span> <span style="color: #c9302c; font-weight: bold;">$${libro.precio}</span>`;
                    } else {
                        precioNormal.innerText = `$${libro.precio}`;
                    }
                }

                // ESCENARIO B: Si estamos en la página de Ofertas
                if (precioViejoOferta && precioNuevoOferta) {
                    if (libro.precioViejo) {
                        precioViejoOferta.innerText = `$${libro.precioViejo}`;
                        precioNuevoOferta.innerText = `$${libro.precio}`;
                    } else {
                        // Por si pones un libro sin descuento aquí por error
                        precioViejoOferta.innerText = "";
                        precioNuevoOferta.innerText = `$${libro.precio}`;
                    }
                }
            }
        }
    });
}