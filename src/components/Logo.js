// src/components/Logo.js
import React from 'react';
import { Box } from '@mui/material';

const Logo = ({ imageUrl, size = 160 }) => {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <img src={imageUrl} alt="logo" style={{ width: '100%', height: '100%' }} />
    </Box>
  );
};

export default Logo;
