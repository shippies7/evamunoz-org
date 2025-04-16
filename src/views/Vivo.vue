<template>
    <div class="vivo-container">
      <h1>Clase en vivo</h1>
  
      <p class="desc">
        Este es un rincón especial dentro de ELOS, donde el conocimiento se comparte en tiempo real, y la presencia cobra sentido. Estás en casa.
      </p>
  
      <div class="zoom-frame">
        <iframe
          src="https://us06web.zoom.us/wc/5488032439/join?pwd=eVNlbFk3TZdSb0IzK1VKOW5MT0dXQT09"
          allow="camera; microphone; fullscreen; speaker; display-capture"
          allowfullscreen
          frameborder="0"
        ></iframe>
      </div>
    </div>
  </template>
  
  <script setup>
  // Nada por ahora, todo fluye 💫
  </script>
  
  <style scoped>
  .vivo-container {
    max-width: 900px;
    margin: 40px auto;
    padding: 2rem;
    text-align: center;
    background: #f0ebea;
    border-radius: 12px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  }
  
  .zoom-frame iframe {
    width: 100%;
    height: 600px;
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(0,0,0,0.15);
  }
  
  .desc {
    margin-bottom: 2rem;
    color: #565657;
    font-size: 1rem;
  }
  </style>
  