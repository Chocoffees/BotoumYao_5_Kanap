// --- Shopping cart -> Display all previously selected products ---
cartContent = [];

// Get array with products from localStorage
document.body.onload = getCustomerSelection();

function getCustomerSelection() {
  if (localStorage.getItem("productStored") !== null) {
    let cartContent = JSON.parse(localStorage.getItem("productStored"));
    console.log(cartContent);

    // Build the cart: create, insert elements for each product
    for (let productStored of cartContent) {

      let resumItems = document.getElementById("cart__items");

      // Create article element -> will contain principal product characteristics
      let article = document.createElement("article");
      resumItems.appendChild(article);
      article.className = "cart__item";
      console.log(article);
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
    }
  }
  updateTotalArticles();
  updateTotalAmount();
}

// Manage total quantity of products at shopping cart opening -> with or without product previously selected
function updateTotalArticles() {
  let cartContent = JSON.parse(localStorage.getItem("productStored"));
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

// Manage total amount of shopping cart -> with or without product previously selected
function updateTotalAmount() {
  let cartContent = JSON.parse(localStorage.getItem("productStored"));
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