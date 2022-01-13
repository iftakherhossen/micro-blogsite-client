import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FeedPost from '../FeedPost/FeedPost';

const PostFeed = () => {
    const [post, setPost] = useState([]);

    useEffect(() => {
        fetch('https://micro-blogsite-iftakherhossen.herokuapp.com/posts')
            .then(res => res.json())
            .then(data => setPost(data));
    }, [])

    return (
        <Grid item xs={12} sm={12} md={5.5} className="gridCard">
            {
                post.slice(0).reverse().map(singlePost => <FeedPost
                    key="singlePost._id"
                    singlePost={singlePost}
                />)
            }
        </Grid>
    );
};

export default PostFeed;