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

async function testFirebase() {

  const snapshot = await getDocs(collection(db, "products"));

  snapshot.forEach((doc) => {

    console.log(doc.id, doc.data());

  });

}

testFirebase();
