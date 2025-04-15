<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/">Inicio</router-link>

      <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
      <router-link v-if="!isAuthenticated" to="/register">Registro</router-link>

      <router-link v-if="isAuthenticated" to="/elos">ELOS</router-link>
      <span v-if="!isAuthenticated" class="elos-disabled">(iniciá sesión para ver ELOS)</span>

      <button v-if="isAuthenticated" @click="logout" class="logout-btn">Cerrar sesión</button>
    </nav>

    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { auth } from "./firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { authStore } from "./authStore"; // Asegurate que exista y esté bien configurado

const isAuthenticated = ref(false);

const logout = async () => {
  try {
    await signOut(auth);
    authStore.user = null;
    isAuthenticated.value = false;
    window.location.href = "/login";
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isAuthenticated.value = !!user;
    authStore.user = user;
    console.log("Estado de sesión:", user ? "logueado" : "no logueado");
  });
});
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 2rem;
  background-color: #f0ebea;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  font-weight: bold;
  font-size: 0.95rem;
  max-width: 1100px;
  margin: 0 auto;
}

.navbar a {
  text-decoration: none;
  color: #686968;
  transition: color 0.3s;
}

.navbar a:hover {
  color: #b9a09c;
}

.elos-disabled {
  color: #aaa;
  font-style: italic;
}

.logout-btn {
  background: transparent;
  border: none;
  color: #b9a09c;
  font-weight: bold;
  cursor: pointer;
  padding: 6px 10px;
  transition: color 0.3s;
}

.logout-btn:hover {
  color: #a78a86;
}
</style>
