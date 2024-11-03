import React from "react";
import { Box, Typography, Card } from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function Success() {
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
