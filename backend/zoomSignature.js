// backend/zoomSignature.js
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
require("dotenv").config();

router.post("/generate-signature", (req, res) => {
  try {
    const { meetingNumber, role, sdkKey } = req.body;

    // validación mínima
    if (!meetingNumber || typeof role === "undefined") {
      return res.status(400).json({ error: "Faltan meetingNumber o role" });
    }

    const iat = Math.floor(Date.now() / 1000) - 30; // issued at
    const exp = iat + 60 * 60 * 2; // expiración 2 horas
    const oHeader = { alg: "HS256", typ: "JWT" };

    const oPayload = {
      sdkKey: sdkKey || process.env.ZOOM_MEETING_SDK_KEY,
      mn: meetingNumber,
      role: Number(role),
      iat,
      exp,
      appKey: process.env.ZOOM_MEETING_SDK_KEY,
      tokenExp: exp,
    };

    function base64url(source) {
      // JSON -> base64url
      let encodedSource = Buffer.from(JSON.stringify(source))
        .toString("base64")
        .replace(/=+$/, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
      return encodedSource;
    }

    const sHeader = base64url(oHeader);
    const sPayload = base64url(oPayload);
    const signature = `${sHeader}.${sPayload}`;

    const signatureBase64 = crypto
      .createHmac("sha256", process.env.ZOOM_MEETING_SDK_SECRET)
      .update(signature)
      .digest("base64")
      .replace(/=+$/, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    const jwt = `${signature}.${signatureBase64}`;

    return res.json({ signature: jwt });
  } catch (err) {
    console.error("❌ Error generando la firma:", err);
    return res.status(500).json({ error: "Error al generar firma" });
  }
});

module.exports = router;

