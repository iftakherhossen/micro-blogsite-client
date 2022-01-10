import { Grid } from '@mui/material';
import React from 'react';
import FeedPost from '../FeedPost/FeedPost';

const PostFeed = () => {
    return (
        <Grid item xs={12} sm={12} md={5.5} className="gridCard">
            <FeedPost />
            <FeedPost />
            <FeedPost />
            <FeedPost />
            <FeedPost />
        </Grid>
    );
};

export default PostFeed;