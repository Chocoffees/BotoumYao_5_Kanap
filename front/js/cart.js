// --- Shopping cart -> Display all previously selected products ---
cartContent = [];
var cartContent = JSON.parse(localStorage.getItem("productStored"));

// Get array with products from localStorage
document.body.onload = getCustomerSelection();

function getCustomerSelection() {

  if (localStorage.getItem("productStored" || "newProductStored") !== null) {
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
      quantity.innerText = 'Qté:' + " ";
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
      deleteButton.innerText = 'Supprimer';
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
        color.innerText = 'Couleur :' + " " + productWithSameId.color;
        color.style.fontSize = "medium";
        title.appendChild(color);
      }
    }
    updateTotalArticles();
    updateTotalAmount();
    modifyQuantity();
    deleteProduct();
  }
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
      numberOfArticles.textContent = globalQuantity;
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
      amount.textContent = globalAmount;
    }
    console.log(globalAmount);
  }
}


/*
Manage possibility to modify product quantity.
Input max: 100
*/
let selectQuantity = document.querySelectorAll(".itemQuantity");

for (let i = 0; i < selectQuantity.length; i += 1) {
  selectQuantity[i].addEventListener("change", modifyQuantity);
}

function modifyQuantity() {
  cartContent;
  let selectQuantity = document.querySelectorAll(".itemQuantity");
  let newQuantity = this.value; //new quantity choosen
  console.log(newQuantity);

  newQuantity < 100;
  if (newQuantity > 100) {
    alert("ℹ️ Cher Client, la quantité choisie pour chaque article ne peut excéder 100. Choisissez une nouvelle quantité.");
  }

  /*
    -- Refresh localstorage --
  Search to match product id & color
          Update quantity
  */

  newProductStored = JSON.parse(localStorage.getItem("productStored"));
  console.log(newProductStored);
  for (let i = 0; i < selectQuantity.length; i++) {
    if (cartContent[i]._id == newProductStored[i]._id && cartContent[i].color == newProductStored[i].color && newQuantity < 100) {
      newProductStored[i].quantity = selectQuantity[i].value; //quantity now updated
    }
    localStorage.setItem("newProductStored", JSON.stringify(newProductStored)); //restore product of which quantity changed
    updateTotalArticlesAfterChange();
    updateTotalAmountAfterChange();
  }
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
    amount.textContent = globalAmount;
  }
  console.log(globalAmount);
}


/*
Manage possibility to delete product.
        -- Refresh cart --
*/
function deleteProduct() {
  const productToDelete = document.querySelectorAll(".deleteItem");

  for (let i = 0; i < productToDelete.length; i++) {
    productToDelete[i].addEventListener("click", function () {
      let askForDelete = confirm("🗑️ Voulez-vous supprimer ce produit ?");

      if (askForDelete == true) {
        productToDelete[i].closest("article").remove();

        // -- Identify product to delete (by id & color)--
        let productToDelete_Id = newProductStored[i]._id;
        console.log(productToDelete_Id);
        let productToDelete_Color = newProductStored[i].color;
        console.log(productToDelete_Color);

        newProductStored = newProductStored.filter(product => product._id !== productToDelete_Id || product.color !== productToDelete_Color);
      }
      // save user selection (localstorage)
      localStorage.setItem("newProductStored", JSON.stringify(newProductStored));
      updateTotalArticlesAfterChange();
      updateTotalAmountAfterChange();
      console.log(newProductStored);
    });
  }
}

// ---------- Manage Order ----------

/*     
    Step 1: Configuring form properties
*/

