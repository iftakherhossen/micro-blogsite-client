import { Card, Container, Grid } from '@mui/material';
import React from 'react';
import Footer from '../../Components/Footer/Footer';
import Navigation from '../../Components/Navigation/Navigation';
import UserInfo from '../../Components/UserInfo/UserInfo';
import WritePost from '../../Components/WritePost/WritePost';

const SavedPosts = () => {
    return (
        <div>
            <Navigation />
            <Container>
                <Grid container>
                    <WritePost />
                    {/* singlePost.length === null ? */}
                    <Grid item xs={12} sm={12} md={5.5} className="gridCard">
                        <Card sx={{ width: 1, mt: 1, mb: 2, textAlign: 'center', py: 8, color: '#bbb' }}>
                            <h2>You haven't saved anything!</h2>
                        </Card>
                    </Grid>
                    {/* <SinglePost singlePost={singlePost} /> */}
                    <UserInfo />
                </Grid>
            </Container>
            <Footer />
        </div>
    );
};

export default SavedPosts;