// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://unifi-server.vercel.app/api/unifi",
  headers: {
    "Content-Type": "application/json",
  },
});

const getQueryParams = (search) => {
  const params = new URLSearchParams(search);
  const entries = Array.from(params.entries());
  return entries.map(([key, value]) => ({ key, value }));
};

export const authorizeUser = async (data, params) => {
  try {
    const queryParams = getQueryParams(params);
    console.log("queryParams", queryParams)
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
    const response = await api.post("/authorize", requestData);
    return response; // Retorna la respuesta completa para que podamos verificar el código de estado en el componente
  } catch (error) {
    throw error; // Propaga el error para manejarlo en el componente
  }
};
