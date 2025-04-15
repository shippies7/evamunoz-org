import axios from "axios";

const API_URL = "http://localhost:5000/zoom"; // Asegúrate de que coincide con el backend

export const createZoomMeeting = async (topic, startTime) => {
  try {
    const response = await axios.post(`${API_URL}/create-meeting`, {
      topic,
      startTime,
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear la reunión:", error.response?.data || error.message);
    throw error;
  }
};
