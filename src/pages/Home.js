// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Card, CircularProgress, Button } from "@mui/material";
import { fetchSiteInfo } from "../api";
import { useLocation } from "react-router-dom";
import { useSite } from "../context/SiteContext"

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { siteInfo, loading, error } = useSite();

  const handleEnter = () => {
   navigate({pathname: `/form/${siteInfo?.site || "default"}`, search: location.search});
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Card style={{ padding: "2rem", textAlign: "center", backgroundColor: "#f5f5f5" }}>
      {siteInfo?.logoUrl && <img src={siteInfo.logoUrl} alt="Site Logo" style={{ width: 100 }} />}
      <Typography variant="h5" gutterBottom>{siteInfo?.name || "Nombre del Sitio"}</Typography>
      <Typography variant="subtitle1">Sitio: {siteInfo?.site}</Typography>
      <Typography variant="body1" style={{ margin: "1rem 0" }}>Para acceder por favor completa el formulario</Typography>
      <Button variant="contained" fullWidth color="primary" onClick={handleEnter}>Entrar</Button>
    </Card>
  );
}
export default Home;
