import React from 'react';
import { Container, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Navigation from '../../Components/Navigation/Navigation';
import WritePost from '../../Components/WritePost/WritePost';
import UserInfo from '../../Components/UserInfo/UserInfo';
import Footer from '../../Components/Footer/Footer';
import SinglePost from '../../Components/SinglePost/SinglePost';

const SinglePosts = () => {
    const { state } = useLocation();
    const postData = state;
    
    return (
        <div>
            <Navigation />
            <Container>
                <Grid container>
                    <WritePost />
                    <SinglePost singlePost={postData} />
                    <UserInfo />
                </Grid>
            </Container>
            <Footer />
        </div>
    );
};

export default SinglePosts;