<template>
  <div class="survey-wrapper">
    <div class="survey-container">
      <h2 class="title">Queremos conocerte mejor <span class="emoji"></span></h2>
      <p class="description">
        Esta encuesta nos ayuda a crear contenido útil y personalizado. <strong>¡Tu opinión es clave!</strong>
      </p>

      <form @submit.prevent="submitSurvey">
        <!-- País -->
        <div class="card">
          <label class="section-title">¿En qué país vivís actualmente?</label>
          <input v-model="country" placeholder="Ej. México, Argentina, España..." class="other-input" />
        </div>

        <!-- Temas de interés -->
        <div class="card">
          <label class="section-title">Temas que te interesan</label>
          <div class="checkbox-grid fixed-columns">
            <div class="checkbox-item" v-for="item in interestOptions" :key="item">
              <label><input type="checkbox" :value="item" v-model="interests" /><span>{{ item }}</span></label>
            </div>
            <div class="checkbox-item">
              <label><input type="checkbox" value="Otros" v-model="interests" /><span>Otros</span></label>
            </div>
          </div>
          <input 
            v-if="interests.includes('Otros')" 
            v-model="otherInterest" 
            placeholder="¿Cuál otro tema?" 
            class="other-input"
          />
        </div>

        <!-- Días preferidos -->
        <div class="card">
          <label class="section-title">¿Qué días preferís para tomar los cursos?</label>
          <div class="checkbox-grid fixed-columns">
            <div class="checkbox-item" v-for="day in daysOfWeek" :key="day">
              <label><input type="checkbox" :value="day" v-model="preferredDays" /><span>{{ day }}</span></label>
            </div>
          </div>
        </div>

        <!-- Horarios preferidos -->
        <div class="card">
          <label class="section-title">¿En qué horarios te viene mejor?</label>
          <div class="checkbox-grid fixed-columns">
            <div class="checkbox-item" v-for="hour in timeRanges" :key="hour">
              <label><input type="checkbox" :value="hour" v-model="preferredHours" /><span>{{ hour }}</span></label>
            </div>
          </div>
        </div>

        <button class="submit-button" type="submit">Enviar respuestas</button>
      </form>
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getApp } from "firebase/app";

export default {
  data() {
    return {
      country: "",
      interests: [],
      otherInterest: "",
      preferredDays: [],
      preferredHours: [],
      interestOptions: ["Negocios", "Emociones", "Productividad", "Autoestima"],
      daysOfWeek: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
      timeRanges: [
        "07:00 - 11:00",
        "11:00 - 15:00",
        "15:00 - 19:00",
        "19:00 - 23:00"
      ],
    };
  },
  methods: {
    async submitSurvey() {
      const db = getFirestore(getApp());
      try {
        await addDoc(collection(db, "surveyResponses"), {
          country: this.country,
          interests: this.interests,
          otherInterest: this.otherInterest,
          preferredDays: this.preferredDays,
          preferredHours: this.preferredHours,
          createdAt: new Date()
        });
        alert("¡Gracias por responder la encuesta! ✨");
        this.$router.push("/elos");
      } catch (e) {
        console.error("Error al guardar la encuesta:", e);
        alert("Hubo un error al guardar tu respuesta. Por favor, intentá de nuevo.");
      }
    }
  }
};
</script>

<style scoped>
.survey-wrapper {
  display: flex;
  justify-content: center;
  padding: 50px 16px;
  width: 100%;
  box-sizing: border-box;
}

.survey-container {
  width: 100%;
  max-width: 620px;
  margin: 0 auto;
  padding: 40px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  animation: fadeIn 0.6s ease-out;
  text-align: center;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.title {
  font-size: 2.2rem;
  color: #b9a09c;
  margin-bottom: 10px;
}

.emoji {
  font-size: 1.2rem;
}

.description {
  font-size: 0.95rem;
  color: #565657;
  margin-bottom: 30px;
}

form {
  max-width: 100%;
  width: 80%;
  margin: 0 auto;
  text-align: left;
}


.card {
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 25px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.03);
}

.section-title {
  font-weight: 600;
  display: block;
  margin-bottom: 12px;
  color: #444;
  font-size: 1rem;
}

.checkbox-grid {
  display: grid;
  gap: 8px 20px;
  align-items: center;
}

.fixed-columns {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.checkbox-item {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: #333;
}

.checkbox-item label {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  justify-content: flex-start;
}

.checkbox-item span {
  white-space: nowrap;
  line-height: 1.4;
}

input[type="checkbox"] {
  accent-color: #b9a09c;
  transform: scale(1.1);
  margin: 0;
}

.other-input {
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 0.9rem;
  box-sizing: border-box;
}

.submit-button {
  background-color: #b9a09c;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: block;
  margin: 20px auto 0 auto;
}

.submit-button:hover {
  background-color: #a78a86;
  transform: scale(1.03);
}
</style>
