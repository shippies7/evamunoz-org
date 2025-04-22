// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Config de tu proyecto en Firebase (TUS CLAVES, NO TOCO NADA 😇)
const firebaseConfig = {
  apiKey: "AIzaSyCq0ibotgvYgT9CV7ZWpYUvzbzYtjwMZtk",
  authDomain: "evamunoz-org.firebaseapp.com",
  projectId: "evamunoz-org",
  storageBucket: "evamunoz-org.appspot.com", // ← ESTO es lo único que modifiqué, lo corregí
  messagingSenderId: "949093978498",
  appId: "1:940993798498:web:d46df1c2a643b6d59d0c3b"
};

// Inicialización de Firebase
const app = initializeApp(firebaseConfig);

// Servicios disponibles
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Configuramos que se mantenga logueado aunque cierre el navegador
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("🧠 Sesión persistente activada.");
  })
  .catch((error) => {
    console.error("⚠️ Error en persistencia:", error);
  });

// Escucha si hay sesión activa o no
export const listenForAuthState = (callback) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("✅ Usuario logueado:", user);
      callback(user);
    } else {
      console.log("🚫 No hay usuario logueado.");
      callback(null);
    }
  });
};

export { auth, db, googleProvider };
