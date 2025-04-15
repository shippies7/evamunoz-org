<template>
  <main class="elos-container">
    <!-- Fila 1: Bienvenida -->
    <section class="row full-width">
      <div class="welcome-card">
        <h1>ELOS. Un refugio digital.</h1>
        <h2>Un punto de encuentro para quienes están cansados de aprender sin propósito.</h2>
        <p>Aquí no vienes solo a estudiar… vienes a conectarte contigo, con otros y con lo que de verdad importa.</p>
      </div>
    </section>

    <!-- Fila 2: Tarjeta inspiracional interactiva -->
    <section class="row two-cols">
      <div class="card inspirational-card">
        <h3 class="random-title">{{ selectedTitle }}</h3>
        <button @click="revealMessage" class="inspire-button">
          {{ buttonText }}
        </button>
        <transition name="magic-fade">
          <div v-if="messageVisible" class="inspire-message">
            <p>“{{ selectedMessage }}”</p>
          </div>
        </transition>
      </div>
      <div class="card progress-card">
        <h3 class="progress-title">🚀 Estamos trabajando en ello</h3>
        <p class="progress-text">Pronto podrás ver el tiempo restante para nuestro lanzamiento.</p>
        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>
    </section>
    
    <!-- Fila 3: Comunidad (3 mosaicos) -->
    <section class="row three-cols">
      <div class="card community-card">
        <h3 class="community-title">Si pudieras decirle algo a tu yo del pasado, ¿qué sería?</h3>
        <p class="community-explanation">
          <em>Estas son las respuestas de otros usuarios:</em>
        </p>
        <div class="community-slider">
          <transition-group name="slide-fade" tag="div" class="slider-container">
            <p v-for="(response, index) in displayedResponses" :key="index" class="slider-item">
              “{{ response }}”
            </p>
          </transition-group>
        </div>
        <button v-if="!showInput" @click="showInput = true" class="community-button">
          Quiero participar
        </button>
        <div v-if="showInput" class="community-input-section">
          <textarea
            v-model="userInput"
            class="community-textarea"
            placeholder="Escribe aquí tu mensaje..."
          ></textarea>
          <button @click="submitResponse" class="community-button">
            Enviar
          </button>
        </div>
        <div v-if="submitted" class="community-thank-you">
          <p>¡Gracias por compartir! Tu mensaje puede inspirar a otros.</p>
        </div>
      </div>
      <div class="card community-card-alt">
        <h3 class="mood-title">💭 ¿Cómo te sientes hoy?</h3>
        <div v-if="!moodSubmitted" class="mood-tracker">
          <p class="mood-question">Selecciona el emoji que mejor represente tu estado:</p>
          <div class="mood-options">
            <button
              v-for="(mood, index) in moods"
              :key="index"
              @click="submitMood(mood)"
              class="mood-option"
            >
              {{ mood.emoji }}
            </button>
          </div>
        </div>
        <div v-else class="mood-response">
          <p class="mood-thank-you"><em>Gracias por compartir. Tu estado emocional es importante para nosotros.</em></p>
          <p class="mood-quote">"{{ selectedMood.fact }}"</p>
          <p class="mood-tip">{{ selectedMood.tip }}</p>
        </div>
      </div>
      <div class="card community-card">
        <h3 class="mentor-title">📬 Aplicá como guía o mentor</h3>
        <p class="mentor-description">
          ¿Te gustaría apoyar a otros usuarios? Cuéntanos por qué quieres ser guía o mentor.
        </p>
        <button v-if="!mentorFormVisible" @click="mentorFormVisible = true" class="mentor-button">
          Quiero ser mentor
        </button>
        <div v-if="mentorFormVisible" class="mentor-form">
          <input
            v-model="mentorName"
            type="text"
            class="mentor-input"
            placeholder="Nombre completo"
          />
          <input
            v-model="mentorEmail"
            type="email"
            class="mentor-input"
            placeholder="Correo electrónico"
          />
          <textarea
            v-model="mentorReason"
            class="mentor-textarea"
            placeholder="¿Por qué quieres ser mentor?"
          ></textarea>
          <textarea
            v-model="mentorExperience"
            class="mentor-textarea"
            placeholder="Cuéntanos sobre tu experiencia."
          ></textarea>
          <button @click="submitMentorForm" class="mentor-submit-button">
            Enviar
          </button>
        </div>
        <div v-if="mentorSubmitted" class="mentor-thank-you">
          <p>¡Gracias por tu interés en ser mentor! Pronto te contactaremos por correo electrónico para continuar con el proceso.</p>
        </div>
      </div>
    </section>

    <!-- Fila 4: Gratitude Announcement -->
    <section class="row two-cols">
      <div class="card announcement-card">
        <h3 class="announcement-title">💖 Gracias por confiar en nosotros</h3>
        <p class="announcement-text">
          Estamos profundamente agradecidos por tu confianza en este proyecto desde el principio. Todas las personas que se están registrando ahora recibirán <strong>beneficios especiales de por vida</strong>, además de las características gratuitas que siempre estarán disponibles para todos.
        </p>
        <p class="announcement-highlight">
          🌟 Ayúdanos a llegar a más personas compartiendo este proyecto con quienes puedan necesitarlo.
        </p>
      </div>
      <div class="card sensory-card">
        <h2 class="sensory-title">🧘 Rincón de calma</h2>
        <div v-if="!isPlaying" class="sensory-intro">
          <p class="sensory-message">Dale play, cierra los ojos y respira. Todo va a estar bien.</p>
          <button @click="startCalmExperience" class="sensory-button">Dale play</button>
        </div>
        <div v-else class="sensory-experience">
          <p class="sensory-magical-message">{{ currentMeditationMessage }}</p>
          <div class="sensory-visuals"></div>
          <button @click="stopCalmExperience" class="sensory-button">Detener</button>
        </div>
        <div v-if="isPlaying" class="audio-container">
          <iframe
            width="0"
            height="0"
            src="https://vocaroo.com/embed/1nu1moC2UvWJ?autoplay=1"
            frameborder="0"
            allow="autoplay"
          ></iframe>
          <br />
        </div>
      </div>
    </section>

    <!-- Fila 5: Apoyo comunitario -->
    <section class="row full-width">
      <div class="card action-card-alt">
        <h3 class="support-title">🌟 Apoyo comunitario</h3>
        <p class="support-description">
          Comparte tu usuario de Instagram, tu país, y una breve descripción para que otros puedan seguirte y apoyar tus proyectos.
        </p>
        <div v-if="showInputForm">
          <input
            v-model="instagramName"
            type="text"
            class="support-input"
            placeholder="Tu nombre"
          />
          <select v-model="instagramCountry" class="support-select">
            <option value="" disabled>Selecciona tu país</option>
            <option v-for="country in countries" :key="country.code" :value="country.code">
              {{ country.name }}
            </option>
          </select>
          <input
            v-model="instagramUsername"
            type="text"
            class="support-input"
            placeholder="Tu usuario de Instagram (sin @)"
          />
          <textarea
            v-model="instagramDescription"
            class="support-textarea"
            placeholder="Breve descripción de tu cuenta"
          ></textarea>
          <button @click="submitInstagram" class="support-button">
            Enviar mi información
          </button>
        </div>
        <div class="shared-info-container">
          <div class="shared-info-header">
            <span class="shared-info-column">País</span>
            <span class="shared-info-column">Nombre</span>
            <span class="shared-info-column">Usuario (haz clic para seguirlos)</span>
            <span class="shared-info-column">¿Por qué seguirlos?</span>
          </div>
          <ul>
            <li v-for="(profile, index) in instagramProfiles" :key="index" class="shared-info-item">
              <span class="shared-info-column">
                <img
                  :src="'https://flagcdn.com/w40/' + profile.country.toLowerCase() + '.png'"
                  alt="Flag"
                  class="shared-info-flag"
                />
              </span>
              <span class="shared-info-column">{{ profile.name }}</span>
              <span class="shared-info-column">
                <a
                  :href="'https://www.instagram.com/' + profile.username"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="shared-info-link"
                >
                  @{{ profile.username }}
                </a>
              </span>
              <span class="shared-info-column">{{ profile.description }}</span>
            </li>
          </ul>
        </div>
        <div class="button-group">
          <button
            @click="toggleInputForm(!showInputForm)"
            class="toggle-button"
          >
            {{ showInputForm ? "Ver información compartida" : "Enviar mi información" }}
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../../firebase' // Ensure Firebase is correctly configured
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore'


