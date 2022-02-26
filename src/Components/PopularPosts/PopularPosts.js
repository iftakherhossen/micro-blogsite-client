import { Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PopularPost from '../PopularPost/PopularPost';

const PopularPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('https://shrouded-eyrie-37217.herokuapp.com/posts', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => setPosts(data));
    }, [])

    const shuffleArray = array => {
        let i = array.length - 1;
        for (; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    const shuffledPosts = shuffleArray(posts);

    const limitedPosts = shuffledPosts.slice(0, 3);

    return (
        <div className="userInfoGrid">
            <Typography variant="subtitle1" sx={{mb:1, ml: 1, textAlign: 'left', fontWeight: 'bold'}}>Popular Posts <span className="coloredTxt"></span></Typography>
            <Divider />
            {
                limitedPosts.map(post => <PopularPost
                    key={post.time}
                    post={post}
                />
                )
            }
        </div>
    );
};

export default PopularPosts;