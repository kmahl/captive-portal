// src/components/Footer.js
import React from 'react';
import { Typography, Box } from '@mui/material';

const Footer = ({ text = 'Powered by NetConNow', color = 'gray' }) => {
  return (
    <Box sx={{ textAlign: 'center', marginTop: '1.5rem', color, backgroundColor:'#ffffff' }}>
      <Typography variant="caption">{text}</Typography>
    </Box>
  );
};

export default Footer;
