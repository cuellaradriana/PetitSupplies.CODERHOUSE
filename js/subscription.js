// Suscripción del usuario
formEmail.addEventListener('submit', e =>{
    e.preventDefault();
    postForm(formEmail, swalSubscription());
})

// Función Asíncrona para envío de formulario con POST
async function postForm(idForm, swal) {
    const data = new FormData(idForm);
    console.log(data.get('email'));
    const responseForm= await fetch(idForm.action, {
        method: idForm.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    })
    if (responseForm.ok) {
        idForm.reset();
        swal
    }
}



