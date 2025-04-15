import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createZoomMeeting } from "./services/zoomService.js"; // Asegúrate de que la ruta es correcta

dotenv.config();

console.log("🔍 CLIENT_ID:", process.env.ZOOM_CLIENT_ID);
console.log("🔍 CLIENT_SECRET:", process.env.ZOOM_CLIENT_SECRET ? "********" : "NO DEFINIDO")

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/**
 * Endpoint para crear una reunión en Zoom
 */
app.post("/zoom/create-meeting", async (req, res) => {
  try {
    const { topic, startTime } = req.body;
    if (!topic || !startTime) {
      console.error("❌ Error: Falta el 'topic' o 'startTime'.");
      return res.status(400).json({ error: "Faltan datos obligatorios para la reunión." });
    }

    console.log(`📢 [POST] /zoom/create-meeting - Body:`, req.body);

    const meeting = await createZoomMeeting(topic, startTime);
    res.json(meeting);
  } catch (error) {
    console.error("❌ Error al crear la reunión de Zoom:", error.message);
    res.status(500).json({ error: "No se pudo crear la reunión en Zoom." });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
