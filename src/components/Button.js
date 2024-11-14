// src/components/Button.js
import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = ({ text = 'Continuar', onClick, color = 'black', textColor = 'white',  type="button", variant='contained', disabled=false, startIcon=null, sx }) => {
  return (
    <MuiButton
      variant="contained"
      onClick={onClick}
      fullWidth
      startIcon={startIcon}
      disabled={disabled}
      type={type}
      sx={{
        ...sx,
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
