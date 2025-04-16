<template>
  <div class="dashboard-container">
    <h1 class="dashboard-title">Bienvenida a tu Dashboard</h1>
    <p class="dashboard-description">
      Desde acá vas a poder acceder a todo lo que ELOS tiene para vos.
    </p>

    <div class="clase-viva-container">
      <router-link
        v-if="userLoggedIn"
        to="/vivo"
        class="clase-viva-btn"
      >
        Entrar a clase en vivo
      </router-link>

      <p v-else class="login-msg">
        Iniciá sesión o registrate para acceder a la clase en vivo.
      </p>
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  data() {
    return {
      userLoggedIn: false,
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.userLoggedIn = !!user;
    });
  },
};
</script>

<style scoped>
.dashboard-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 30px;
  text-align: center;
}

.dashboard-title {
  font-size: 2.5rem;
  color: #b9a09c;
  margin-bottom: 10px;
  font-family: 'Libre Baskerville', serif;
}

.dashboard-description {
  font-size: 1rem;
  color: #565657;
  margin-bottom: 40px;
}

.clase-viva-container {
  margin-top: 20px;
}

.clase-viva-btn {
  display: inline-block;
  padding: 12px 24px;
  background-color: #b9a09c;
  color: white;
  text-decoration: none;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.clase-viva-btn:hover {
  background-color: #a78a86;
}

.login-msg {
  color: #9a9a9c;
  font-style: italic;
  font-size: 0.95rem;
}
</style>
