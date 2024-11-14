// src/components/Title.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Title = ({ title = 'Bienvenido', subtitle = 'lorem ipsum dolor', color = 'white' }) => {
  return (
    <Box mb={4}>
      <Typography variant="h5" align="center" color={color}>
        {title}
      </Typography>
      <Typography variant="h5" align="center" color={color}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Title;
