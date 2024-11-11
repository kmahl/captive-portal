// src/components/Button.js
import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = ({ text = 'Continuar', onClick, color = 'black', textColor = 'white' }) => {
  return (
    <MuiButton
      variant="contained"
      onClick={onClick}
      fullWidth
      sx={{
        bgcolor: color,
        color: textColor,
        fontWeight: 'bold',
        borderRadius: '50px',
        padding: '0.75rem',
        mt: 2,
        '&:hover': {
          bgcolor: color,
        },
      }}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
