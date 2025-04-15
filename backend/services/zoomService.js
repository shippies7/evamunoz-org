import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const ZOOM_API_URL = process.env.ZOOM_API_URL;
const CLIENT_ID = process.env.ZOOM_CLIENT_ID;
const CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;
const ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID;

/**
 * Función para obtener el token de acceso de Zoom
 */
async function getZoomAccessToken() {
  try {
    console.log("📢 Intentando obtener token de Zoom...");
    console.log("🔍 CLIENT_ID:", CLIENT_ID ? "CARGADO" : "NO DEFINIDO");
    console.log("🔍 CLIENT_SECRET:", CLIENT_SECRET ? "CARGADO" : "NO DEFINIDO");
    console.log("🔍 ACCOUNT_ID:", ACCOUNT_ID ? "CARGADO" : "NO DEFINIDO");

    if (!CLIENT_ID || !CLIENT_SECRET || !ACCOUNT_ID) {
      throw new Error("CLIENT_ID, CLIENT_SECRET o ACCOUNT_ID no están definidos en .env");
    }

    const response = await axios.post(
      "https://zoom.us/oauth/token",
      new URLSearchParams({
        grant_type: "account_credentials",
        account_id: ACCOUNT_ID,
      }).toString(),
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("✅ Token de Zoom obtenido con éxito:", response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error("❌ Error al obtener el token de Zoom:", error.response?.data || error.message);
    throw new Error("No se pudo obtener el token de Zoom.");
  }
}

/**
 * Función para crear una reunión en Zoom
 */
export async function createZoomMeeting(topic, startTime) {
  try {
    console.log("📢 Creando reunión en Zoom...");
    console.log("📝 Tópico:", topic);
    console.log("📅 Fecha y hora:", startTime);

    const accessToken = await getZoomAccessToken();
    if (!accessToken) {
      throw new Error("No se obtuvo el token de acceso.");
    }

    const response = await axios.post(
      `${ZOOM_API_URL}/users/me/meetings`,
      {
        topic,
        type: 2, // Tipo 2 es una reunión programada
        start_time: startTime,
        duration: 30, // Duración en minutos
        timezone: "America/Mexico_City",
        agenda: "Reunión generada automáticamente",
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: false,
          mute_upon_entry: true,
          approval_type: 0, // Aprobación automática
          waiting_room: false,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Reunión creada con éxito:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error al crear la reunión de Zoom:", error.response?.data || error.message);
    throw new Error("No se pudo crear la reunión en Zoom.");
  }
}