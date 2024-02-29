//función de cómo se estructuran las card en el HTML
const cardProducts = (product) => {
    return `<div class='productCard'>
                <p class='idCard'>${product.id}</p>
                <img class='imgCard' src='${product.img}'>
                <p class='nameCard'>${product.name}</p>                
                <p class='descriptionCard' id='jsDescriptionCard${product.id}'> x ${product.description}</p>
                <p class='priceCard' id='jsPriceCard${product.id}'>$${product.price} con IVA incluído.</p>
                <p class='promotionCard' id='promotion${product.id}'></p>
                <div class='buyCard'>
                    <button class='btnCard' id='${product.id}'>Añadir al carrito</button>
                </div>
            </div>`;
};

//función que llevará al HTML mi array de productos
const renderHTML = (products, container) => {
    container.innerHTML = "";
    if (products.length > 0) {
        for (const product of products) {
            const productInHTML = cardProducts(product);
            container.innerHTML += productInHTML;
        }
    } else {
        container.innerHTML = `<p class="messageContainer">No se encuentran productos.</p>`;
    }
    buyEvent()
}

// Filtro de búsqueda
const filterProducts = () => {
    const searchInputValue = searchInput.value;

    const filteredProducts = products.filter((product) => {
        const productName = product.name.toLowerCase();
        const isFiltered = productName.includes(searchInputValue.toLowerCase());
        return isFiltered;
    });

    renderHTML(filteredProducts, productsContainer);
    buyEvent()
};

// EVENTO DE COMPRA
function buyEvent() {
    let btnBuy = document.getElementsByClassName('btnCard');
    for (const btn of btnBuy) {
        btn.addEventListener('click', function () {
            let selection = cart.find(product => product.id == this.id);
            if (selection) {
                selection.addQty(1)
            } else {
                selection = products.find(product => product.id == this.id);
                cart.push(selection);
            }
            localStorage.setItem('ProductsCustomers', JSON.stringify(cart));
            cartHTML(cart);
            // Mensaje que confirma que el producto se añadió al carrito 
            Toastify({
                text: `Usted ha añadido ${selection.name} al carrito.`,
                duration: 1000,
                gravity: "bottom",
                position: "center",
                style: {
                    background: "#97080b",
                    color: "#fff",
                    "font-weight": "bolder",
                    "font-style": "italic",
                    border: "1px solid #97080b",
                    "border-radius": "20px",
                }
            }).showToast();
        })
    }
}


// Función que muestra el carrito
function cartHTML(list) {
    qtyCart.innerHTML = list.length;
    productsCart.innerHTML = '';
    for (const product of list) {
        let productInCart = document.createElement('div');
        productInCart.className = 'modalProduct';
        productInCart.innerHTML = 
        `<h3 id='modalName'>${product.name}</h3>
        <h4 id='modalPrice'>Precio: $${product.price}</h4>
        <h4 id='modalQty'>Cantidad: ${product.quantity}</h4>
        <h4 id='modalSubtotal'>Subtotal: $${product.subTotal()}</h4>
        <a id='${product.id}' class= 'btnAdd'>+</a>
        <a id='${product.id}' class= 'btnDeduct'>-</a>
        <a id='${product.id}' class= 'btnDelete'>Eliminar</a>`;
        productsCart.append(productInCart);
    }
    document.querySelectorAll('.btnAdd').forEach(btn => btn.onclick = addCart);
    document.querySelectorAll('.btnDeduct').forEach(btn => btn.onclick = deductCart);
    document.querySelectorAll('.btnDelete').forEach(btn => btn.onclick = deleteCart);
    totalCart()
}

// Función para el total del carrito
function totalCart() {
    let total = cart.reduce((totalBuy, buy) => totalBuy += buy.subTotal(), 0);
    totalBuy.innerHTML = `Total: $${total}`;
    return total;
}

// Función para agregar cantidad en el carrito
function addCart() {
    let product = cart.find(product => product.id == this.id);
    product.addQty(1);
    this.parentNode.children[2].innerHTML = `Cantidad: ${product.quantity}`;
    this.parentNode.children[3].innerHTML = `Subtotal: $${product.subTotal()}`;
    totalCart();
    localStorage.setItem('ProductsCustomers', JSON.stringify(cart));
}

// Función para deducir cantidad en el carrito
function deductCart() {
    let product = cart.find(product => product.id == this.id);
    if (product.quantity > 1) {
        product.addQty(-1);
        this.parentNode.children[2].innerHTML = `Cantidad: ${product.quantity}`;
        this.parentNode.children[3].innerHTML = `Subtotal: $${product.subTotal()}`
        totalCart();
        localStorage.setItem('ProductsCustomers', JSON.stringify(cart));
    };
}

// Función para borrar un producto del carrito
function deleteCart(e) {
    let position = cart.findIndex(product => product.id == e.target.id);
    cart.splice(position, 1);
    cartHTML(cart);
    localStorage.setItem('ProductsCustomers', JSON.stringify(cart));
}

// Función para formulario de contacto post evento compra
function newModal() {
    return `<div class="modalContainer">
    <h2 class="modalTitle">¡Tus Cajitas están cada vez más cerca de vos!</h2>
    <h4 class="modalSubtitle">Déjanos tus datos y de inmediato nos comunicamos con vos para acordar el pago y la entrega</h4>
    <div class="containerModalMain">
        <form class="formModal" id="customerData" action="https://formspree.io/f/xyyopvrq" method="POST">
            <label for="name" class="labelsModal">Nombre del Titular</label><br>
            <input type="text" id="name" class="inputsModal" placeholder="Como aparece en la tarjeta" required><br>
            <label for="number" class="labelsModal">Número de tarjeta</label><br>
            <input type="number" id="number" class="inputsModal" minlength="16" maxlength="16" required><br>
            <label for="date" class="labelsModal">Fecha de expiración</label><br>
            <input type="month" id="date" class="inputsModal" min="2022-03" value="2022-03"><br>
            <label for="passCode" class="labelsModal">Código de seguridad</label><br>
            <input type="password" id="passCode" class="inputsModal" placeholder="Últimos 3 dígitos" minlength="3" maxlength="3" inputmode="numeric" required><br>
            <label for="telephone" class="labelsModal">Número telefónico:</label><br>
            <input type="tel" id="telephone" class="inputsModal" required><br>
            <label for="email" class="labelsModal">Correo electrónico:</label><br>
            <input type="email" id="email" class="inputsModal" required><br>
            <div class="containerBtns">
                <input type="submit" value="Pagar" id="sendData" class="modalBtn">
                <input type="reset" value="Borrar datos" id="deleteData" class="modalBtn"><br>
            </div>
        </form>
        <img src="img/imgModal.svg" alt="#" class="imgModal">
    </div>
</div>`
}

// Funciones para Alertas por envío de formulario
// Alerta para envío de formulario de contacto
function swalContact() {
    return Swal.fire(
        '¡Hemos recibido tu consulta!',
        "Pronto nos pondremos en contacto con vos",
        'success'
      )
}
// Alerta para envío de formulario de suscripción
function swalSubscription() {
    return Swal.fire(
        '¡Gracias por suscribirte!',
        "Pronto estarás recibiendo nuestras novedades, promociones y descuentos.",
      )
}
// Alerta para envío de formulario post-compra
function swalPurchase() {
    return Swal.fire(
        '¡Gracias por tu compra!',
        "Pronto nos pondremos en contacto con vos para acordar el envío o entrega de tu compra",
        'success'
    )
} 