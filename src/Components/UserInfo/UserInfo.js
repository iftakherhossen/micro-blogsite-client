import { Avatar, Box, Divider, Grid, IconButton, List, TextField, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import User from '../User/User';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import useAuth from '../../hooks/useAuth';
import SearchIcon from '@mui/icons-material/Search';

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
        <Grid item xs={12} sm={12} md={2.5} className="userInfoGridCard">
            <Box className="userInfoGrid">
                <Box className="wrapper">
                    <Box className="userInfo">
                        <Box className="alignCenter">
                            <Avatar alt="User Name" src={user.photoURL} className="avatar" />
                        </Box>
                        <Box className="userName">
                            <Link to="/myProfile" className="link" style={{ cursor: 'pointer' }}><Typography variant="h6">{user.displayName}</Typography></Link>
                        </Box>
                        <Box className="alignCenter">
                            {user.email && <Typography variant="body2">Total Post - {userPost.length}</Typography>}
                        </Box>
                        <Box className="buttonBox">
                            <Tooltip title="Profile">
                                <Link to="/myProfile" className="link">
                                    <IconButton type="button">
                                        <AccountCircleIcon sx={{ color: '#0693E3', fontSize: '1.3em' }} />
                                    </IconButton>
                                </Link>
                            </Tooltip>
                            &nbsp;
                            <Tooltip title="Saved Posts">
                                <Link to="/userName/savedPosts" className="link">
                                    <IconButton type="button">
                                        <FolderSpecialIcon sx={{ color: '#0693E3', fontSize: '1.25em' }} />
                                    </IconButton>
                                </Link>
                            </Tooltip>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className="userInfoGrid">
                <Box className="wrapper" sx={{ p: 0 }}>
                    <Box className="searchBar">
                        <TextField
                            id="standard-search"
                            type="search"
                            variant="standard"
                            sx={{ maxWidth: '100%' }}
                        />
                        <IconButton type="button">
                            <SearchIcon />
                        </IconButton>
                        <Divider />
                    </Box>
                    <Box>
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
            </Box>
        </Grid>
    );
};

export default UserInfo;