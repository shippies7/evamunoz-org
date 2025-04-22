const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/zoom/create-session', (req, res) => {
  const { sessionName, userIdentity } = req.body;

  const sdkKey = process.env.VITE_ZOOM_SDK_KEY;
  const sdkSecret = process.env.VITE_ZOOM_SDK_SECRET;

  const iat = Math.floor(Date.now() / 1000) - 30;
  const exp = iat + 60 * 60 * 2;

  const payload = {
    app_key: sdkKey,
    tpc: sessionName,
    role_type: 1,
    user_identity: userIdentity,
    version: 1,
    iat,
    exp,
  };

  const token = jwt.sign(payload, sdkSecret, { algorithm: 'HS256' });

  res.json({ sessionToken: token });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Zoom Video SDK backend corriendo en puerto ${PORT}`);
});
