// --- Get product ID -> Insert the details of each selected product on homepage ---

// Get the query string
const queryStringId = window.location.search;
//console.log(queryStringId); // ?id=12345

// Get param value (id)
const params = new URLSearchParams(queryStringId);
//console.log(params);

const ID = params.get("id");
console.log(ID); // 12345

getOneProduct();

async function getOneProduct() {
    // Get product data from API using id
    await fetch(`http://localhost:3000/api/products/${ID}`)
        .then(function (response) {
            return response.json()
        })
        .then(function (productData) {
            console.log(productData);

            // Insert data in DOM
            // -- Product image --
            var img = document.createElement("img");
            img.src = `${productData.imageUrl}`;
            productImageUrl = document.querySelector(".item__img").value = img.src;
            console.log(productImageUrl);
            img.alt = `${productData.altTxt}, ${productData.name}`;
            productImageAlt = document.querySelector("img").innerText = img.alt;
            console.log(productImageAlt);
            document.querySelector(".item__img").appendChild(img);
            console.log(img);

            // -- Product name --
            let title = document.getElementById("title");
            productName = title.innerText = `${productData.name}`;

            // -- Product price --
            let price = document.getElementById("price");
            productPrice = price.innerHTML = `${productData.price}`;

            // -- Product description --
            let description = document.getElementById("description");
            productDescription = description.innerHTML = `${productData.description}`;

            // -- Product colors --
            // -- Customization option --
            let selection = document.getElementById("colors");
            let colorList = productData.colors;

            colorList.forEach((colors) => {
                let settingColor = document.createElement("option");
                settingColor.textContent = `${colors}`;
                settingColor.value = `${colors}`;
                selection.appendChild(settingColor);
                //console.log(settingColor);
            })
        })

}


// --- Add clicked product(s) to cart ---
/* cart = [] > contain product-ID + quantity + color
   onclick -> add each product(s) to local storage (cart) */

startShopping();
function startShopping() {
    var addToCartButton = document.getElementById("addToCart");
    addToCartButton.addEventListener('click', addProductToCart)
}

function addProductToCart() {
    var productAdded = {
        "_id": ID,
        "quantity": document.getElementById("quantity").value,
        "color": document.getElementById("colors").value,
        "imageUrl": productImageUrl,
        "altTxt": productImageAlt,
        "name": productName,
        "description": productDescription,
        "price": productPrice
    };
    console.log(productAdded);
    alert("✔️ Produit ajouté avec succès !");
    
    // --- Storage -> Allow access to cart ---

    let productStored = JSON.parse(localStorage.getItem("productStored")) || [];

    // check duplicate product(s): same id & color (cart) -> adjust quantity
    let duplicateProduct = productStored.find(product => (product._id === ID && product.color === document.getElementById("colors").value));

    if (duplicateProduct !== undefined) {
        duplicateProduct.quantity++;
    } else {
        productStored.push(productAdded);
    }

    // save user selection
    localStorage.setItem("productStored", JSON.stringify(productStored));
    console.log(productStored);

}