import React from 'react';
import { Container, Grid } from '@mui/material';
import Profile from '../../Components/Profile/Profile';
import MyPosts from '../../Components/MyPosts/MyPosts';
import UsersInProfile from '../../Components/UsersInProfile/UsersInProfile';
import { useLocation } from 'react-router-dom';

const UserProfile = () => {
    const { state } = useLocation();
    const userData = state;

    return (
        <div>
            <Container>
                <Grid container>
                    <Profile userData={userData} />
                    <MyPosts userData={userData} />
                    <UsersInProfile />
                </Grid>
            </Container>
        </div>
    );
};

export default UserProfile;