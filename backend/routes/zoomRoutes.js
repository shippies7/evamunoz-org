// backend/routes/zoomRoutes.js
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
require("dotenv").config();

router.post("/generate-signature", (req, res) => {
  const { meetingNumber, role } = req.body;

  const sdkKey = process.env.ZOOM_SDK_KEY;
  const sdkSecret = process.env.ZOOM_SDK_SECRET;

  if (!sdkKey || !sdkSecret) {
    return res.status(500).json({ error: "Faltan claves SDK" });
  }

  const timestamp = new Date().getTime() - 30000;
  const msg = Buffer.from(`${sdkKey}${meetingNumber}${timestamp}${role}`).toString("base64");
  const hash = crypto.createHmac("sha256", sdkSecret).update(msg).digest("base64");
  const signature = Buffer.from(`${sdkKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString("base64");

  res.json({ signature });
});

module.exports = router;
