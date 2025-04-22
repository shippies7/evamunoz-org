const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/zoom/generate-signature", (req, res) => {
  const { meetingNumber, role } = req.body;

  if (!meetingNumber || role === undefined) {
    return res.status(400).json({ message: "Meeting number and role are required." });
  }

  const sdkKey = process.env.ZOOM_SDK_KEY;
  const sdkSecret = process.env.ZOOM_SDK_SECRET;

  if (!sdkKey || !sdkSecret) {
    return res.status(500).json({ message: "Zoom SDK credentials are missing." });
  }

  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60;

  const payload = {
    app_key: sdkKey,
    tpc: meetingNumber,
    role_type: role,
    iat,
    exp,
  };

  try {
    const token = jwt.sign(payload, sdkSecret, { algorithm: "HS256" });
    res.json({ signature: token });
  } catch (error) {
    console.error("Error al generar firma:", error);
    res.status(500).json({ message: "Error generating signature" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Zoom Signature Server running on http://localhost:${PORT}`);
});
