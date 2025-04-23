// backend/routes/zoom.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/zoom/callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('No code received');
  }

  try {
    const response = await axios.post('https://zoom.us/oauth/token', null, {
      params: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'http://localhost:5173',
      },
      auth: {
        username: 'ofMG91NcScyP9i9rrvRxrw', // tu client_id
        password: 'TU_CLIENT_SECRET_AQUÍ', // tu client_secret
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const accessToken = response.data.access_token;
    // Podés guardarlo en sesión, base de datos o solo mostrarlo
    res.send(`Access token: ${accessToken}`);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send('Failed to get access token');
  }
});

module.exports = router;
