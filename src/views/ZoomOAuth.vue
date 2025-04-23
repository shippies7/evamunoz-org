<script setup>
import { onMounted } from 'vue'
import axios from 'axios'

onMounted(async () => {
  try {
    const accessToken = 'eyJzdiI6IjAwMDAwMiIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6IjU3YTg5ZWJmLTRkYTctNDA0NS1hMGU4LThjMWViZjcwNjdkMCJ9.eyJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJHc3JUTUZuWVJlS25VYVBkTzU5enZ3IiwidmVyIjoxMCwiYXVpZCI6IjAyMjc4MjczYjZlNDcyOWFiZjQ4ZGNjZGU0YTFjZGQ4MWZlOGViMGEyNmRkNGI4YmZmNzc1ODY3Y2UxZDZlMzEiLCJuYmYiOjE3NDU0MDI1MzUsImNvZGUiOiJ4Q3M5clZrWXMyOGpYQkJzV3lPUzdXel9OSV92YjVWNHciLCJpc3MiOiJ6bTpjaWQ6b2ZNRzkxTmNTY3lQOWk5cnJ2UnhydyIsImdubyI6MCwiZXhwIjoxNzQ1NDA2MTM1LCJ0eXBlIjowLCJpYXQiOjE3NDU0MDI1MzUsImFpZCI6ImhMR0J4OEtzUTBlOGttaWZmYWdVakEifQ.0Y9kRVDVPmZOTzpu9NI0G_McV53-CzFkCLlPH-pX4aLTt4Gfo2AYQN32k5TnHU7CuYEXxcAQGY0cHN1rb-dMIQ';

    const res = await axios.get('https://api.zoom.us/v2/users/me/meetings', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    console.log('🟢 Reuniones disponibles:', res.data)
    alert('Ya tenés acceso a tus reuniones de Zoom 🎥')
  } catch (error) {
    console.error('❌ Error al obtener reuniones:', error.response?.data || error)
    alert('Algo falló al mostrar las reuniones 😢')
  }
})
</script>

<template>
  <div class="p-8 text-center text-lg">
    <p class="text-oscuro">Cargando tus reuniones de Zoom... 🌀</p>
  </div>
</template>