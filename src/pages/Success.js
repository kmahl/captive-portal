import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Card } from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Lottie from 'react-lottie';
import animationData from '../lotties/success';


function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
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
        // window.location.href = redirectUrl; // Redirecciona a la URL externa
      } else {
        //   navigate("/"); // Redirecciona a la página principal si no hay URL
      }
    }, 2000);

    // Limpia el temporizador al desmontar el componente
    return () => clearTimeout(timer);
  }, [location, navigate]);

  return (
    <Box
      sx={{
        backgroundColor: '#21c779', // { backgroundColor },
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        padding: '0px 50px',
        textAlign: 'center'
      }}
    >

      <Typography sx={{fontWeight:600, fontSize:'40px'}} variant="h3" color="#fff" >¡Conexión exitosa!</Typography>
      <Lottie
        options={defaultOptions}
        height={250}
        width={250}
      />
      <Typography sx={{fontSize:'20px'}} variant="body1" color="#fff">Disfruta de tu<br />conexión a internet.</Typography>
    </Box>
  );
}

export default Success;
