import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
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

      // const response = await api.post("/accounts/refresh-token/", {
      //   refresh_token: refreshToken,
      // });

      // const newAccessToken = response.data.access_token;

      // Cookies.set("access_token", newAccessToken, { httpOnly: true });

      // return api(originalRequest);
      try {
        const response = await api.post("/accounts/refresh-token/", {
          refresh: refreshToken,
        });

        const newAccessToken = response.data.access;

        Cookies.set("access_token", newAccessToken, { httpOnly: true });

        return api(originalRequest);
      } catch (err) {
        // handle refresh token error
        console.log(err);
      }
    } else if (error.message === "Network Error") {
      // handle network error
      console.log("Network Error: ", error);
    } else if (error.response && error.response.status >= 500) {
      // handle server error
      console.log("Server Error: ", error);
    }
    return Promise.reject(error);
  }
);

export default api;
