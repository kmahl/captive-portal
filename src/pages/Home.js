import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Typography, Card } from "@mui/material";
import { useLocation } from "react-router-dom";

function Home() {
  const { site } = useParams();
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate(`/form/${site || "default"}`);
  };
  // Función para obtener los query params en forma de objeto
  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    const entries = Array.from(params.entries());
    return entries.map(([key, value]) => ({ key, value }));
  };

  const location = useLocation();
  const queryParamsArray = getQueryParams();

  return (
    <Card style={{ padding: "2rem", textAlign: "center", backgroundColor: "#f5f5f5" }}>
      <Box>
        <img src="/logo.png" alt="Company Logo" style={{ width: 100 }} />
        <Typography variant="h5" gutterBottom>Nombre de la Empresa</Typography>
        <Typography variant="subtitle1">Sitio: {site || "default"}</Typography>
        <Typography variant="body1" style={{ margin: "1rem 0" }}>Para acceder por favor completa el formulario</Typography>
        <Button variant="contained" fullWidth color="primary" onClick={handleEnter}>Entrar</Button>
        <Typography variant="h5" gutterBottom>Query Params</Typography>
      </Box>

      <Box>
        {queryParamsArray.length > 0 ? (
          queryParamsArray.map((param, index) => (
            <Typography key={index} variant="body1">
              {param.key}: {param.value}
            </Typography>
          ))
        ) : (
          <Typography variant="body1">No hay parámetros en la URL</Typography>
        )}
      </Box>
    </Card>
  );
}

export default Home;
