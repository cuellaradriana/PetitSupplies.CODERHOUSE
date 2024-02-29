// Envío de formulario de contacto 
contactUs.addEventListener('submit', e =>{
    e.preventDefault();
    postForm(contactUs, swalContact());
})
