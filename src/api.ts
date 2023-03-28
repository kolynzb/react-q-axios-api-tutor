import api from "./axios";

async function fetchProtectedData() {
  try {
    const response = await api.get("/protected-data");

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
