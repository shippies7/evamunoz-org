const express = require("express");
const crypto = require("crypto");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const port = 5000;

// Replace with your Zoom SDK credentials
const sdkKey = "8HptXucyRPej30BaFkEhw";
const sdkSecret = "L5q9o9h1loX1PhYyj6xOE7z4gB1TujW";

app.post("/zoom/generate-signature", (req, res) => {
  const { meetingNumber, role } = req.body;

  if (!meetingNumber || role === undefined) {
    return res.status(400).send({ message: "Meeting number and role are required." });
  }

  const timestamp = new Date().getTime() - 30000;
  const msg = Buffer.from(`${sdkKey}${meetingNumber}${timestamp}${role}`).toString("base64");
  const hash = crypto.createHmac("sha256", sdkSecret).update(msg).digest("base64");
  const signature = Buffer.from(`${sdkKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString("base64");

  res.json({ signature });
});

app.listen(port, () => {
  console.log(`Zoom Signature Server running on http://localhost:${port}`);
});
