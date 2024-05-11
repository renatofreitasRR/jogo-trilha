import axios from "axios";

export const api = axios.create({


  baseURL: `${process.env.API_ROUTE}`,
  maxContentLength: 99999999999999,
  maxBodyLength: 999999999999999,
});

