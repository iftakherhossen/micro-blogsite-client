import { Grid, List } from '@mui/material';
import { Box } from "@mui/system";
import React, { useEffect, useState } from 'react';
import User from '../User/User';

const UsersInProfile = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, [])

    return (
        <Grid item xs={12} sm={12} md={3} className="userInfoGridCard">
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
                    </Box>
                </Box>
            </Box>
        </Grid>
    );
};

export default UsersInProfile;