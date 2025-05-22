import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL;
if (API_URL === undefined) {
  throw new Error("API_URL is not defined");
}

export const apiInstance = axios.create({
  baseURL: API_URL,
});
