<script setup>
import { onMounted } from 'vue'
import ZoomVideo from '@zoom/videosdk'


// Datos de reunión
const sdkKey = '60DmzF18SlSnt1nuklehZQ'
const signatureEndpoint = 'http://localhost:4000/zoom/generate-signature'
const sessionName = 'ELOS-clase-vip'
const userName = 'Eva Muñoz'
const password = '172413'

const startZoomSession = async () => {
  const client = ZoomVideo.createClient()

  try {
    // Inicializar el cliente
    await client.init('en-US', 'CDN') // Podés cambiar a 'es-ES' si querés

    // Obtener firma
    const res = await fetch(signatureEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionName,
        role: 0,
      }),
    })
    const data = await res.json()
    const signature = data.signature

    // Unirse a la sesión
    await client.join(
      sdkKey,
      signature,
      sessionName,
      userName,
      password
    )

    console.log('🎉 ¡Te uniste a la sesión!')
  } catch (error) {
    console.error('💥 Error al unirse a la clase:', error)
  }
}
</script>

<template>
  <div class="text-center py-8">
    <h1 class="text-3xl font-bold mb-4">Clase en vivo de ELOS 📹✨</h1>
    <button
      @click="startZoomSession"
      class="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded"
    >
      Entrar a la clase
    </button>
    <div id="meeting-container" class="mt-8"></div>
  </div>
</template>

<style scoped>
#meeting-container {
  width: 100%;
  height: 80vh;
}
</style>
