<template>
  <div>
    <h1>Crear reunión en Zoom</h1>

    <input v-model="topic" placeholder="Tema de la reunión" />
    <input v-model="startTime" type="datetime-local" />

    <button 
      :disabled="!topic || !startTime" 
      @click="handleCreateMeeting">
      Crear Reunión
    </button>

    <div v-if="meetingUrl">
      <p>Reunión creada: <a :href="meetingUrl" target="_blank">{{ meetingUrl }}</a></p>
    </div>

    <div v-if="errorMessage">
      <p style="color: red;">⚠️ {{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { createZoomMeeting } from "../services/zoomService";

export default {
  setup() {
    const topic = ref("");
    const startTime = ref("");
    const meetingUrl = ref("");
    const errorMessage = ref("");

    const handleCreateMeeting = async () => {
      console.log("🟢 Botón presionado: Intentando crear reunión...");

      if (!topic.value || !startTime.value) {
        console.error("🔴 Faltan datos: Asegúrate de llenar todos los campos.");
        errorMessage.value = "Por favor, llena todos los campos.";
        return;
      }

      try {
        console.log("📢 Enviando solicitud a Zoom...");
        const data = await createZoomMeeting(topic.value, startTime.value);

        if (data && data.join_url) {
          meetingUrl.value = data.join_url;
          console.log("✅ Reunión creada con éxito:", data);
          errorMessage.value = ""; // Limpiar cualquier error anterior
        } else {
          console.error("❌ Error: No se recibió una URL de reunión válida.", data);
          errorMessage.value = "No se recibió una URL válida de Zoom.";
        }
      } catch (error) {
        console.error("🚨 No se pudo crear la reunión:", error);
        errorMessage.value = `Error al crear la reunión: ${error.response?.data?.error || error.message}`;
      }
    };

    onMounted(() => {
      console.log("✅ Componente montado correctamente");
    });

    return { topic, startTime, meetingUrl, errorMessage, handleCreateMeeting };
  },
};
</script>
