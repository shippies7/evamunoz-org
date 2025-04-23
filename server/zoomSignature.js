const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/zoom/generate-signature", (req, res) => {
  const { meetingNumber, role } = req.body;

  if (!meetingNumber || role === undefined) {
    return res.status(400).json({ message: "Meeting number and role are required." });
  }

  const sdkKey = process.env.VITE_ZOOM_SDK_KEY;
  const sdkSecret = process.env.VITE_ZOOM_SDK_SECRET;

  if (!sdkKey || !sdkSecret) {
    return res.status(500).json({ message: "Zoom SDK credentials are missing." });
  }

  const timestamp = new Date().getTime() - 30000;
  const msg = Buffer.from(`${sdkKey}${meetingNumber}${timestamp}${role}`).toString("base64");
  const hash = crypto.createHmac("sha256", sdkSecret).update(msg).digest("base64");
  const signature = Buffer.from(`${sdkKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString("base64");

  res.json({ signature });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Zoom Signature Server running on http://localhost:${PORT}`);
});
