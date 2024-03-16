import axios from "axios";
import { REFRESH_TOKEN_API } from "../endoints/common";

const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("reached interceptor response", response);
    return response;
  },
  async (error) => {
    console.log("reached interceptor error", error);
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      console.log("inside if conditon");

      try {
        const refreshTokenREsponse = await axios.post(REFRESH_TOKEN_API);
        const newAccessToken = refreshTokenREsponse.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        console.error("Failed to refresh access token:", error);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
