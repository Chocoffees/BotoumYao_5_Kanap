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
            img.alt = `${productData.altTxt}`;
            document.querySelector(".item__img").appendChild(img);
            //console.log(img);

            // -- Product name --
            document.getElementById("title").innerHTML = `${productData.name}`;

            // -- Product price --
            document.getElementById("price").innerHTML = `${productData.price}`;

            // -- Product description --
            document.getElementById("description").innerHTML = `${productData.description}`;

            // -- Product colors --
            // -- Customization option --
            let selection = document.getElementById("colors");
            //console.log(selection);
            let colorList = productData.colors;
            //console.log(colorList);

            colorList.forEach((colors) => {
                let settingColor = document.createElement("option");
                settingColor.textContent = `${colors}`;
                settingColor.value = `${colors}`;
                selection.appendChild(settingColor);
                console.log(settingColor);
            })
        })

}


// --- Add clicked product(s) to cart ---
// cart = [] > contain product-ID + quantity + color

startShopping();
function startShopping() {
    var addToCartButton = document.getElementById("addToCart");
    addToCartButton.addEventListener('click', addProductToCart)
}

//addProductToCart(); function called twice: generated error in localStorage -> deleted
function addProductToCart() {
    var productAdded = {
        "_id": ID,
        "quantity": document.getElementById("quantity").value,
        "color": document.getElementById("colors").value
    };
    //console.log(productAdded);

    // --- Storage -> Allow access to cart ---
    // onclick -> add each product(s) to local storage (cart)

    let productStored = JSON.parse(localStorage.getItem("productStored")) || [];

    // check product registration before adding
    if (localStorage.getItem("productAdded") == null) {

        // check duplicate product(s) (cart) -> adjust quantity
        let duplicateProduct = productStored.find(product => (product._id === ID && product.color === document.getElementById("colors").value));

        if (duplicateProduct !== undefined) {
            duplicateProduct.quantity++;
        } else {
            productStored.push(productAdded);
        }
        localStorage.setItem("productStored", JSON.stringify(productStored));
        console.log(productStored);

    }
}