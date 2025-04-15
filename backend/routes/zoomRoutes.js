import express from "express";
import { createZoomMeeting } from "../services/zoomService.js";

const router = express.Router();

// 📌 Endpoint para crear una reunión en Zoom
router.post("/create-meeting", async (req, res) => {
  const { topic, startTime } = req.body;

  try {
    const meeting = await createZoomMeeting(topic, startTime);
    res.status(200).json({ message: "Reunión creada con éxito", meeting });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
