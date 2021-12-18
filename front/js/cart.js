// --- Shopping cart -> Display all previously selected products ---

// Get array with products from localStorage
document.body.onload = getCustomerSelection();

function getCustomerSelection () {
let cartContent = JSON.parse(localStorage.getItem("productStored"));
console.log(cartContent);
}
