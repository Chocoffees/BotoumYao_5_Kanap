// --- Get product ID -> Insert the details of each selected product on homepage ---

// Get the query string
const queryStringId = window.location.search;
console.log(queryStringId); // ?id=12345

// Get param value (id)
const params = new URLSearchParams(queryStringId);
console.log(params);

const ID = params.get("id");
console.log(ID); // 12345


// Get product data from API using id
fetch(`http://localhost:3000/api/products/${ID}`)
    .then(response => {
        if (response.ok) {
            return response.json()
        }
    })
    .then(productData => {
        console.log(productData);

        document.getElementsByClassName("item__img").innerHTML = `<img src="${productData.imageUrl}" alt=${productData.altTxt}>`;
        document.getElementById("title").innerHTML = `"${productData.name}"`;
        document.getElementById("price").innerHTML = `"${productData.price}"`;
        document.getElementById("description").innerHTML = `"${productData.description}"`;
    })