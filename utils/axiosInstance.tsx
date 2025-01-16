import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

// Extend AxiosRequestConfig to include _retry
declare module 'axios' {
  interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

// Create Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1", // Replace with your backend URL
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Store access token in memory
let accessToken: string | null = null;

// Function to set the access token
export const setAccessToken = (token: string) => {
  accessToken = token;
};

// Request interceptor to add access token to headers
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.config &&
      !error.config._retry
    ) {
      error.config._retry = true; // Custom property to prevent infinite retry loops

      try {
        // Refresh the access token
        const refreshResponse = await axiosInstance.post(
          "/auth/refresh-token",
          {},
          {
            withCredentials: true, // Send refresh token in cookies
          }
        );

        const newAccessToken = refreshResponse.data.accessToken;
        setAccessToken(newAccessToken); // Update the stored access token

        // Retry the original request with the new access token
        if (error.config.headers) {
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return axiosInstance(error.config);
      } catch (refreshError) {
        // Handle refresh failure (e.g., logout the user)
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
