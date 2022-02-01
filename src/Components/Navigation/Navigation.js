import { Alert, AppBar, Checkbox, Container, FormControl, IconButton, LinearProgress, Snackbar, Toolbar, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import GoogleButton from 'react-google-button';
import useAuth from '../../hooks/useAuth';
import CloseIcon from '@mui/icons-material/Close';
import DarkModeToggle from "react-dark-mode-toggle";
import useDarkMode from 'use-dark-mode';

const Navigation = () => {
    const { user, signInWithGoogle, logOut, isLoading, authError } = useAuth();
    const [success, setSuccess] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const darkMode = useDarkMode(false);

    const handleGoogleSignIn = () => {
        signInWithGoogle();
        setSuccess(true);
        setOpenSnackbar(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

    const handleLogOut = () => {
        const confirm = window.confirm("Are you sure you wanna log out!");
        if (confirm === true) { logOut(); }
    }

    return (
        <div>
            <AppBar position="static" sx={{ bgcolor: '#FFFFFF', boxShadow: 'none' }} data-aos="fade-down">
                <Container>
                    <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{ ml: 1, mr: 2, display: { xs: 'flex' } }}
                        >
                            <Link to="/" className="link coloredTxt fwBold">Bloom</Link>
                        </Typography>
                        <Box sx={{ flexGrow: 0, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Box className="hidingName">
                                {user?.email ? <Box className="navName">
                                    <Typography>{user?.displayName}</Typography>
                                </Box> : <Box className="navName">
                                    <Typography>Welcome, User</Typography>
                                </Box>}
                            </Box>
                            &nbsp; &nbsp;
                            {user?.email ? <Tooltip title="Sign Out">
                                <IconButton onClick={handleLogOut}>
                                    <LogoutIcon className="logOutIcon" />
                                </IconButton>
                            </Tooltip> :
                                <GoogleButton
                                    label=" "
                                    onClick={handleGoogleSignIn}
                                    style={{ boxShadow: 'none', border: 'none', width: '50px', background: 'none' }}
                                />
                            }
                            &nbsp; &nbsp;
                            {/* <DarkModeToggle
                                onChange={setIsDarkMode}
                                checked={isDarkMode}
                                size={50}
                            /> */}
                            <div>
                                <button type="button" onClick={darkMode.disable}>
                                    ☀
                                </button>
                                <Checkbox checked={darkMode.value} onChange={darkMode.toggle} />
                                <button type="button" onClick={darkMode.enable}>
                                    ☾
                                </button>
                            </div>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {isLoading && <LinearProgress sx={{ height: '2px' }} />}
            {user?.displayName && success && <Snackbar open={openSnackbar} autoHideDuration={2000} action={action}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Welcome, {user?.displayName}
                </Alert>
            </Snackbar>}
            {authError && <Snackbar open={openSnackbar} autoHideDuration={3000} action={action}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {authError}
                </Alert>
            </Snackbar>}
        </div>
    );
};

export default Navigation;