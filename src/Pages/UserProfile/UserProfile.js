import React from 'react';
import { CircularProgress, Container, Grid } from '@mui/material';
import Navigation from '../../Components/Navigation/Navigation';
import Footer from '../../Components/Footer/Footer';
import Profile from '../../Components/Profile/Profile';
import MyPosts from '../../Components/MyPosts/MyPosts';
import UsersInProfile from '../../Components/UsersInProfile/UsersInProfile';
import { useLocation } from 'react-router-dom';

const UserProfile = () => {
    const { state } = useLocation();
    const userData = state;

    return (
        <div>
            <Navigation />
            <Container>
                <Grid container>
                    <Profile userData={userData}  />
                    <MyPosts userData={userData}  />
                    <UsersInProfile />
                </Grid>
            </Container>
            <Footer />
        </div>
    );
};

export default UserProfile;