const titles = [
  "Abre esto si necesitas un respiro",
  "Abre esto si necesitas recordarte quién eres",
  "Abre esto si necesitas volver a tu centro"
];

const messages = [
  "Fuiste creado con propósito, aunque el camino no siempre sea claro.",
  "Tu valor no cambia por lo que hiciste o dejaste de hacer.",
  "Hay un tiempo para todo. Este puede ser el tuyo.",
  "No estás solo. Hay una fuerza mayor que te sostiene.",
  "La calma viene después de la tormenta. Confía.",
  "Tu luz no depende de cuán oscuro esté el mundo."
];

const selectedTitle = ref(titles[Math.floor(Math.random() * titles.length)]);
const selectedMessage = ref("");
const messageVisible = ref(false);
const buttonText = ref("Abre aquí");

function revealMessage() {
  selectedMessage.value = messages[Math.floor(Math.random() * messages.length)];
  messageVisible.value = true;
  buttonText.value = "Abrir otra vez";
}

const userInput = ref("");
const submitted = ref(false);
const showInput = ref(false);
const responses = ref([]);
const displayedResponses = ref([]);
const backupResponses = ref([
  "Confía en ti mismo, todo saldrá bien.",
  "No tengas miedo de cometer errores, son parte del aprendizaje.",
  "Eres más fuerte de lo que crees.",
  "Aprecia los pequeños momentos, son los más importantes."
]);

