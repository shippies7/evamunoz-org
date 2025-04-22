// backend/server.js
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

// Home temporal (opcional)
app.get("/", (req, res) => {
  res.send("Servidor backend corriendo como Messi en el minuto 90 🏃‍♂️⚽️");
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`✅ Servidor backend activo en http://localhost:${port}`);
});
