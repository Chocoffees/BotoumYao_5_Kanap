// --- Shopping cart -> Display all previously selected products ---
cartContent = [];
var cartContent = JSON.parse(localStorage.getItem("productStored"));

// Get array with products from localStorage
document.body.onload = getCustomerSelection();

function getCustomerSelection() {
  if (localStorage.getItem("productStored") !== null) {
    cartContent;
    console.log(cartContent);

    // Build the cart: create, insert elements for each product
    for (let productStored of cartContent) {

      let resumItems = document.getElementById("cart__items");

      // Create article element -> will contain principal product characteristics
      let article = document.createElement("article");
      resumItems.appendChild(article);
      article.className = "cart__item";
      //console.log(article);
      article.dataset.id = `${productStored._id}`;
      resumItems.appendChild(article);

      // -- Product image --
      let divImg = document.createElement("div");
      divImg.className = "cart__item__img";
      article.appendChild(divImg);

      let img = document.createElement("img");
      img.src = `${productStored.imageUrl}`;
      img.alt = `${productStored.imageAltxt}`;
      divImg.appendChild(img);

      // Create div = block with product informations
      let divItemContent = document.createElement("div");
      divItemContent.className = "cart__item__content";
      article.appendChild(divItemContent);

      let divTitlePrice = document.createElement("div");
      divTitlePrice.className = "cart__item__content__titlePrice";
      divItemContent.appendChild(divTitlePrice);

      // -- Product name --
      let title = document.createElement("h2");
      title.textContent = `${productStored.name}`;
      divTitlePrice.appendChild(title);

      // -- Product price --
      let price = document.createElement("p");
      price.innerHTML = `${productStored.price}` + " " + "€";
      divTitlePrice.appendChild(price);

      // Create settings
      let divSettings = document.createElement("div");
      divSettings.className = ("cart__item__content__settings");
      divItemContent.appendChild(divSettings);

      // -- Product quantity --
      let setQuantity = document.createElement("div");
      setQuantity.className = ("cart__item__content__settings__quantity");
      divSettings.appendChild(setQuantity);

      let quantity = document.createElement("p");
      quantity.innerText = "Qté:" + " ";
      setQuantity.appendChild(quantity);

      let input = document.createElement("input");
      input.type = "number";
      input.className = "itemQuantity";
      input.name = "itemQuantity";
      input.min = "1";
      input.max = "100";
      input.value = `${productStored.quantity}`;
      setQuantity.appendChild(input);

      // -- Deletion item --
      let setDelete = document.createElement("div");
      setDelete.className = "cart__item__content__settings__delete";
      divSettings.appendChild(setDelete);

      let deleteButton = document.createElement("p");
      deleteButton.className = "deleteItem";
      deleteButton.innerText = "Supprimer";
      setDelete.appendChild(deleteButton);

      /* 
      Check product(s) in cart with same id & different color. 
      Product must appear in 2 different lines. 
      Indicate color and quantity for each.
      */
      let productWithSameId = cartContent.find(product => (product._id === `${productStored._id}` && product.color !== `${productStored.color}`));
      console.log(productWithSameId);
      if (productWithSameId !== undefined) {
        let color = document.createElement("p");
        color.innerText = "Couleur :" + " " + productWithSameId.color;
        color.style.fontSize = "medium";
        title.appendChild(color);
      }
    }
  }
  updateTotalArticles();
  updateTotalAmount();
  modifyQuantity();
  deleteProduct();
}

/* 
Manage total quantity of products at shopping cart opening.
With or without product previously selected
*/
function updateTotalArticles() {
  cartContent;
  let numberOfArticles = document.getElementById("totalQuantity");
  let globalQuantity = 0;

  if (cartContent === null) {
    numberOfArticles.textContent = 0;
    console.log(numberOfArticles);
  } else {
    for (let i = 0; i < cartContent.length; i += 1) {
      globalQuantity += Number(cartContent[i].quantity); //convert the value to a number
      numberOfArticles.textContent = globalQuantity
    }
    console.log(`${globalQuantity} articles`);
  }
}

/*
Manage total amount of shopping cart.
With or without product previously selected
*/
function updateTotalAmount() {
  cartContent;
  let amount = document.getElementById("totalPrice");
  let globalAmount = 0;

  if (cartContent === null) {
    amount.textContent = 0;
    console.log(amount);
  } else {
    for (let i = 0; i < cartContent.length; i += 1) {
      globalAmount += + (cartContent[i].price) * (cartContent[i].quantity); //take into account quantities from localstorage
      amount.textContent = globalAmount
    }
    console.log(globalAmount);
  }
}

/*
Manage possibility to modify product quantity.
Input max: 100
*/
let selectQuantity = document.querySelectorAll(".itemQuantity");

for (let i = 0; i < selectQuantity.length; i++) {
  selectQuantity[i].addEventListener("change", modifyQuantity);
}

function modifyQuantity() {
  cartContent;
  let selectQuantity = document.querySelectorAll(".itemQuantity");
  let newQuantity = this.value; //new quantity choosen

  for (let i = 0; i < selectQuantity.length; i++) {
    newQuantity < 100;
    if (newQuantity > 100) {
      alert("ℹ️ Cher Client, la quantité choisie pour chaque article ne peut excéder 100. Choisissez une nouvelle quantité.");
    }
  }

  /*
    -- Refresh localstorage --
  Search to match product id & color
          Update quantity
  */

  var newProductStored = JSON.parse(localStorage.productStored);

  for (let i = 0; i < newProductStored.length; i += 1) {
    if (cartContent[i]._id == newProductStored[i]._id && cartContent[i].color == newProductStored[i].color && newQuantity < 100) {
      //console.log(newProductStored[i]._id);
      //console.log(cartContent[i]._id);
      //console.log(newProductStored[i].color);
      //console.log(cartContent[i].color);
      newProductStored[i].quantity = newQuantity; //quantity now updated
      break;
    }
  }
  localStorage.setItem("newProductStored", JSON.stringify(newProductStored)); //restore product of which quantity changed
  console.log(newProductStored);
  updateTotalArticlesAfterChange();
  updateTotalAmountAfterChange();
}

// Update total articles and total amount after quantity modification
function updateTotalArticlesAfterChange() {
  newProductStored = JSON.parse(localStorage.getItem("newProductStored"));
  let numberOfArticles = document.getElementById("totalQuantity");
  let globalQuantity = 0;

  for (let i = 0; i < newProductStored.length; i++) {
    globalQuantity += Number(newProductStored[i].quantity);
    numberOfArticles.textContent = globalQuantity;
  }
  console.log(`${globalQuantity} articles`);
  localStorage.setItem("newProductStored", JSON.stringify(newProductStored));
}

function updateTotalAmountAfterChange() {
  let amount = document.getElementById("totalPrice");
  let globalAmount = 0;

  for (let i = 0; i < newProductStored.length; i += 1) {
    globalAmount += + (newProductStored[i].price) * (newProductStored[i].quantity); //take into account quantities from localstorage
    amount.textContent = globalAmount
  }
  console.log(globalAmount);
}

function deleteProduct(id, color) {
  newProductStored = JSON.parse(localStorage.getItem("newProductStored"));
  const productToDelete = document.querySelectorAll(".deleteItem");
  console.log(productToDelete);

  for (let i = 0; i < productToDelete.length; i++) {
    productToDelete[i].addEventListener("click", function () {
      alert("🗑️ Voulez-vous supprimer ce produit ?");
    }
    )
  }
}