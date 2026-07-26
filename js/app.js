fetch("data/products.json")
  .then(response => response.json())
  .then(products => {

    const container = document.getElementById("products");

    products.forEach(product => {

      const status =
        product.status === "available"
          ? '<span class="badge bg-success">🟢 متاح</span>'
          : '<span class="badge bg-danger">🔴 مُعار</span>';

      container.innerHTML += `
        <div class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm">

            <img src="${product.image}"
                 class="card-img-top"
                 alt="${product.name}">

            <div class="card-body">

              <h5>${product.name}</h5>

              <p>${product.description}</p>

              ${status}

            </div>

            <div class="card-footer">

              <button
  class="btn btn-primary w-100"
  onclick="addToCart(${product.id})">

  🛒 إضافة إلى سلة الإعارة

</button>

            </div>

          </div>
        </div>
      `;

    });

  })
  .catch(error => {
    console.error("خطأ في تحميل المنتجات:", error);
  });
let cart = [];

function addToCart(id){

    cart.push(id);

    document.getElementById("cartCount").innerText = cart.length;

    alert("تمت إضافة المنتج إلى السلة");

}
