import React from 'react';
import { Container, Grid } from '@mui/material';
import Navigation from '../../Components/Navigation/Navigation';
import Footer from '../../Components/Footer/Footer';
import Users from '../../Components/Users/Users';
import Games from '../../Components/Games/Games';
import ContactInfo from '../../Components/ContactInfo/ContactInfo';
import PopularPosts from '../../Components/PopularPosts/PopularPosts';

const UsersPage = () => {
    return (
        <div>
            <Navigation />
            <Container>
                <Grid container>
                    <Grid item xs={12} sm={12} md={3.5} className="userInfoGridCard" data-aos="fade-right">
                        <PopularPosts />
                    </Grid>
                    <Users />
                    <Grid item xs={12} sm={12} md={3} className="userInfoGridCard" data-aos="fade-right">
                        <Games />
                        <ContactInfo />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </div>
    );
};

export default UsersPage;