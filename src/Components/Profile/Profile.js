import { Avatar, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { Box } from "@mui/system";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';

const Profile = ({ userData }) => {
    const [userPost, setUserPost] = useState([]);

    useEffect(() => {
        fetch(`https://shrouded-eyrie-37217.herokuapp.com/posts/${userData.email}`)
            .then(res => res.json())
            .then(data => setUserPost(data));
    }, [userData.email])

    return (
        <Grid item xs={12} sm={12} md={3} className="userInfoGridCard">
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
                        <Typography variant="h5">{userData.displayName}</Typography>
                    </Box>
                    <Box className="alignCenter">
                        {userData.email && <Typography variant="body2">Total Post - {userPost.length}</Typography>}
                    </Box>
                    <Tooltip title="Saved Posts">
                        <Link to="/userName/savedPosts" className="link">
                            <IconButton type="button">
                                <FolderSpecialIcon sx={{ color: '#0693E3', fontSize: '1.25em' }} />
                            </IconButton>
                        </Link>
                    </Tooltip>
                </Box>
            </Box>
        </Grid>
    );
};

export default Profile;