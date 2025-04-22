// backend/zoomVideoToken.js

const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const app = express()
const PORT = 5001

app.use(cors())
app.use(express.json())

app.post('/zoom/video-token', (req, res) => {
  const { sessionName, userIdentity } = req.body

  const payload = {
    app_key: process.env.VIDEO_SDK_KEY,
    tpc: sessionName,
    user_identity: userIdentity,
    role_type: 1,
    version: 1,
    iat: Math.round(Date.now() / 1000),
    exp: Math.round(Date.now() / 1000) + 60 * 60, // 1 hora
  }

  const token = jwt.sign(payload, process.env.VIDEO_SDK_SECRET, {
    algorithm: 'HS256',
    header: {
      alg: 'HS256',
      typ: 'JWT',
    },
  })

  res.json({ token })
})

app.listen(PORT, () => {
  console.log(`🎉 Zoom Video SDK backend corriendo en http://localhost:${PORT}`)
})