async function loadResponses() {
  try {
    // Load "Yo del Pasado" responses
    const querySnapshot = await getDocs(collection(db, "yoDelPasado"));
    responses.value = querySnapshot.docs.map((doc) => doc.data().mensaje);
    if (responses.value.length === 0) {
      responses.value = [...backupResponses.value]; // Use backup if Firebase is empty
    }
    displayedResponses.value = [responses.value[0]];

    // Load "Apoyo Comunitario" profiles
    const communitySnapshot = await getDocs(collection(db, "communitySupport"));
    instagramProfiles.value = communitySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error al cargar los datos desde Firebase:", error);
    responses.value = [...backupResponses.value]; // Use backup if Firebase fails
    displayedResponses.value = [responses.value[0]];
  }
}

async function submitResponse() {
  if (userInput.value.trim()) {
    try {
      // Save the response to Firebase
      await addDoc(collection(db, "yoDelPasado"), {
        mensaje: userInput.value.trim(),
        fecha: serverTimestamp()
      });
      console.log("Mensaje guardado en Firebase!");

      // Add the response locally
      responses.value.push(userInput.value.trim());
      submitted.value = true;
      userInput.value = "";
      showInput.value = false;
    } catch (error) {
      console.error("Error al guardar el mensaje en Firebase:", error);
      alert("No se pudo guardar tu mensaje en este momento. Inténtalo más tarde.");
    }
  } else {
    alert("Por favor, escribe un mensaje antes de enviar.");
  }
}

function rotateResponses() {
  let index = 0;
  setInterval(() => {
    if (responses.value.length > 0) {
      displayedResponses.value = [responses.value[index]];
      index = (index + 1) % responses.value.length;
    }
  }, 3000);
}

onMounted(() => {
  loadResponses();
  rotateResponses();
});

