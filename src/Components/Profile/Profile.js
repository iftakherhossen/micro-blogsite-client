import { Avatar, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { Box } from "@mui/system";
import React, { useEffect, useState } from 'react';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import VerifiedIcon from '@mui/icons-material/Verified';

const Profile = ({ userData }) => {
    const [userPost, setUserPost] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://shrouded-eyrie-37217.herokuapp.com/posts/${userData.email}`)
            .then(res => res.json())
            .then(data => setUserPost(data));
    }, [userData.email])

    const handleSavedPosts = () => {
        const link = `/users/${userData.displayName}/savedPosts`;
        const updateLink = link.replace(/ /g, '');
        navigate(updateLink)
    }
    const handleNewPost = () => {
        navigate('/')
    }

    return (
        <Grid item xs={12} sm={12} md={3} className="userInfoGridCard" data-aos="fade-right">
            <Box className="userInfoGrid">
                <Box sx={{ py: 2 }}>
                    <Box className="alignCenter">
                        <Avatar
                            alt={userData.displayName}
                            src={userData.photoURL}
                            className="avatar"
                            sx={{ width: 100, height: 100, mt: 1, mb: 3, mx: 'auto' }}
                        />
                    </Box>
                    <Box className="userName">
                        <Typography variant="h5">{userData?.displayName} {userData.role === 'creator' && <Tooltip title="Verified Creator"><VerifiedIcon sx={{ fontSize: 18 }} /></Tooltip>}</Typography>
                    </Box>
                    <Box className="alignCenter">
                        {userData?.email && <Typography variant="body2">
                            Total Post - {userPost.length}
                        </Typography>}
                    </Box>
                    <Box sx={{mt: 1}}>
                        {userData?.email === user?.email && <Tooltip title="Saved Posts">
                            <IconButton type="button" onClick={handleSavedPosts}>
                                <FolderSpecialIcon sx={{ color: '#0693E3', fontSize: '1.25em' }} />
                            </IconButton>
                        </Tooltip>}
                        {userData?.email === user?.email && <Tooltip title="New Post">
                            <IconButton type="button" onClick={handleNewPost}>
                                <BorderColorIcon sx={{ color: '#0693E3', fontSize: '1em' }} />
                            </IconButton>
                        </Tooltip>}
                    </Box>
                </Box>
            </Box>
        </Grid>
    );
};

export default Profile;