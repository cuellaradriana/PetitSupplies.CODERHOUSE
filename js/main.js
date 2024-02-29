
// Instanciar mis productos
fetch("json/data.json")
    .then(response => response.json())
    .then(data =>{
        for (const literal of data) {
            products.push(new Product(literal.id, literal.img, literal.name, literal.description, literal.price, literal.quantity ))
        }
        
// Renderizo mis productos en HTML
    renderHTML(products, productsContainer);
    } ).catch(message => console.error(message));


// Filtro de búsqueda (evento)
searchInput.addEventListener("keyup", filterProducts);
// limpieza de filtro de búsqueda
clear.onclick= () =>{
    searchInput.value= '';
    renderHTML(products, productsContainer);
}

// Continuacion de la compra
confirmBtn.onclick= () =>{
    productsCart.innerHTML = newModal();
    const customerData = document.getElementById('customerData');
    customerData.addEventListener('submit', e =>{
        e.preventDefault();
        postForm(customerData, swalPurchase());
        productsCart.innerHTML ='';
        localStorage.clear();
        cart.splice(0,cart.length);
        cartHTML(cart);
    }
)}

