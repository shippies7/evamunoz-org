import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { authStore } from "./authStore";

// Configuración (copiada de la tuya)
const firebaseConfig = {
  apiKey: "AIzaSyCq0ibotgvYgT9CV7ZWpYUvzbzYtjwMZtk",
  authDomain: "evamunoz-org.firebaseapp.com",
  projectId: "evamunoz-org",
  storageBucket: "evamunoz-org",
  messagingSenderId: "949093978498",
  appId: "1:940993798498:web:d46df1c2a643b6d59d0c3b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("🔥 Sesión persistente activada.");
  })
  .catch((error) => {
    console.error("⚠️ Error al activar sesión persistente:", error);
  });

onAuthStateChanged(auth, (user) => {
  authStore.setUser(user);
  console.log("👤 Estado de sesión:", user ? "logueado" : "no logueado");
});

export { auth, db, googleProvider };
