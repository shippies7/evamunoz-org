<script setup>
import { onMounted } from 'vue'
import ZoomVideo from '@zoom/videosdk'
import axios from 'axios'

const sdkKey = import.meta.env.VITE_ZOOM_SDK_KEY
const meetingNumber = import.meta.env.VITE_ZOOM_MEETING_ID
const userName = 'Eva'
const userIdentity = 'eva_user'
const role = 0

onMounted(async () => {
  try {
    const res = await axios.post('http://localhost:4000/zoom/generate-signature', {
      meetingNumber,
      role,
    })

    const { signature } = res.data

    const client = ZoomVideo.createClient()
    await client.init('en-US', 'CDN')

    await client.join(sdkKey, signature, meetingNumber, userName, userIdentity)

    const stream = client.getMediaStream()
    await stream.startVideo()
  } catch (error) {
    console.error('Error al unirse a Zoom:', error)
  }
})
</script>

<template>
  <div id="zoom-meeting">
    <p>Cargando clase en vivo... 🌀</p>
  </div>
</template>

<style scoped>
#zoom-meeting {
  width: 100%;
  height: 80vh;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
</style>
