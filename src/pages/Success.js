import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Card } from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function Success() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extrae la URL de redirección del query parameter
  const getRedirectUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get("redirectUrl");
  };

  useEffect(() => {
    const redirectUrl = getRedirectUrl();
    
    // Configura un temporizador de 2 segundos para redirigir
    const timer = setTimeout(() => {
      if (redirectUrl) {
        window.location.href = redirectUrl; // Redirecciona a la URL externa
      } else {
        navigate("/"); // Redirecciona a la página principal si no hay URL
      }
    }, 2000);

    // Limpia el temporizador al desmontar el componente
    return () => clearTimeout(timer);
  }, [location, navigate]);

  return (
    <Card style={{ padding: "2rem", textAlign: "center" }}>
      <WifiIcon fontSize="large" color="primary" />
      <CheckCircleIcon fontSize="large" color="success" />
      <Typography variant="h5">¡Conexión exitosa!</Typography>
      <Typography variant="body1">Disfruta de tu conexión a internet.</Typography>
    </Card>
  );
}

export default Success;
