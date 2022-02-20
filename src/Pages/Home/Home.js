import React from 'react';
import { Container, Grid } from '@mui/material';
import WritePost from '../../Components/WritePost/WritePost';
import PostFeed from '../../Components/PostFeed/PostFeed';
import UserInfo from '../../Components/UserInfo/UserInfo';

const Home = () => {
    return (
        <div>
            <Container>
                <Grid container>
                    <WritePost />
                    <PostFeed />
                    <UserInfo />
                </Grid>
            </Container>
        </div>
    );
};

export default Home;