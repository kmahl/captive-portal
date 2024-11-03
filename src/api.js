// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://unifi-server.vercel.app/api/unifi",
  headers: {
    "Content-Type": "application/json",
  },
});

export const authorizeUser = async (data) => {
  try {
    const response = await api.post("/authorize", data);
    return response; // Retorna la respuesta completa para que podamos verificar el código de estado en el componente
  } catch (error) {
    throw error; // Propaga el error para manejarlo en el componente
  }
};
