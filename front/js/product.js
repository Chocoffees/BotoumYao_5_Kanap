// --- Get product ID -> Insert the details of each selected product on homepage ---

// Get the query string
const queryStringId = window.location.search;
console.log(queryStringId); // ?id=12345

// Get param value (id)
const params = new URLSearchParams(queryStringId);
console.log(params);

const ID = params.get("id");
console.log(ID); // 12345

getOneProduct();

function getOneProduct() {
    // Get product data from API using id
    fetch(`http://localhost:3000/api/products/${ID}`)
        .then((response) => response.json())
        .then(
            (productData) => {
                console.log(productData);

                // Insert data in DOM
                // -- Product image --
                var img = document.createElement("img");
                img.src = `${productData.imageUrl}`;
                img.alt = `${productData.altTxt}`;
                document.querySelector(".item__img").appendChild(img);
                console.log(img);

                // -- Product name --
                document.getElementById("title").innerHTML = `"${productData.name}"`;

                // -- Product price --
                document.getElementById("price").innerHTML = `"${productData.price}"`;

                // -- Product description --
                document.getElementById("description").innerHTML = `"${productData.description}"`;
            }
        )
}
