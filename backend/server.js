// backend/server.js
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

// 👉 Agregar headers para Cross-Origin Isolation
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

// rutas
const zoomSignatureRoute = require("./zoomSignature");
app.use("/zoom", zoomSignatureRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend activo en http://localhost:${PORT}`);
});
