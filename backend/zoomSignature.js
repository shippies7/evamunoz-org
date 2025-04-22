const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/zoom/generate-signature', (req, res) => {
  const { meetingNumber, role } = req.body;

  const sdkKey = process.env.VITE_ZOOM_SDK_KEY;
  const sdkSecret = process.env.VITE_ZOOM_SDK_SECRET;

  const iat = Math.round(new Date().getTime() / 1000) - 30;
  const exp = iat + 60 * 60 * 2;

  const oHeader = { alg: 'HS256', typ: 'JWT' };
  const oPayload = {
    sdkKey: sdkKey,
    mn: meetingNumber,
    role: role,
    iat: iat,
    exp: exp,
    appKey: sdkKey,
    tokenExp: exp,
  };

  const sHeader = Buffer.from(JSON.stringify(oHeader)).toString('base64');
  const sPayload = Buffer.from(JSON.stringify(oPayload)).toString('base64');
  const signature = crypto
    .createHmac('sha256', sdkSecret)
    .update(`${sHeader}.${sPayload}`)
    .digest('base64');

  const finalSig = `${sHeader}.${sPayload}.${signature}`;

  res.json({ signature: finalSig });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
