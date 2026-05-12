let indice = 0;

function mostrarSlide()
{
    const slide = document.getElementById("banner");
    slide.style.transform = `translateX(-${indice * 230}px)`;
}

function siguiente()
{
    if(indice < 2){
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

// Movimiento automatico cada 10 segundo
setInterval(() => {
    siguiente();
}, 10000
);