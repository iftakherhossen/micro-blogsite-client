import { Card, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FeedPost from '../FeedPost/FeedPost';

const MyPosts = ({ userData }) => {
    const [post, setPost] = useState([]);

    useEffect(() => {
        fetch(`https://shrouded-eyrie-37217.herokuapp.com/posts/${userData.email}`)
            .then(res => res.json())
            .then(data => setPost(data));
    }, [userData.email])

    return (
        <Grid item xs={12} sm={12} md={6} className="gridCard" sx={{ pt: '7.3px' }} data-aos="fade-down" data-aos-anchor-placement="center-center">
            {
                userData.email && post.length === 0 && <Card className="txtCard">
                    <Typography variant="h6"><span className="coloredTxt">{userData?.displayName}</span> haven't posted anything yet!</Typography>
                </Card>
            }
            {
                userData?.email && post.slice(0).reverse().map(singlePost => <FeedPost
                    key="singlePost._id"
                    singlePost={singlePost}
                />)
            }
        </Grid>
    );
};

export default MyPosts;