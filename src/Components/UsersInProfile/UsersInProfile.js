import { Button, Divider, Grid, List } from '@mui/material';
import { Box } from "@mui/system";
import React, { useEffect, useState } from 'react';
import User from '../User/User';
import { useNavigate } from 'react-router-dom';

const UsersInProfile = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://shrouded-eyrie-37217.herokuapp.com/limitedUsers', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    const handleShowMoreBtn = () => {
        navigate('/users')
    }

    return (
        <Grid item xs={12} sm={12} md={3} className="userInfoGridCard" data-aos="fade-left">
            <Box className="userInfoGrid">
                <Box className="wrapper" sx={{ p: 0 }}>
                    <Box>
                        <List className="listWrapper">
                            {
                                users.map(folk => <User
                                    key={folk._id}
                                    folk={folk}
                                />)
                            }
                        </List>
                        <Divider sx={{ my: 1 }} />
                        <Box>
                            <Button variant="inherit" sx={{ color: '#0693E3', fontWeight: 'bold' }} onClick={handleShowMoreBtn}>Show More!</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Grid>
    );
};

export default UsersInProfile;