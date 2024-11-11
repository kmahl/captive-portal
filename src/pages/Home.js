// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, CircularProgress, Typography } from "@mui/material";
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
      id={'adsasd'}
      sx={{
        backgroundColor: '#007bff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '0px',
        id: 'asd'
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
        <Title title="Bienvenido a" subtitle={siteInfo.name} color="white" />

        <Avatar
          imageUrl={siteInfo.avatarUrl}
          size={160}
          borderColor="white"
        />
      </Box>
      <Box
        sx={{
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
          padding: '50px 25px',
          borderRadius: '20px 20px 0px 0px'
        }}
      >
      <Logo text="NetConNow" imageUrl={siteInfo.logoUrl}  />

      <Button
        text="Continuar"
        onClick={handleContinue}
      />
      <Footer text="Powered by NetConNow" color="lightgray" />
    </Box>


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
