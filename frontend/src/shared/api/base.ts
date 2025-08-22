import axios from "axios";

function getCSRFToken() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken"))
    ?.split("=")[1];
}

function getCurrentLocale() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("NEXT_LOCALE"))
    ?.split("=")[1] || "ru";
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 45000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  validateStatus: (status) => status >= 200 && status < 300,
});

apiClient.interceptors.request.use((config) => {
  const csrfToken = getCSRFToken();
  const locale = getCurrentLocale();

  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
  }

  if (locale === 'lz') {
    config.headers["Accept-Language"] = 'en';
  }
  else {
    config.headers["Accept-Language"] = locale; 
  }

  return config;
});

export default apiClient;
