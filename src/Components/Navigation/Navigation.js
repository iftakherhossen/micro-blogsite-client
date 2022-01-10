import { AppBar, Avatar, Container, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import LogoutIcon from '@mui/icons-material/Logout';

const Navigation = () => {
    const handleGoogleSignIn = () => {
        console.log('button triggered');
    }

    return (
        <div>
            <AppBar position="static" sx={{ bgcolor: '#FFFFFF', boxShadow: 'none' }}>
                <Container>
                    <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'flex' } }}
                        >
                            <Link to="/" className="link coloredTxt fwBold">Micro Blog</Link>
                        </Typography>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Sign Out">
                                <IconButton>
                                    <LogoutIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Sign in with Google">
                                <IconButton onClick={handleGoogleSignIn}>
                                    <GoogleIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
};

export default Navigation;