// zoomSignature.js

const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const SDK_KEY = process.env.ZOOM_SDK_KEY;
const SDK_SECRET = process.env.ZOOM_SDK_SECRET;

router.post("/zoom/generate-signature", (req, res) => {
  try {
    const { meetingNumber, role } = req.body;
    if (!meetingNumber || role === undefined) {
      return res.status(400).json({ error: "Faltan datos: meetingNumber o role" });
    }
    const iat = Math.floor(Date.now() / 1000) - 30;
    const exp = iat + 60 * 60 * 2;
    const payload = {
      sdkKey: SDK_KEY,
      mn: meetingNumber,
      role: role,
      iat: iat,
      exp: exp,
      appKey: SDK_KEY,
      tokenExp: exp,
    };
    const token = jwt.sign(payload, SDK_SECRET, { algorithm: "HS256" });
    res.json({ signature: token });
  } catch (err) {
    console.error("❌ Error al generar firma:", err);
    res.status(500).json({ error: "Error interno al generar firma" });
  }
});

module.exports = router;
