import { Box, Button, Divider, Grid, List } from '@mui/material';
import React, { useEffect, useState } from 'react';
import User from '../User/User';
import ContactInfo from '../ContactInfo/ContactInfo';
import Games from '../Games/Games';

const UserInfo = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://shrouded-eyrie-37217.herokuapp.com/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    const shuffleArray = array => {
        let i = array.length - 1;
        for (; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    const shuffledPosts = shuffleArray(users);

    return (
        <Grid item xs={12} sm={12} md={3} className="userInfoGridCard" data-aos="fade-left">
            <Box className="userInfoGrid">
                <Box className="wrapper" sx={{ p: 0 }}>
                    <List className="listWrapper">
                        {
                            shuffledPosts.map(folk => <User
                                key={folk._id}
                                folk={folk}
                            />)
                        }
                    </List>
                    {users.length >= 10 && <>
                        <Divider sx={{ my: 1 }} />
                        <Box>
                            <Button variant="inherit" sx={{ color: '#0693E3', fontWeight: 'bold' }}>Show More!</Button>
                        </Box>
                    </>}
                </Box>
            </Box>
            <Games />
            <ContactInfo />
        </Grid>
    );
};

export default UserInfo;