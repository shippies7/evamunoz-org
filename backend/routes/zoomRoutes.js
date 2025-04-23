// backend/routes/zoomRoutes.js
const express = require("express");
const crypto = require("crypto");
require("dotenv").config();

const router = express.Router();

// Ruta para generar la firma del SDK
router.get("/signature", (req, res) => {
  const { meetingNumber, role } = req.query;

  // 👇 Estas son las variables que vienen del archivo .env
  const sdkKey = process.env.ZOOM_SDK_KEY;
  const sdkSecret = process.env.ZOOM_SDK_SECRET;

  // Función para generar la firma
  function generateSignature(sdkKey, sdkSecret, meetingNumber, role) {
    const timestamp = new Date().getTime() - 30000;
    const msg = Buffer.from(`${sdkKey}${meetingNumber}${timestamp}${role}`).toString("base64");
    const hash = crypto
      .createHmac("sha256", sdkSecret)
      .update(msg)
      .digest("base64");
    const rawSig = `${sdkKey}.${meetingNumber}.${timestamp}.${role}.${hash}`;
    return Buffer.from(rawSig).toString("base64");
  }

  try {
    const signature = generateSignature(sdkKey, sdkSecret, meetingNumber, role);
    console.log("🔐 Firma generada correctamente:", signature);
    res.json({ signature });
  } catch (err) {
    console.error("❌ Error generando firma:", err);
    res.status(500).send("❌ Error generando firma");
  }
});

module.exports = router;
