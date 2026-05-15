let indice = 0;

function mostrarSlide()
{
    const slide = document.getElementById("banner");
    slide.style.transform = `translateX(-${indice * 170}px)`;
}

function siguiente()
{
    if(indice < 5){
        indice++;
    }
    else{
        indice = 0;
    }
    mostrarSlide();
}

function anterior()
{
    if(indice > 0){
        indice--;
    }
    else{
        indice = 2;
    }
    mostrarSlide();
}

// function siguiente(banner) {
//     // 1. Buscamos el banner SOLO cuando se hace clic
//     const banner = document.getElementById(banner);
    
//     // 2. Agarramos la PRIMERA tarjeta que está en la fila
//     const primeraTarjeta = banner.firstElementChild;
    
//     // 3. La despegamos y la mandamos al FINAL de la fila
//     banner.appendChild(primeraTarjeta);
// }

// function anterior(banner) {
//     // 1. Buscamos el banner SOLO cuando se hace clic
//     const banner = document.getElementById(banner);
    
//     // 2. Agarramos la ÚLTIMA tarjeta de la fila
//     const ultimaTarjeta = banner.lastElementChild;
    
//     // 3. La despegamos y la mandamos al INICIO de la fila
//     banner.prepend(ultimaTarjeta);
// }