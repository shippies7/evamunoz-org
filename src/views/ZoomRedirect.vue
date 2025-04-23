// src/views/ZoomRedirect.vue (creá este archivo si no existe)

<script setup>
import { onMounted } from "vue";
import axios from "axios";

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  if (code) {
    try {
      const response = await axios.get(`http://localhost:4000/zoom/auth/callback?code=${code}`);
      alert("✅ Todo bien, se autenticó con Zoom");
      console.log("✅ Zoom auth:", response.data);
    } catch (error) {
      console.error("❌ Error al autenticar con Zoom", error);
      alert("❌ Hubo un error al autenticarse con Zoom");
    }
  }
});
</script>

<template>
  <div>
    <h1>Autenticando con Zoom...</h1>
  </div>
</template>
