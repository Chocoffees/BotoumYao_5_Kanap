// --- Get products from API ---
getAllProducts();

async function getAllProducts() {
    // API Request
    await fetch('http://localhost:3000/api/products')
        .then(function (response) {
            return response.json()
        })

        // Insert each product details on homepage
        .then(function (productList) {
            console.log(productList);
            for (let product of productList) {
                document.querySelector(".items").innerHTML += `<a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}, ${product.name}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`;
            }
        })
        .catch(error => {
            console.log('error');
        })
}