import { Card, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FeedPost from '../FeedPost/FeedPost';

const MyPosts = ({ userData }) => {
    const [post, setPost] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/posts/${userData.email}`)
            .then(res => res.json())
            .then(data => setPost(data));
    }, [userData.email])

    return (
        <Grid item xs={12} sm={12} md={6} className="gridCard" sx={{mt: '2px'}}>
            {
                userData.email && post.length === 0 && <Card className="txtCard">
                    <Typography variant="h6">You haven't posted anything yet!</Typography>
                </Card>
            }
            {
                userData.email ? post.slice(0).reverse().map(singlePost => <FeedPost
                    key="singlePost._id"
                    singlePost={singlePost}
                />) : <Card className="txtCard">
                    <Typography variant="h6">You are not an user!</Typography>
                </Card>
            }
        </Grid>
    );
};

export default MyPosts;