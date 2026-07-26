const cart = JSON.parse(localStorage.getItem("cart")) || [];

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

          </div>

        </div>
      `;

    });

  });
