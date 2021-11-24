// --- Get products from API ---

//API Request
fetch('http://localhost:3000/api/products')
    .then(response => {
        if (response.ok) {
            return response.json()
        }
    })

//

    .then(productList => {
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
    .catch(function(error) {
        console.log('error');
    })
