// ✅ app.js (anteriormente server.js)
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
const zoomRoutes = require("./routes/zoomRoutes");
app.use("/zoom", zoomRoutes);

// Home temporal
app.get("/", (req, res) => {
  res.send("Servidor backend corriendo como Messi en el minuto 90 🏃‍♂️⚽️");
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`✅ Servidor backend activo en http://localhost:${port}`);
});

// ✅ routes/zoomRoutes.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

router.get("/auth/callback", async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("❌ Falta el código en la URL.");
  }

  try {
    const response = await axios.post("https://zoom.us/oauth/token", null, {
      params: {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "http://localhost:5173" // ⚠️ Debe coincidir con el de tu app en Zoom
      },
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.ZOOM_CLIENT_ID + ":" + process.env.ZOOM_CLIENT_SECRET
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const access_token = response.data.access_token;
    console.log("🟢 Token recibido:", access_token);
    res.send("✅ Autenticación exitosa. Ya podés cerrar esta pestaña.");
  } catch (error) {
    console.error("❌ Error al obtener el token:", error?.response?.data || error);
    res.status(500).send("❌ Error al obtener el token.");
  }
});

module.exports = router;
