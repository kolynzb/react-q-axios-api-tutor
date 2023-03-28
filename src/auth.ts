import Cookies from "js-cookie";
import api from "./axios";

async function login(email: string, password: string) {
  try {
    const response = await api.post("/auth/login", { email, password });

    const { access_token, refresh_token } = response.data;

    Cookies.set("access_token", access_token, { httpOnly: true });
    Cookies.set("refresh_token", refresh_token, { httpOnly: true });

    // Store the access token in local storage as well, in case you need to access it from a different tab or window
    localStorage.setItem("access_token", access_token);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function logout() {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  localStorage.removeItem("access_token");
}

async function getCurrentUser() {
  try {
    const response = await api.get("/users/me");

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { login, logout, getCurrentUser };
