import { Avatar, Box, Grid, List, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import User from '../User/User';

const UserInfo = () => {
    return (
        <Grid item xs={12} sm={12} md={2.5} className="userInfoGridCard">
            <Box className="userInfoGrid">
                <Box className="wrapper">
                    <Box className="userInfo">
                        <Box className="alignCenter">
                            <Avatar alt="User Name" src="images" className="avatar" />
                        </Box>
                        <Box className="userName">
                            <Typography variant="h6">User Name</Typography>
                        </Box>
                        <Box className="alignCenter">
                            <Typography variant="body2">Total Post - 5</Typography>
                        </Box>
                        <Box className="alignCenter">
                            <Link to="/myPosts" className="link"><button type="button" className="btn">My Posts</button></Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className="userInfoGrid">
                <Box className="wrapper" sx={{ p: 0 }}>
                    <Box>
                        <List>
                            <User />
                            <User />
                            <User />
                            <User />
                            <User />
                        </List>
                    </Box>
                </Box>
            </Box>
        </Grid>
    );
};

export default UserInfo;