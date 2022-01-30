import { Alert, Card, Grid, IconButton, Snackbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FeedPost from '../FeedPost/FeedPost';
import CloseIcon from '@mui/icons-material/Close';

const MyPosts = ({ userData }) => {
    const [post, setPost] = useState([]);
    const [success, setSuccess] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        fetch(`https://shrouded-eyrie-37217.herokuapp.com/posts/${userData.email}`)
            .then(res => res.json())
            .then(data => setPost(data));
    }, [userData.email]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

    const handleDelete = (id) => {
        const confirm = window.confirm('Are you sure? You wanna delete your post!');

        if (confirm === true) {
            fetch(`https://shrouded-eyrie-37217.herokuapp.com/posts/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        setSuccess(true);
                        setOpenSnackbar(true);
                        const remaining = post.filter(p => p._id !== id);
                        setPost(remaining);
                        window.location.reload();
                    }
                })
        }
        else {
            window.location.reload();
        }
    }

    return (
        <>
            <Grid item xs={12} sm={12} md={6} className="gridCard" sx={{ pt: '7.3px' }}>
                {
                    userData.email && post.length === 0 && <Card className="txtCard">
                        <Typography variant="h6"><span className="coloredTxt">{userData?.displayName}</span> haven't posted anything yet!</Typography>
                    </Card>
                }
                {
                    userData?.email && post.slice(0).reverse().map(singlePost => <FeedPost
                        key="singlePost.time"
                        singlePost={singlePost}
                        handleDelete={handleDelete}
                    />)
                }
            </Grid>
            {
                success && <Snackbar open={openSnackbar} autoHideDuration={2000} action={action}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Post deleted successfully!
                    </Alert>
                </Snackbar>
            }
        </>
    );
};

export default MyPosts;