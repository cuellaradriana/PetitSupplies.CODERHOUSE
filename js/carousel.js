// Variables necesarias para el carrusel
const container = document.querySelector('.carouselContainer');
let carouselItem = document.querySelectorAll('.carouselItem');
let carouselLastItem = carouselItem[carouselItem.length-1];
let btnRight = document.querySelector('#btnRight');
let btnLeft = document.querySelector('#btnLeft');


// Agregar el último Item del carrusel al comienzo
container.insertAdjacentElement('afterbegin', carouselLastItem)


// Función para mover al siguiente item
function next() {
    let carouselFirstItem = document.querySelectorAll('.carouselItem')[0];
    container.style.marginLeft ='-200%';
    container.style.transition = 'all 0.5s';
    setTimeout(function() {
        container.style.transition = 'none';
        container.insertAdjacentElement('beforeend', carouselFirstItem);
        container.style.marginLeft ='-100%';
    }, 500);
}

// Función para mover al anterior item
function prev() {
    let carouselItem = document.querySelectorAll('.carouselItem');
    let carouselLastItem = carouselItem[carouselItem.length-1];
    container.style.marginLeft ='0%';
    container.style.transition = 'all 0.5s';
    setTimeout(function() {
        container.style.transition = 'none';
        container.insertAdjacentElement('afterbegin', carouselLastItem);
        container.style.marginLeft ='-100%';
    }, 500);
}

// Funcionalidad, eventos para los botones
btnRight.addEventListener('click', next);
btnLeft.addEventListener('click', prev);


// Carrusel interactivo
setInterval(function() {
    next();
},5000); 