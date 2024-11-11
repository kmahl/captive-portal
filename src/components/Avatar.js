// src/components/Avatar.js
import React from 'react';
import { Box } from '@mui/material';
import avatar2 from '../assets/avatar2.png'
const Avatar = ({ imageUrl, size = 120, borderColor = 'black' }) => {
    return (
        <Box
            mb={5}
            sx={{
                width: size,
                height: size,
                borderRadius: '50%',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}


        >
            <img src={avatar2} alt="avatar" style={{ width: '100%', height: '100%' }} />
        </Box>
    );
};

export default Avatar;
