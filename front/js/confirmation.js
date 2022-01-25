// --- Last step of the order > validation: display order ID ---  

validateOrder();
function validateOrder() {
    const queryStringId = window.location.search;
//console.log(queryStringId); // ?id=12345

// Get param value (id)
const params = new URLSearchParams(queryStringId);
//console.log(params);

const ID = params.get("id");
console.log(ID); // 12345
    
    orderId.textContent = ID;

    //No store orderId
    localStorage.clear();
}
