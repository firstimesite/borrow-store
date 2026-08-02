import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDnNZDXOFX_588n5UeACnnU8gqkz12eGnI",
  authDomain: "borrow-store.firebaseapp.com",
  projectId: "borrow-store",
  storageBucket: "borrow-store.firebasestorage.app",
  messagingSenderId: "710255570161",
  appId: "1:710255570161:web:b0a5a5da3e35950ca68d50"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.getElementById("cartCount").innerText = cart.length;

async function loadProducts() {

  const container = document.getElementById("products");

  container.innerHTML = "";

  const snapshot = await getDocs(collection(db, "products"));

  snapshot.forEach((doc) => {

    const product = doc.data();

    product.id = doc.id;

    const status =
      product.status === "available"
        ? '<span class="badge bg-success">🟢 متاح</span>'
        : '<span class="badge bg-danger">🔴 مُعار</span>';

    const button =
      product.status === "available"
        ? `
          <button
            class="btn btn-primary w-100"
            onclick="addToCart('${product.id}')">

            🛒 إضافة إلى سلة الإعارة

          </button>
        `
        : `
          <button
            class="btn btn-secondary w-100"
            disabled>

            🔴 المنتج مُعار

          </button>
        `;

    container.innerHTML += `
      <div class="col-md-4 mb-4">

        <div class="card h-100 shadow-sm">

          <img
            src="${product.image}"
            class="card-img-top"
            alt="${product.name}">

          <div class="card-body">

            <h5>${product.name}</h5>

            <p>${product.description}</p>

            ${status}

          </div>

          <div class="card-footer">

            ${button}

          </div>

        </div>

      </div>
    `;

  });

}

window.addToCart = function(id) {

  if (cart.includes(id)) {

    alert("هذا المنتج موجود بالفعل في السلة");

    return;

  }

  cart.push(id);

  localStorage.setItem("cart", JSON.stringify(cart));

  document.getElementById("cartCount").innerText = cart.length;

  alert("تمت إضافة المنتج إلى السلة");

};

loadProducts();
