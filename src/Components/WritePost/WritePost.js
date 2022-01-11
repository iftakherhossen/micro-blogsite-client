import { Alert, Avatar, Grid, IconButton, Snackbar, TextField, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import HashTags from '../HashTags/HashTags';
import useAuth from '../../hooks/useAuth';
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';

const WritePost = () => {
    const { user, isLoading } = useAuth();
    const [postSuccess, setPostSuccess] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const today = new Date();
    const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = today.getHours()+ ':' + today.getMinutes() + ' ' + weekday[today.getDay()] + ', ' + today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

    const onSubmit = data => {
        const content = data.content;

        const post = {
            username: user.displayName,
            email: user.email,
            img: user.photoURL,
            content,
            date
        }

        fetch('http://localhost:5000/posts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(post)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    setPostSuccess(true);
                    setOpenSnackbar(true);
                    reset();
                    window.location.reload();
                }
            })
    }

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

    return (
        <Grid item xs={12} sm={12} md={3.5} className="userInfoGridCard">
            <Box className="userInfoGrid">
                <Box className="wrapper">
                    <Box className="alignCenter">
                        <Avatar alt={user.displayName} src={user.photoURL} className="avatar" />
                    </Box>
                    <Box className="userName">
                        <Typography variant="h6">{user.displayName}</Typography>
                    </Box>
                    {!isLoading && <form onSubmit={handleSubmit(onSubmit)}>
                        <Box className="multilineTextField">
                            <TextField
                                id="standard-multiline-static"
                                multiline
                                rows={5}
                                sx={{ width: '100%' }}
                                placeholder="Write what's on your mind!"
                                {...register("content", { required: true })}
                                inputProps={{ maxLength: 200 }}
                            />
                        </Box>
                        <Box className="writePostFooter">
                            {errors.content && <Tooltip title="Type Something!" placement="left"><span><ErrorIcon sx={{ color: 'red', fontSize: '1.5em' }} /></span></Tooltip>} &nbsp; &nbsp;
                            <Typography sx={{ color: 'red', fontSize: '0.8em' }}>Max Length 200 Characters *</Typography>
                            <button type="submit" className="postBtn" disabled={!user.email}>Post</button>
                        </Box>
                    </form>}
                </Box>
            </Box>
            <HashTags />
            {postSuccess && <Snackbar open={openSnackbar} autoHideDuration={2000} action={action}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Post created successfully!
                </Alert>
            </Snackbar>}
        </Grid>
    );
};

export default WritePost;