const moodSubmitted = ref(false);
const selectedMood = ref({});
const moods = ref([
  {
    emoji: "😔",
    label: "Triste",
    facts: [
      "¿Sabías que llorar puede liberar hormonas del estrés y ayudarte a sentirte mejor?",
      "La tristeza es una emoción normal que nos ayuda a procesar pérdidas.",
      "Hablar con alguien de confianza puede reducir la tristeza significativamente."
    ],
    tips: [
      "Recuerda que incluso los días grises tienen su belleza.",
      "Tómate un momento para respirar profundamente y relajarte.",
      "No estás solo. Siempre hay alguien dispuesto a escucharte."
    ]
  },
  {
    emoji: "😐",
    label: "Neutral",
    facts: [
      "¿Sabías que estar neutral puede ser una señal de equilibrio emocional?",
      "La calma puede ser un estado ideal para tomar decisiones importantes.",
      "A veces, no sentir emociones intensas es una forma de recargar energías."
    ],
    tips: [
      "A veces, estar en calma es el mejor lugar para estar.",
      "Aprovecha este momento para reflexionar sobre tus metas.",
      "Disfruta de la tranquilidad y busca actividades que te inspiren."
    ]
  },
  {
    emoji: "🙂",
    label: "Contento",
    facts: [
      "¿Sabías que sonreír puede liberar endorfinas, incluso si no tienes ganas?",
      "La gratitud puede aumentar tu felicidad significativamente.",
      "Compartir tu alegría con otros puede fortalecer tus relaciones."
    ],
    tips: [
      "Tu sonrisa puede iluminar el día de alguien más.",
      "Haz algo que te haga feliz y compártelo con alguien cercano.",
      "Agradece los pequeños momentos que te hacen sonreír."
    ]
  },
  {
    emoji: "😊",
    label: "Feliz",
    facts: [
      "¿Sabías que la felicidad puede fortalecer tu sistema inmunológico?",
      "Las personas felices suelen ser más productivas y creativas.",
      "La felicidad es contagiosa y puede inspirar a quienes te rodean."
    ],
    tips: [
      "La felicidad es contagiosa, compártela con el mundo.",
      "Aprovecha este momento para hacer algo significativo.",
      "Recuerda este sentimiento y busca formas de mantenerlo."
    ]
  },
  {
    emoji: "😄",
    label: "Eufórico",
    facts: [
      "¿Sabías que la euforia puede aumentar tu energía y motivación?",
      "Los momentos de euforia pueden convertirse en recuerdos inolvidables.",
      "La euforia puede inspirarte a alcanzar nuevas metas."
    ],
    tips: [
      "¡Aprovecha este momento para crear recuerdos inolvidables!",
      "Usa esta energía para avanzar hacia tus sueños.",
      "Comparte tu entusiasmo con quienes te rodean."
    ]
  }
]);

function submitMood(mood) {
  const randomFact = mood.facts[Math.floor(Math.random() * mood.facts.length)];
  const randomTip = mood.tips[Math.floor(Math.random() * mood.tips.length)];
  selectedMood.value = { ...mood, fact: randomFact, tip: randomTip };
  moodSubmitted.value = true;
}

const mentorFormVisible = ref(false);
const mentorSubmitted = ref(false);
const mentorName = ref("");
const mentorEmail = ref("");
const mentorReason = ref("");
const mentorExperience = ref("");

async function submitMentorForm() {
  if (
    mentorName.value.trim() &&
    mentorEmail.value.trim() &&
    mentorReason.value.trim() &&
    mentorExperience.value.trim()
  ) {
    try {
      // Save the mentor application to Firebase
      await addDoc(collection(db, "mentorApplications"), {
        name: mentorName.value.trim(),
        email: mentorEmail.value.trim(),
        reason: mentorReason.value.trim(),
        experience: mentorExperience.value.trim(),
        submittedAt: serverTimestamp()
      });
      console.log("Mentor application saved to Firebase!");

      mentorSubmitted.value = true;
      mentorFormVisible.value = false;

      // Clear the form fields
      mentorName.value = "";
      mentorEmail.value = "";
      mentorReason.value = "";
      mentorExperience.value = "";
    } catch (error) {
      console.error("Error saving mentor application to Firebase:", error);
      alert("No se pudo enviar tu solicitud en este momento. Inténtalo más tarde.");
    }
  } else {
    alert("Por favor, completa todos los campos antes de enviar.");
  }
}

const socialMedia = ref("");
const socialMediaSubmitted = ref(false);

function submitSocialMedia() {
  if (socialMedia.value.trim()) {
    console.log("Social Media Shared:", socialMedia.value);
    socialMediaSubmitted.value = true;
    socialMedia.value = "";
  } else {
    alert("Por favor, escribe tus redes sociales antes de compartir.");
  }
}

const instagramName = ref("");
const instagramCountry = ref("");
const instagramUsername = ref("");
const instagramDescription = ref("");
const instagramProfiles = ref([]);
const showInputForm = ref(true);

const countries = ref([
  { code: "us", name: "Estados Unidos" },
  { code: "mx", name: "México" },
  { code: "es", name: "España" },
  { code: "ar", name: "Argentina" },
  { code: "co", name: "Colombia" },
  { code: "cl", name: "Chile" },
  { code: "br", name: "Brasil" },
  { code: "pe", name: "Perú" },
  { code: "ve", name: "Venezuela" },
  { code: "fr", name: "Francia" },
  { code: "de", name: "Alemania" },
  { code: "it", name: "Italia" },
  { code: "jp", name: "Japón" },
  { code: "kr", name: "Corea del Sur" },
  { code: "in", name: "India" },
]);

