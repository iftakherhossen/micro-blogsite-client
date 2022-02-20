import { Box, Grid, List } from '@mui/material';
import React, { useEffect, useState } from 'react';
import User from '../User/User';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://shrouded-eyrie-37217.herokuapp.com/limitedUsers')
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
        <Grid item xs={12} sm={12} md={5.5} className="userInfoGridCard" data-aos="fade-left">
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
                </Box>
            </Box>
        </Grid>
    );
};

export default Users;