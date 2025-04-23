// backend/index.js
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const zoomSignature = require('./zoomSignature')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Ruta principal para generar la firma
app.use('/', zoomSignature)

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🟢 Servidor backend activo en http://localhost:${PORT}`)
})