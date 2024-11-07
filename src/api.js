// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://unifi-server.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const getQueryParams = (search) => {
  const params = new URLSearchParams(search);
  const result = {};

  for (const [key, value] of params.entries()) {
    result[key] = value;
  }

  return result;
};

export const authorizeUser = async (data, params) => {
  try {
    const queryParams = getQueryParams(params);
    const requestData = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      tyc: data.tyc,
      mac: queryParams.id,
      ap: queryParams.ap,
      t: queryParams.t,
      url: queryParams.url,
      ssid: queryParams.ssid
    }
    const response = await api.post("/unifi/authorize", requestData);
    return response;
  } catch (error) {
    throw error; 
  }
};

export const fetchSiteInfo = async (site) => {
  try {
    const response = await api.get(`site/info?site=${site}`);
    return response.data.data;
  } catch (error) {
    throw new Error("Error al obtener la información del sitio");
  }
};