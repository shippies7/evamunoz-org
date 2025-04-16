const express = require("express");
const axios = require("axios");
const router = express.Router();
const qs = require("querystring");
require("dotenv").config();

let token = null;
let tokenExpiry = null;

const getAccessToken = async () => {
  const now = Date.now();
  if (token && tokenExpiry && now < tokenExpiry) return token;

  try {
    const response = await axios.post(
      "https://zoom.us/oauth/token",
      qs.stringify({
        grant_type: "client_credentials",
      }),
      {
        headers: {
          "Authorization": `Basic ${Buffer.from(`${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    token = response.data.access_token;
    tokenExpiry = now + response.data.expires_in * 1000;
    return token;
  } catch (error) {
    console.error("Error al obtener token de Zoom:", error.response?.data || error.message);
    throw new Error("No se pudo obtener el token");
  }
};

router.post("/create-meeting", async (req, res) => {
  const { topic, startTime } = req.body;
  const userEmail = req.headers["x-user-email"];

  if (userEmail !== process.env.ZOOM_USER_EMAIL) {
    return res.status(403).json({ error: "No estás autorizada para crear reuniones" });
  }

  try {
    const accessToken = await getAccessToken();

    const meeting = await axios.post(
      `https://api.zoom.us/v2/users/me/meetings`,
      {
        topic,
        type: 2,
        start_time: startTime,
        timezone: "America/Mexico_City",
        duration: 30,
        settings: {
          join_before_host: false,
          waiting_room: true,
          approval_type: 1,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(meeting.data);
  } catch (error) {
    console.error("Error al crear reunión:", error.response?.data || error.message);
    res.status(500).json({ error: "Falló la creación de la reunión" });
  }
});

module.exports = router;
