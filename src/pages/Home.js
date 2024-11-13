// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, CircularProgress, Typography, BottomNavigation } from "@mui/material";
import { fetchSiteInfo } from "../api";
import { useLocation } from "react-router-dom";
import { useSite } from "../context/SiteContext"
import Title from '../components/Title';
import Avatar from '../components/Avatar';
import Logo from '../components/Logo';
import Button from '../components/Button';
import Footer from '../components/Footer';

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { siteInfo, loading, error } = useSite();
  const backgroundColor = siteInfo?.backgroundColor;
  const handleContinue = () => {
    navigate({ pathname: `/form/${siteInfo?.site || "default"}`, search: location.search });
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
    <Box
      sx={{
        backgroundColor: { backgroundColor },
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '0px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          mt: '50px'
        }}
      >
        <Title title={siteInfo.title} subtitle={siteInfo.subtitle} color={siteInfo.textColor} />

        <Logo
          imageUrl={siteInfo.logoUrl}
          size={200}
        />
      </Box>
      <BottomNavigation
        sx={{
          height: 'auto',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
          backgroundColor: 'transparent',
          padding: '0px 25px 50px',
        }}
      >
        <Button
          text="Continuar"
          onClick={handleContinue}
          color={siteInfo.button?.backgroundColor}
          textColor={siteInfo.button?.textColor}
          sx={{ textTransform: 'capitalize' }}
        />
        <Footer text="Powered by NetConNow®" color={siteInfo.textColor} />
      </BottomNavigation>


    </Box >
    // <Card style={{ padding: "2rem", textAlign: "center", backgroundColor: "#f5f5f5" }}>
    //   {siteInfo?.logoUrl && <img src={siteInfo.logoUrl} alt="Site Logo" style={{ width: 100 }} />}
    //   <Typography variant="h5" gutterBottom>{siteInfo?.name || "Nombre del Sitio"}</Typography>
    //   <Typography variant="subtitle1">Sitio: {siteInfo?.site}</Typography>
    //   <Typography variant="body1" style={{ margin: "1rem 0" }}>Para acceder por favor completa el formulario</Typography>
    //   <Button variant="contained" fullWidth color="primary" onClick={handleEnter}>Entrar</Button>
    // </Card>
  );
}
export default Home;