async function submitInstagram() {
  if (
    instagramName.value.trim() &&
    instagramCountry.value &&
    instagramUsername.value.trim() &&
    instagramDescription.value.trim()
  ) {
    try {
      // Save the Instagram profile to Firebase
      await addDoc(collection(db, "communitySupport"), {
        name: instagramName.value.trim(),
        country: instagramCountry.value,
        username: instagramUsername.value.trim(),
        description: instagramDescription.value.trim(),
        submittedAt: serverTimestamp()
      });
      console.log("Instagram profile saved to Firebase!");

      // Add the profile locally
      instagramProfiles.value.push({
        name: instagramName.value.trim(),
        country: instagramCountry.value,
        username: instagramUsername.value.trim(),
        description: instagramDescription.value.trim()
      });

      toggleInputForm(false); // Switch to shared data view after submission

      // Clear the form fields
      instagramName.value = "";
      instagramCountry.value = "";
      instagramUsername.value = "";
      instagramDescription.value = "";
    } catch (error) {
      console.error("Error saving Instagram profile to Firebase:", error);
      alert("No se pudo guardar tu información en este momento. Inténtalo más tarde.");
    }
  } else {
    alert("Por favor, completa todos los campos antes de compartir.");
  }
}

function toggleInputForm(show) {
  showInputForm.value = show;
}

const meditationMessages = ref([
  "Inhala y exhala profundamente.",
  "Enfócate en tu respiración.",
  "Cierra los ojos y relájate.",
  "Todo va a estar bien.",
  "Deja ir cualquier tensión."
]);

const currentMeditationMessage = ref(meditationMessages.value[0]);
const calmSound = ref("https://voca.ro/1nu1moC2UvWJ");
const calmAudio = ref(null);

function initializeAudio() {
  if (!calmAudio.value) {
    calmAudio.value = new Audio(calmSound.value);
    calmAudio.value.loop = true;
    calmAudio.value.volume = 0.5; // Adjust volume if needed
  }
}

function playCalmSound() {
  initializeAudio();
  calmAudio.value
    .play()
    .catch((e) => console.error("Error playing the sound:", e));
}

function stopCalmSound() {
  if (calmAudio.value) {
    calmAudio.value.pause();
    calmAudio.value.currentTime = 0; // Reset audio to the beginning
  }
}

function startCalmExperience() {
  isPlaying.value = true;
  playCalmSound();
}

function stopCalmExperience() {
  isPlaying.value = false;
  stopCalmSound();
}

function rotateMeditationMessages() {
  let index = 0;
  setInterval(() => {
    index = (index + 1) % meditationMessages.value.length;
    currentMeditationMessage.value = meditationMessages.value[index];
  }, 5000); // Change message every 5 seconds
}

onMounted(() => {
  rotateMeditationMessages();
});

const magicalMessages = ref([
  "✨ Inhala calma, exhala tensión.",
  "🌙 Deja que la paz te envuelva.",
  "💫 Tu mente está en equilibrio.",
  "🌟 Todo está bien en este momento.",
  "🌿 Siente la serenidad en tu interior."
]);

const currentMagicalMessage = ref(magicalMessages.value[0]);
const isPlaying = ref(false);

function rotateMagicalMessages() {
  let index = 0;
  setInterval(() => {
    index = (index + 1) % magicalMessages.value.length;
    currentMagicalMessage.value = magicalMessages.value[index];
  }, 5000); // Change message every 5 seconds
}

onMounted(() => {
  // Preload the calm sound
});
</script>

<style scoped>
/* General Styles */
.elos-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 3rem 2rem;
  background-color: #f0ebea;
  font-family: 'Inter', sans-serif;
  color: #686968;
}

/* Grid Layouts */
.row {
  display: grid;
  gap: 2rem;
}

.full-width {
  grid-template-columns: 1fr;
}

.two-cols {
  grid-template-columns: repeat(2, 1fr);
}

.three-cols {
  grid-template-columns: repeat(3, 1fr);
}

.four-cols {
  grid-template-columns: repeat(4, 1fr);
}

