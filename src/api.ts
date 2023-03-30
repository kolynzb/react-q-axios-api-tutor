import api from "./axios";

async function getJobs() {
  try {
    const response = await api.get("/jobs");

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
