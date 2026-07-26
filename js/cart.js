const cart = JSON.parse(localStorage.getItem("cart")) || [];

document.getElementById("cartItems").innerHTML =
    "<h5>محتويات السلة:</h5><pre>" +
    JSON.stringify(cart, null, 2) +
    "</pre>";

fetch("data/products.json")
  .then(response => response.json())
  .then(products => {

    const container = document.getElementById("cartItems");

    const selectedProducts = products.filter(product =>
      cart.includes(product.id)
    );

    if (selectedProducts.length === 0) {

      container.innerHTML = `
        <div class="alert alert-warning">
          🛒 سلة الإعارة فارغة.
        </div>
      `;

      return;
    }

    selectedProducts.forEach(product => {

      const status =
        product.status === "available"
          ? '<span class="badge bg-success">متاح</span>'
          : '<span class="badge bg-danger">مُعار</span>';

      container.innerHTML += `
        <div class="card mb-3">

          <div class="card-body">

            <h4>${product.name}</h4>

            <p>${product.description}</p>

${status}

<br><br>

<button
class="btn btn-danger"
onclick="removeFromCart(${product.id})">

🗑 حذف من السلة

</button>

          </div>

        </div>
      `;

    });

  });
function removeFromCart(id){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const index = cart.indexOf(id);

    if(index !== -1){

        cart.splice(index,1);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();

}