/* Welcome Section */
.welcome-card {
  background: linear-gradient(to right, #d8c4b6, #f0ebea);
  padding: 3rem;
  border-radius: 30px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  text-align: center;
  animation: fadeInUp 1s ease forwards;
}

.welcome-card h1 {
  font-size: 2.8rem;
  color: #cc8c6e;
  font-family: 'Libre Baskerville', serif;
  margin-bottom: 1rem;
}

.welcome-card h2 {
  font-size: 1.5rem;
  color: #686968;
  margin-bottom: 1.5rem;
}

.welcome-card p {
  font-size: 1.1rem;
  color: #686968;
  line-height: 1.8;
}

/* Card Styles */
.card {
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  text-align: center;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.card:hover {
  transform: scale(1.03);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
}

/* Colorful Cards */
.inspirational-card {
  background: linear-gradient(135deg, #f7ac58, #d8c4b6);
  color: #201b20;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.inspirational-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent);
  animation: rotateGlow 6s linear infinite;
  z-index: 0;
}

.inspirational-card h3 {
  position: relative;
  z-index: 1;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.philosophy-card {
  background: linear-gradient(135deg, #cc8c6e, #f0ebea);
  color: white;
}

.community-card {
  background-color: #d8c4b6;
  color: #201b20;
}

.community-card-alt {
  background: linear-gradient(135deg, #d8c4b6, #f0ebea); /* Colors from the provided image */
  color: #201b20;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  text-align: center;
  position: relative;
}

.action-card {
  background-color: #cc8c6e;
  color: white;
}

.action-card-alt {
  background-color: #f0ebea;
  color: #201b20;
}

.tools-card {
  background-color: #f7ac58;
  color: white;
}

.tools-card-alt {
  background-color: #d8c4b6;
  color: #201b20;
}

.sneak-card {
  background-color: #cc8c6e;
  color: white;
}

.sneak-card-alt {
  background-color: #f7ac58;
  color: white;
}

/* Full Card */
.full-card {
  background: linear-gradient(135deg, #f0ebea, #d8c4b6);
  padding: 3rem;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
  text-align: center;
  color: #cc8c6e;
  font-size: 1.2rem;
}

/* Button Styles */
.inspire-button {
  position: relative;
  z-index: 1;
  background-color: #cc8c6e;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 999px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-size: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.inspire-button:hover {
  background-color: #b97f6d;
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

/* Enhanced Magic Effect for the Message */
.inspire-message {
  position: relative;
  margin-top: 1.5rem;
  font-size: 1.5rem; /* Larger text for emphasis */
  font-weight: bold;
  color: #cc8c6e;
  text-align: center;
  background: linear-gradient(135deg, #fff5e6, #ffe4d1);
  padding: 1.5rem 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(204, 140, 110, 0.3), 0 0 40px rgba(247, 172, 88, 0.5);
  animation: fadeInUp 0.5s ease forwards; /* Smooth fade-in only */
  transform-origin: center;
}

/* Magic Fade Animation */
.magic-fade-enter-active {
  animation: magicGrowIn 0.8s ease-out forwards; /* Growing effect only once */
}

.magic-fade-leave-active {
  animation: fadeOut 0.5s ease-in forwards; /* Smooth fade-out if needed */
}

@keyframes magicGrowIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
    box-shadow: 0 0 10px rgba(204, 140, 110, 0.3), 0 0 20px rgba(204, 140, 110, 0.3);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 10px 30px rgba(204, 140, 110, 0.3), 0 0 40px rgba(247, 172, 88, 0.5);
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.8);
  }
}

/* Animations */


@keyframes glow {
  from {
    box-shadow: 0 0 10px #cc8c6e, 0 0 20px #cc8c6e;
  }
  to {
    box-shadow: 0 0 20px #f7ac58, 0 0 30px #f7ac58;
  }
}

@keyframes rotateGlow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Progress Card Styles */
.progress-card {
  background: linear-gradient(135deg, #f7ac58, #d8c4b6);
  color: #201b20;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.progress-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.progress-text {
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #201b20;
}

.progress-bar-container {
  width: 100%;
  height: 10px;
  background-color: #f0ebea;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
}

.progress-bar {
  width: 0%;
  height: 100%;
  background-color: #cc8c6e;
  animation: progressAnimation 3s infinite;
  border-radius: 5px;
}

@keyframes progressAnimation {
  0% {
    width: 0%;
  }
  50% {
    width: 80%;
  }
  100% {
    width: 0%;
  }
}

/* Community Card Styles */
.community-card {
  background-color: #d8c4b6;
  color: #201b20;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  text-align: center;
  position: relative;
}

.community-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.community-explanation {
  font-size: 0.9rem;
  color: #686968;
  margin-bottom: 1rem;
}

.community-slider {
  margin-top: 1rem;
  overflow: hidden;
  height: 50px;
}

.slider-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.slider-item {
  font-size: 1rem;
  font-style: italic;
  color: #201b20;
  transition: opacity 0.5s ease;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.5s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

.community-input-section {
  margin-top: 1.5rem;
}

.community-textarea {
  width: 100%;
  height: 80px;
  padding: 0.75rem;
  border: 1px solid #cc8c6e;
  border-radius: 10px;
  resize: none;
  font-size: 1rem;
  margin-bottom: 1rem;
  outline: none;
}

.community-textarea:focus {
  border-color: #b97f6d;
  box-shadow: 0 0 5px rgba(185, 127, 109, 0.5);
}

.community-button {
  background-color: #cc8c6e;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 999px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-size: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.community-button:hover {
  background-color: #b97f6d;
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.community-thank-you {
  font-size: 1rem;
  font-weight: bold;
  color: #cc8c6e;
  margin-top: 1rem;
}

/* Mood Tracker Styles */
.mood-title {
  font-size: 1.8rem; /* Slightly larger */
  font-weight: bold;
  margin-bottom: 1rem;
}

.mood-question {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.mood-options {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.mood-option {
  background-color: white;
  color: #d8c4b6;
  font-size: 1.5rem;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.mood-option:hover {
  transform: scale(1.1);
  background-color: #f0ebea;
}

.mood-response {
  margin-top: 1.5rem;
}

.mood-thank-you {
  font-size: 0.9rem;
  font-style: italic;
  color: #686968;
  margin-bottom: 1rem;
}

.mood-quote {
  font-size: 1rem;
  font-weight: normal;
  color: #201b20;
  margin-bottom: 1rem;
}

.mood-tip {
  font-size: 1rem;
  color: #201b20;
  font-weight: bold;
}

/* Mentor Card Styles */
.mentor-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.mentor-description {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #686968;
}

.mentor-button {
  background-color: #cc8c6e;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 999px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-size: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.mentor-button:hover {
  background-color: #b97f6d;
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.mentor-form {
  margin-top: 1rem;
}

.mentor-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #cc8c6e;
  border-radius: 10px;
  font-size: 1rem;
  margin-bottom: 1rem;
  outline: none;
}

.mentor-input:focus {
  border-color: #b97f6d;
  box-shadow: 0 0 5px rgba(185, 127, 109, 0.5);
}

.mentor-textarea {
  width: 100%;
  height: 80px;
  padding: 0.75rem;
  border: 1px solid #cc8c6e;
  border-radius: 10px;
  resize: none;
  font-size: 1rem;
  margin-bottom: 1rem;
  outline: none;
}

.mentor-textarea:focus {
  border-color: #b97f6d;
  box-shadow: 0 0 5px rgba(185, 127, 109, 0.5);
}

.mentor-submit-button {
  background-color: #f7ac58;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 999px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-size: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.mentor-submit-button:hover {
  background-color: #e69a4c;
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.mentor-thank-you {
  font-size: 1rem;
  font-weight: bold;
  color: #cc8c6e;
  margin-top: 1rem;
}

/* Community Support Card Styles */
.support-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.support-description {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #686968;
}

.support-input,
.support-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #cc8c6e;
  border-radius: 10px;
  font-size: 1rem;
  margin-bottom: 1rem;
  outline: none;
}

.support-input:focus,
.support-select:focus {
  border-color: #b97f6d;
  box-shadow: 0 0 5px rgba(185, 127, 109, 0.5);
}

.support-textarea {
  width: 100%;
  height: 80px;
  padding: 0.75rem;
  border: 1px solid #cc8c6e;
  border-radius: 10px;
  resize: none;
  font-size: 1rem;
  margin-bottom: 1rem;
  outline: none;
}

.support-textarea:focus {
  border-color: #b97f6d;
  box-shadow: 0 0 5px rgba(185, 127, 109, 0.5);
}

.support-button,
.view-shared-button {
  background-color: #f7ac58;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 999px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-size: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
}

.support-button:hover,
.view-shared-button:hover {
  background-color: #e69a4c;
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.support-thank-you {
  font-size: 1rem;
  font-weight: bold;
  color: #cc8c6e;
  margin-top: 1rem;
}

.shared-info-container {
  margin-top: 1.5rem;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #f0ebea;
  border-radius: 10px;
  padding: 1rem;
  background-color: white;
}

.shared-info-item {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 2fr;
  gap: 1rem;
  align-items: center; /* Ensures vertical alignment */
  margin-bottom: 0.5rem;
}

.shared-info-flag {
  width: 30px;
  height: 20px;
  border-radius: 3px;
  object-fit: cover;
  display: block;
  margin: 0 auto; /* Centers the flag horizontally */
}

.shared-info-column {
  font-size: 0.9rem;
  color: #201b20;
}

.shared-info-link {
  color: #f7ac58;
  text-decoration: none;
  font-weight: bold;
}

.shared-info-link:hover {
  text-decoration: underline;
}

/* Shared Info Header Styles */
.shared-info-header {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 2fr;
  gap: 1rem;
  padding: 0.5rem 1rem;
  background-color: #f0ebea;
  border-radius: 10px;
  font-weight: bold;
  color: #686968;
  margin-bottom: 1rem;
  text-align: center;
}

/* Toggle Buttons */
.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.toggle-button {
  flex: 1;
  background-color: #f0ebea;
  color: #cc8c6e;
  font-weight: 600;
  border: 1px solid #cc8c6e;
  border-radius: 999px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.toggle-button.active {
  background-color: #cc8c6e;
  color: white;
}

.toggle-button:hover {
  background-color: #b97f6d;
  color: white;
}

/* Responsive Grid Layouts */
.row {
  display: grid;
  gap: 2rem;
}

.three-cols {
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 1024px) {
  .three-cols {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .three-cols {
    grid-template-columns: 1fr;
  }
}

/* Announcement Card Styles */
.announcement-card {
  background: linear-gradient(135deg, #ffe4d1, #f0ebea);
  color: #201b20;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.announcement-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #b97f6d;
}

.announcement-text {
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #201b20;
  line-height: 1.6;
}

.announcement-highlight {
  font-size: 1.2rem;
  font-weight: bold;
  color: #cc8c6e;
  margin-bottom: 1.5rem;
}

/* Sensory Card Styles */
.sensory-card {
  background: linear-gradient(135deg, #d8c4b6, #f0ebea);
  color: #201b20;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.sensory-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #b97f6d;
}

.sensory-intro .sensory-message {
  font-size: 1.2rem;
  font-weight: bold;
  color: #201b20;
  margin-bottom: 1.5rem;
}

.sensory-button {
  background-color: #cc8c6e;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 999px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-size: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.sensory-button:hover {
  background-color: #b97f6d;
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.sensory-experience {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.sensory-magical-message {
  font-size: 1.8rem;
  font-weight: bold;
  color: #cc8c6e;
  text-align: center;
  animation: fadeIn 2s ease-in-out infinite alternate, glowText 3s infinite;
  text-shadow: 0 0 10px rgba(204, 140, 110, 0.5), 0 0 20px rgba(247, 172, 88, 0.5);
  transition: transform 0.5s ease, color 0.5s ease;
}

.sensory-magical-message:hover {
  transform: scale(1.05);
  color: #b97f6d;
}

@keyframes glowText {
  0% {
    text-shadow: 0 0 10px rgba(204, 140, 110, 0.5), 0 0 20px rgba(247, 172, 88, 0.5);
  }
  50% {
    text-shadow: 0 0 15px rgba(204, 140, 110, 0.7), 0 0 30px rgba(247, 172, 88, 0.7);
  }
  100% {
    text-shadow: 0 0 10px rgba(204, 140, 110, 0.5), 0 0 20px rgba(247, 172, 88, 0.5);
  }
}

.sensory-visuals {
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.5), transparent);
  border-radius: 50%;
  animation: pulse 3s infinite;
}

@keyframes fadeIn {
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}

.audio-container {
  margin-top: 1rem;
  text-align: center;
}
</style>