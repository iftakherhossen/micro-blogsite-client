import { Avatar, Box, Grid, List, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import User from '../User/User';
import useAuth from '../../hooks/useAuth';

const UserInfo = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [userPost, setUserPost] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, [])
    useEffect(() => {
        fetch(`http://localhost:5000/posts/${user.email}`)
            .then(res => res.json())
            .then(data => setUserPost(data));
    }, [user.email])

    return (
        <Grid item xs={12} sm={12} md={3} className="userInfoGridCard">
            <Box className="userInfoGrid">
                <Box className="wrapper">
                    <Box className="userInfo">
                        <Box className="alignCenter">
                            <Avatar alt={user.displayName} src={user.photoURL} className="avatar" />
                        </Box>
                        <Box className="userName">
                            <Typography variant="h6">{user.displayName}</Typography>
                        </Box>
                        <Box className="alignCenter">
                            {user.email && <Typography variant="body2">Total Post - {userPost.length}</Typography>}
                        </Box>
                    </Box>
                </Box>
                {/* <Box className="buttonBox">
                    <Tooltip title="My Profile">
                        <IconButton type="button">
                            <AccountCircleIcon sx={{ color: '#0693E3', fontSize: '1.3em' }} />
                        </IconButton>
                    </Tooltip>
                    &nbsp;
                    <Tooltip title="Saved Posts">
                        <IconButton type="button">
                            <FolderSpecialIcon sx={{ color: '#0693E3', fontSize: '1.25em' }} />
                        </IconButton>
                    </Tooltip>
                </Box> */}
            </Box>
            <Box className="userInfoGrid">
                <Box className="wrapper" sx={{ p: 0 }}>
                    <List className="listWrapper">
                        {
                            users.map(folk => <User
                                key={folk._id}
                                folk={folk}
                            />)
                        }
                    </List>
                </Box>
            </Box>
        </Grid>
    );
};

export default UserInfo;