import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((config) => {
  const accessToken = Cookies.get("access_token");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get("refresh_token");

      const response = await axios.post("/api/auth/refresh-token", {
        refresh_token: refreshToken,
      });

      const newAccessToken = response.data.access_token;

      Cookies.set("access_token", newAccessToken, { httpOnly: true });

      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;
