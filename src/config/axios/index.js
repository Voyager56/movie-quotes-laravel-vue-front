import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "X-Requested-With": "XMLHttpRequest",
    Authorization: "Bearer " + localStorage.token,
  },
});

export default instance;