// Get and analyse user data entered (regEx)
validateForm();
function validateForm() {
  // -- firstname --
  let firstName = document.getElementById("firstName");
  let firstNameRegex = /^[a-zA-Z]+(-[a-zA-Z]+)*$/ //accept name with"-", no digit and special characters
  let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
  
  if (firstName) { //check that firstName is not null before event
    firstName.addEventListener("change", function () {
      if (!firstNameRegex.test(firstName.value)) {
        firstNameErrorMsg.innerText = `✋ Votre saisie contient au moins un caractère invalide. Notez que les caractères numériques et spéciaux ne sont pas supportés. Renouvelez votre saisie.`;
        firstName.style.border = "3px solid red";
      } else {
        firstName.style.border = "3px solid green";
        firstNameErrorMsg.innerText = "";
      }
    });
  }
  // -- lastname --
  let lastName = document.getElementById("lastName");
  let lastNameRegex = /^[a-zA-Z_ ]+(-[a-zA-Z_ ]+)*$/ //accept "-", space, no digit and special characters
  let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
  
  if (lastName) { //check that lastName is not null before event
    lastName.addEventListener("change", function () {
      if (!lastNameRegex.test(lastName.value)) {
        lastNameErrorMsg.innerText = `✋ Votre saisie contient au moins un caractère invalide. Notez que les caractères numériques et spéciaux ne sont pas supportés. Renouvelez votre saisie.`;
        lastName.style.border = "3px solid red";
      } else {
        lastName.style.border = "3px solid green";
        lastNameErrorMsg.innerText = "";
      }
    });
  }
  // -- address --
  let address = document.getElementById("address");
  let addressRegex = /^[a-zA-Z0-9_ ]+(-[a-zA-Z_ ]+)*$/ //accept "-", space, digit, no special characters
  let addressErrorMsg = document.getElementById("addressErrorMsg");
  
  if (address) { //check that address is not null before event
    address.addEventListener("change", function () {
      if (!addressRegex.test(address.value)) {
        addressErrorMsg.innerText = `✋ Votre saisie contient au moins un caractère invalide. Notez que les caractères spéciaux ne sont pas supportés. Renouvelez votre saisie.`;
        address.style.border = "3px solid red";
      } else {
        address.style.border = "3px solid green";
        addressErrorMsg.innerText = "";
      }
    });
  }
  // -- city --
  let city = document.getElementById("city");
  let cityRegex = /^[a-zA-Z_ ]+(-[a-zA-Z_ ]+)*$/ //accept "-", space, no digit and special characters
  let cityErrorMsg = document.getElementById("cityErrorMsg");
  
  if (city) { //check that city is not null before event
    city.addEventListener("change", function () {
      if (!cityRegex.test(city.value)) {
        cityErrorMsg.innerText = `✋ Votre saisie contient au moins un caractère invalide. Notez que les caractères numériques et spéciaux ne sont pas supportés. Renouvelez votre saisie.`;
        city.style.border = "3px solid red";
      } else {
        city.style.border = "3px solid green";
        cityErrorMsg.innerText = "";
      }
    });
  }
  // -- email --
  let email = document.getElementById("email");
  let emailRegex = /^[a-zA-Z-_\.]+@[a-zA-Z\.]*$/ //accept "-", space, no digit and special characters
  let emailErrorMsg = document.getElementById("emailErrorMsg");
  
  if (email) { //check that email is not null before event
    email.addEventListener("change", function () {
      if (!emailRegex.test(email.value)) {
        emailErrorMsg.innerText = `✋ Votre saisie contient au moins un caractère invalide. Notez que les caractères spéciaux ne sont pas supportés. Veuillez saisir une adresse mail au bon format.`;
        email.style.border = "3px solid red";
      } else {
        email.style.border = "3px solid green";
        emailErrorMsg.innerText = "";
      }
    });
  }
}

/*
    Step 2: Init order
*/

// By button "Commander" > Launch the order by making sure that order elements are valid
initOrder();
function initOrder() {
  const orderButton = document.getElementById("order");
  if (orderButton) {
    orderButton.addEventListener("click", function (event) {
      event.preventDefault();

      // -- Check user data > build contact object --

      let informationRequired = "⚠️ Information requise";
      let dataIsValid =
        !firstNameErrorMsg.innerText &&
        !lastNameErrorMsg.innerText &&
        !addressErrorMsg.innerText &&
        !cityErrorMsg.innerText &&
        !emailErrorMsg.innerText;
      console.log(dataIsValid);
      let borderInputFalse = "3px solid red";
      let contact = {};

      if (!firstName.value &&
        !lastName.value &&
        !address.value &&
        !city.value &&
        !email.value) {
        firstNameErrorMsg.innerText = informationRequired;
        lastNameErrorMsg.innerText = informationRequired;
        addressErrorMsg.innerText = informationRequired;
        cityErrorMsg.innerText = informationRequired;
        emailErrorMsg.innerText = informationRequired;

        firstName.style.border = borderInputFalse;
        lastName.style.border = borderInputFalse;
        address.style.border = borderInputFalse;
        city.style.border = borderInputFalse;
        email.style.border = borderInputFalse;
      }

      if (firstName.value && dataIsValid &&
        lastName.value && dataIsValid &&
        address.value && dataIsValid &&
        city.value && dataIsValid &&
        email.value && dataIsValid &&
        localStorage.getItem("newProductStored") !== null) { //return false if not correct data > can not build contact object 

        contact = {
          "firstName": firstName.value,
          "lastName": lastName.value,
          "address": address.value,
          "city": city.value,
          "email": email.value
        };
        console.log(contact);

        // -- Activity in cart > create array which contain product(s) ID --

        JSON.parse(localStorage.getItem("newProductStored"));
        for (let i = 0; i < newProductStored.length; i++) {
          products = [newProductStored[i]._id];
        }
        console.log(products);

        /*
            Step 3: Get order ID
        */

        // API: POST request > get orderId
        fetch("http://localhost:3000/api/products/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ contact, products })
        })
          .then(function (response) {
            return response.json()
          })
          .then(function (dataOrder) {
            console.log(dataOrder); //status 201 Created :) orderId generated!  
            orderId = dataOrder.orderId;
            console.log(orderId);

            localStorage.clear();
            confirmOrder();

          })
      }
    });
  }
}
/*
    Step 4: Redirection
*/
// Redirect user to Confirmation page (indicate orderId in url)

function confirmOrder() {
  location.href = `confirmation.html?id=${orderId}`;
}