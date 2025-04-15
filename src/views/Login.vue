<template>
  <div class="register-container">
    <div class="text-container">
      <h2 class="title">Inicia sesión en ELOS</h2>
      <h2 class="note">by evamunoz.org</h2>
      <p class="description">
        Bienvenido de vuelta a este espacio creado para acompañarte.
      </p>
    </div>

    <form class="form" @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Correo electrónico" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />

      <button class="register-button" type="submit">Iniciar sesión</button>
    </form>

    <div class="divider">o</div>

    <button class="google-button" @click="loginWithGoogle">
      <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" />
      Iniciar sesión con Google
    </button>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import { auth, googleProvider } from "../firebase.js";
import { signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { authStore } from "../authStore";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authStore.user = user;
        this.$router.push("/elos");
      }
    });
  },
  methods: {
    async login() {
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push("/elos");
      } catch (err) {
        this.error = "Correo o contraseña incorrectos. Por favor, intentá de nuevo.";
      }
    },
    async loginWithGoogle() {
      try {
        await signInWithPopup(auth, googleProvider);
        this.$router.push("/elos");
      } catch (err) {
        this.error = err.message;
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  max-width: 440px;
  margin: 200px auto;
  padding: 80px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.text-container {
  margin-bottom: 5px;
}

.title {
  font-family: 'Libre Baskerville', serif;
  font-size: 2.5rem;
  margin-bottom: -5px;
  color: #b9a09c;
}

.description {
  font-size: 0.9rem;
  color: #565657;
  margin-bottom: -5px;
}

.note {
  display: block;
  margin-top: 2px;
  font-size: 0.75rem;
  color: #9a9a9c;
}

.form input {
  width: 100%;
  padding: 10px;
  margin: 6px 0;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 0.9rem;
}

.register-button {
  width: 100%;
  padding: 10px;
  background-color: #b9a09c;
  color: white;
  border: none;
  border-radius: 8px;
  margin-top: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.register-button:hover {
  background-color: #a78a86;
}

.divider {
  margin: 20px 0;
  color: #aaa;
  font-size: 0.8rem;
}

.google-button {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 0.9rem;
  cursor: pointer;
}

.google-button img {
  width: 18px;
  height: 18px;
}

.error {
  margin-top: 10px;
  color: red;
  font-size: 0.85rem;
}
</style>
