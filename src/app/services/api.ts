import axios from "axios";

export const api = axios.create({
  baseURL: "https://restful-api-vercel-topaz.vercel.app/",
  maxContentLength: 99999999999999,
  maxBodyLength: 999999999999999,
});
