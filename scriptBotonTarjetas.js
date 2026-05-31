function siguiente(idContenedor) {
    //Buscamos el banner ESPECÍFICO que nos pidió el botón
    const banner = document.getElementById(idContenedor);
    
    const primeraTarjeta = banner.firstElementChild;
    const desplazamiento = primeraTarjeta.offsetWidth + 20;

    banner.style.transition = "transform 0.4s ease-in-out";
    banner.style.transform = `translateX(-${desplazamiento}px)`;

    setTimeout(() => {
        banner.style.transition = "none";
        banner.appendChild(primeraTarjeta);
        banner.style.transform = "translateX(0)";
    }, 400); 
}

function anterior(idContenedor) {
    //Buscamos el otro banner ESPECÍFICO que nos pidió el botón
    const banner = document.getElementById(idContenedor);
    
    const ultimaTarjeta = banner.lastElementChild;
    const primeraTarjeta = banner.firstElementChild;
    const desplazamiento = primeraTarjeta.offsetWidth + 20;
    
    banner.style.transition = "none";
    banner.prepend(ultimaTarjeta);
    
    banner.style.transform = `translateX(-${desplazamiento}px)`;

    setTimeout(() => {
        banner.style.transition = "transform 0.4s ease-in-out";
        banner.style.transform = "translateX(0)";
    }, 10);
}

