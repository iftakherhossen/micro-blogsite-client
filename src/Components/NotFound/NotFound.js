import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {

    return (
        <Box sx={{ backgroundImage: 'url(https://i.ibb.co/GnnCPMP/bg.jpg)', backgroundSize: 'cover', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Box sx={{ color: 'white', textAlign: 'center' }}>
                <Typography variant="h1" className="fwBold">404</Typography>
                <Typography variant="h4" className="fwBold">You are lost in space!</Typography>
            </Box>
            <Box className="notFoundBtn">
                <Link to="/" className='link'>
                    <button>Fly to Home</button>
                </Link>
            </Box>
        </Box>
    );
};

export default NotFound;