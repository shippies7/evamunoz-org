<template>
  <div class="register-container">
    <div v-if="successMessage">
      <h3 class="success-title">¡Te registraste exitosamente! 🥳</h3>
      <p>
        Gracias por unirte a <strong>ELOS</strong>.<br />
        Estamos creando contenido en base a lo que nuestra comunidad realmente necesita.
      </p>
      <p>
        ¿Te gustaría responder una pequeña encuesta para ayudarnos a construirlo con intención?
      </p>
      <button @click="goToSurvey" class="survey-button">Sí, quiero responder la encuesta</button>
      <button @click="stayHere" class="survey-button cancel">No por ahora</button>
    </div>

    <div v-else>
      <div class="text-container">
        <h2 class="title">Regístrate en ELOS</h2>
        <h2 class="note">by evamunoz.org</h2>
        <p class="description">
          Estás en tu refugio digital para aprender, crecer y sanar. 
          Al registrarte estarás entre las primeras personas en
          <strong>recibir acceso a los calendarios de cursos en vivo,</strong>
          <strong>descuentos especiales</strong> y
          <strong>contenido exclusivo y gratuito</strong> cuidadosamente seleccionado.
          <strong>para tí.</strong>
        </p>
      </div>

      <form class="form" @submit.prevent="register">
        <input v-model="name" type="text" placeholder="Nombre completo" required />
        <input v-model="email" type="email" placeholder="Correo electrónico" required />
        <input v-model="password" type="password" placeholder="Contraseña" required />

        <div class="checkbox">
          <input type="checkbox" id="acceptEmails" v-model="acceptEmails" />
          <label for="acceptEmails">
            Acepto recibir correos con información exclusiva, descuentos y novedades de la plataforma.
          </label>
        </div>

        <button class="register-button" type="submit">Registrarme</button>
      </form>

      <div class="divider">o</div>

      <button class="google-button" @click="registerWithGoogle">
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" />
        Registrarme con Google
      </button>

      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { auth, googleProvider } from "../firebase.js";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup
} from "firebase/auth";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      acceptEmails: false,
      error: null,
      successMessage: false,
    };
  },
  methods: {
    async register() {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
        await updateProfile(userCredential.user, { displayName: this.name });
        this.successMessage = true;
      } catch (err) {
        if (err.code === "auth/email-already-in-use") {
          this.error = "Este correo ya está registrado. Intenta iniciar sesión o usar otro.";
        } else {
          this.error = err.message;
        }
      }
    },
    async registerWithGoogle() {
      try {
        await signInWithPopup(auth, googleProvider);
        this.successMessage = true;
      } catch (err) {
        this.error = err.message;
      }
    },
    goToSurvey() {
      this.$router.push("/survey");
    },
    stayHere() {
      this.$router.push("/dashboard");
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
  box-shadow: 0 5px 20px rgba(0,0,0,0.05);
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

.checkbox {
  text-align: left;
  margin: 10px 0;
  font-size: 0.75rem;
  color: #444;
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

.success-title {
  font-size: 1.5rem;
  color: #b9a09c;
  margin-bottom: 10px;
}

.survey-button {
  background-color: #b9a09c;
  color: white;
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}

.survey-button.cancel {
  background-color: transparent;
  color: #b9a09c;
  border: 1px solid #b9a09c;
}
</style>
