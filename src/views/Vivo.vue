<template>
    <div class="vivo-container">
      <h1 class="vivo-title">Clase en vivo</h1>
      <p class="vivo-description">
        Este es un rincón especial dentro de ELOS, donde el conocimiento se comparte en tiempo real, y la presencia cobra sentido. Estás en casa.
      </p>
  
      <div class="zoom-embed">
        <iframe
          :src="zoomURL"
          allow="camera; microphone; fullscreen; speaker; display-capture"
          frameborder="0"
          width="100%"
          height="600"
        ></iframe>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        zoomURL: "https://us06web.zoom.us/j/81187185049?pwd=xbmWlpgQRpeFZMBaWvNhP96IllXs8a1",
      };
    },
  };
  </script>
  
  <style scoped>
  .vivo-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 50px 20px;
    text-align: center;
  }
  
  .vivo-title {
    font-size: 2.2rem;
    font-family: 'Libre Baskerville', serif;
    color: #b9a09c;
    margin-bottom: 15px;
  }
  
  .vivo-description {
    font-size: 1rem;
    color: #686968;
    margin-bottom: 40px;
  }
  
  .zoom-embed {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  </style>
  