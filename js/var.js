// Array de productos
const products = [];

// Array de productos agregados al carrito
const cart = [];

// Variables necesarias para el carrito
const qtyCart = document.getElementById('qtyCart');
const productsCart = document.getElementById('productsCart');
const confirmBtn = document.getElementById('confirmBtn');
const totalBuy = document.getElementById('totalBuy');
// Modal nuevo por confirmación de compra

// Constante para traer el div que contendrá los productos
const productsContainer = document.getElementById('jsProductsContainer');


// Constante necesaria para el filtro de búsqueda
const searchInput = document.getElementById("jsSearchInput");
const clear = document.getElementById('jsClearBtn'); //limpiar filtro de búsqueda

// Constantes necesarias para el envío de formularios
const formEmail = document.querySelector('#formEmail');
const contactUs = document.querySelector('#contactUs');