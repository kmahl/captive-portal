import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Typography, Card } from "@mui/material";

function Home() {
  const { site } = useParams();
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate(`/form/${site || "default"}`);
  };

  return (
    <Card style={{ padding: "2rem", textAlign: "center", backgroundColor: "#f5f5f5" }}>
      <Box>
        <img src="/logo.png" alt="Company Logo" style={{ width: 100 }} />
        <Typography variant="h5" gutterBottom>Nombre de la Empresa</Typography>
        <Typography variant="subtitle1">Sitio: {site || "default"}</Typography>
        <Typography variant="body1" style={{ margin: "1rem 0" }}>Para acceder por favor completa el formulario</Typography>
        <Button variant="contained" fullWidth color="primary" onClick={handleEnter}>Entrar</Button>
      </Box>
    </Card>
  );
}

export default Home;
