import {  Box, Grid, List } from '@mui/material';
import React, { useEffect, useState } from 'react';
import User from '../User/User';

const UserInfo = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    return (
        <Grid item xs={12} sm={12} md={3} className="userInfoGridCard">
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