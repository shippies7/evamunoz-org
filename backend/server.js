// backend/server.js

const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()

const zoomSignature = require('./zoomSignature') // Asegurate que este archivo existe

app.use(cors())
app.use(express.json())

// Ruta principal para generar la firma
app.use('/', zoomSignature)

// Iniciar servidor
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`✅ Servidor backend activo en http://localhost:${PORT}`)
})
