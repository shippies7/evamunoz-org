<template>
  <div id="vivo">
    <h1>Clase en Vivo</h1>
    <div id="zmmtg-root"></div>
    <button @click="joinMeeting">Entrar a la reunión</button>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { ZoomMtg } from "@zoom/meetingsdk";

// 🔹 Importa los estilos desde npm
import "@zoom/meetingsdk/dist/css/bootstrap.css";
import "@zoom/meetingsdk/dist/css/react-select.css";

// 🔹 Inicializa el SDK (ya no usamos setZoomJSLib con CDN)
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

// 🔑 Variables de entorno
const sdkKey = import.meta.env.VITE_ZOOM_SDK_KEY;
const meetingNumber = import.meta.env.VITE_ZOOM_MEETING_ID;
const passWord = import.meta.env.VITE_ZOOM_MEETING_PASSWORD;
const userName = "Eva";
const role = 0; // 0 = participante, 1 = host

// 🔹 Pide firma al backend
async function getSignature() {
  const res = await fetch("http://localhost:5000/zoom/generate-signature", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ meetingNumber, role }),
  });
  if (!res.ok) {
    throw new Error("No se recibió la firma desde el backend");
  }
  const data = await res.json();
  return data.signature;
}

// 🔹 Join meeting
async function joinMeeting() {
  try {
    const signature = await getSignature();
    console.log("✅ Firma recibida:", signature);

    ZoomMtg.init({
      leaveUrl: window.location.origin,
      success: () => {
        ZoomMtg.join({
          signature,
          sdkKey,
          meetingNumber,
          passWord,
          userName,
          success: () => {
            console.log("🚀 Reunión iniciada con éxito");
          },
          error: (err) => {
            console.error("❌ Error al entrar:", err);
          },
        });
      },
      error: (err) => {
        console.error("❌ Error en init:", err);
      },
    });
  } catch (err) {
    console.error("❌ Error general:", err.message);
  }
}

onMounted(() => {
  console.log("🔗 Página de vivo cargada");
});
</script>

<style>
#vivo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
</style>
