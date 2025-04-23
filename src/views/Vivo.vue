<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Clase en vivo <span class="text-red-600">●</span></h2>
    <div id="meetingSDKContainer" style="width: 100%; height: 100vh;"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { ZoomMtgEmbedded } from '@zoom/meetingsdk/embedded'

const meetingNumber = import.meta.env.VITE_ZOOM_MEETING_ID
const sdkKey = import.meta.env.VITE_ZOOM_SDK_KEY
const passWord = '172413'
const userName = 'Invitado'

onMounted(async () => {
  const client = ZoomMtgEmbedded.createClient()
  const meetingSDKElement = document.getElementById('meetingSDKContainer')

  client.init({
    debug: true,
    zoomAppRoot: meetingSDKElement,
    language: 'es-ES',
    customize: {
      video: { isResizable: true },
      chat: { isDraggable: true },
    }
  })

  try {
    const response = await fetch('http://localhost:5000')
    const data = await response.json()
    const signature = data.signature
    console.log('Firma desde backend:', signature)

    await client.join({
      sdkKey,
      signature,
      meetingNumber,
      password: passWord,
      userName
    })
  } catch (err) {
    console.error('Error al entrar a la reunión:', err)
  }
})
</script>

<style scoped>
#meetingSDKContainer {
  z-index: 999;
  position: relative;
}
</style>
