import React from 'react';
import { Container, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import WritePost from '../../Components/WritePost/WritePost';
import UserInfo from '../../Components/UserInfo/UserInfo';
import SinglePost from '../../Components/SinglePost/SinglePost';

const SinglePosts = () => {
    const { state } = useLocation();
    const postData = state;
    
    return (
        <div>
            <Container>
                <Grid container>
                    <WritePost />
                    <SinglePost singlePost={postData} />
                    <UserInfo />
                </Grid>
            </Container>
        </div>
    );
};

export default SinglePosts;