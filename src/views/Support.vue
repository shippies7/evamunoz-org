<template>
    <div class="max-w-3xl mx-auto px-4 py-10 text-gray-800">
      <h1 class="text-3xl font-bold mb-6">Soporte</h1>
  
      <p class="mb-4">
        ¿Tenés dudas, problemas técnicos o simplemente querés contactarnos? Estamos para ayudarte. Completá el siguiente formulario o escribinos directamente a 
        <a href="mailto:info@evamunoz.org" class="text-blue-600 underline">info@evamunoz.org</a>.
      </p>
  
      <form @submit.prevent="handleSubmit" class="space-y-4 mt-6">
        <div>
          <label for="name" class="block font-semibold">Nombre</label>
          <input id="name" v-model="form.name" type="text" class="w-full border p-2 rounded" required />
        </div>
  
        <div>
          <label for="email" class="block font-semibold">Correo electrónico</label>
          <input id="email" v-model="form.email" type="email" class="w-full border p-2 rounded" required />
        </div>
  
        <div>
          <label for="message" class="block font-semibold">Mensaje</label>
          <textarea id="message" v-model="form.message" rows="5" class="w-full border p-2 rounded" required></textarea>
        </div>
  
        <button type="submit" class="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">Enviar</button>
      </form>
  
      <p v-if="submitted" class="text-green-600 mt-4">¡Mensaje enviado correctamente! Te responderemos pronto.</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const form = ref({
    name: '',
    email: '',
    message: '',
  })
  
  const submitted = ref(false)
  
  function handleSubmit() {
    // ✨ Aquí podés integrar con emailjs, formspree, o tu backend
    console.log('Formulario:', form.value)
    submitted.value = true
    // Reseteamos
    form.value = {
      name: '',
      email: '',
      message: ''
    }
  }
  </script>
  