import axios from "axios";


const API_URL = "https://tu-backend.com/zoom"; // cambiá por la URL real si ya está desplegado

export const createZoomMeeting = async (topic, startTime) => {
  try {
    const response = await axios.post(
      `${API_URL}/create-meeting`,
      { topic, startTime },
      {
        headers: {
          "x-user-email": "info@evamunoz.org",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear la reunión:", error.response?.data || error.message);
    throw error;
  }
};
