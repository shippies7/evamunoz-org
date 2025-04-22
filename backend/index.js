const crypto = require('crypto');
require('dotenv').config();

app.post('/zoom/generate-signature', (req, res) => {
  const { meetingNumber, role } = req.body;

  const iat = Math.round(new Date().getTime() / 1000) - 30;
  const exp = iat + 60 * 60 * 2;

  const oHeader = { alg: 'HS256', typ: 'JWT' };

  const oPayload = {
    sdkKey: process.env.VITE_ZOOM_SDK_KEY,
    mn: meetingNumber,
    role: role,
    iat: iat,
    exp: exp,
    appKey: process.env.VITE_ZOOM_SDK_KEY,
    tokenExp: exp,
  };

  const sHeader = Buffer.from(JSON.stringify(oHeader)).toString('base64');
  const sPayload = Buffer.from(JSON.stringify(oPayload)).toString('base64');
  const signature = crypto
    .createHmac('sha256', process.env.VITE_ZOOM_SDK_SECRET)
    .update(`${sHeader}.${sPayload}`)
    .digest('base64');

  const finalSig = `${sHeader}.${sPayload}.${signature}`;

  res.json({ signature: finalSig });
});
