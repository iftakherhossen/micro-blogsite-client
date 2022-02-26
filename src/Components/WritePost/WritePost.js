import { Alert, Avatar, Grid, IconButton, Modal, Snackbar, TextField, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import HashTags from '../HashTags/HashTags';
import useAuth from '../../hooks/useAuth';
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';
import PopularPosts from '../PopularPosts/PopularPosts';
import Styles from '../Styles/Styles';
import VerifiedIcon from '@mui/icons-material/Verified';

const { imgModalStyle } = Styles();

const WritePost = () => {
    const { user, isLoading } = useAuth();
    const [postSuccess, setPostSuccess] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const today = new Date();
    const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const time = today.getHours() + ':' + today.getMinutes();
    const date = ' ' + weekday[today.getDay()] + ', ' + today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    const reactions = 0;
    const [location, setLocation] = useState('');
    const tokenAPI = process.env.REACT_APP_TOKEN_API;
    const [creator, setCreator] = useState(false);
    const [openImgModal, setOpenImgModal] = useState(false);
    const handleOpenImgModal = () => setOpenImgModal(true);
    const handleCloseImgModal = () => setOpenImgModal(false);

    useEffect(() => {
        fetch(`https://ipinfo.io/json?token=${tokenAPI}`)
            .then(res => res.json())
            .then(data => setLocation(data))
    }, [tokenAPI]);

    useEffect(() => {
        fetch(`https://shrouded-eyrie-37217.herokuapp.com/users/${user?.email}/creator`)
            .then(res => res.json())
            .then(data => setCreator(data.creator))
    }, [user?.email])

    const uLocation = location?.country === 'BD' && 'Bangladesh';
    const userLocation = location?.city + ', ' + uLocation;

    const onSubmit = data => {
        const content = data.content;

        const post = {
            username: user.displayName,
            email: user.email,
            img: user.photoURL,
            content,
            date,
            time, 
            userLocation,
            reactions
        }

        fetch('https://shrouded-eyrie-37217.herokuapp.com/posts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json' 
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
                    window.location.assign('/')
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

    const handleImgModal = () => {
        handleOpenImgModal();
    }

    return (
        <Grid item xs={12} sm={12} md={3.5} className="userInfoGridCard" data-aos="fade-right">
            <Box className="userInfoGrid">
                <Box className="wrapper">
                    <Box className="alignCenter">
                        <Avatar alt={user?.displayName} src={user?.photoURL} onClick={handleImgModal} className="avatar" />
                    </Box>
                    <Box className="userName">
                        <Typography variant="h6">
                            {user?.displayName}
                            {creator &&
                                <Tooltip title="Verified Creator">
                                    <VerifiedIcon sx={{ fontSize: 14, color: '#0693E3', ml:1 }} />
                                </Tooltip>
                            }
                        </Typography>
                    </Box>
                    {!isLoading && <form onSubmit={handleSubmit(onSubmit)}>
                        <Box className="multilineTextField">
                            <TextField
                                id="standard-multiline-static"
                                multiline
                                rows={5}
                                sx={{ width: '100%', userSelect: 'text' }}
                                placeholder="Write what's on your mind!"
                                {...register("content", { required: true })}
                                inputProps={{ maxLength: 200 }}
                                disabled={!user?.email}
                            />
                        </Box>
                        <Box className="writePostFooter">
                            {
                                errors.content && <Tooltip title="Type Something!" placement="left"><span><ErrorIcon sx={{ color: 'red', fontSize: '1.5em' }} /></span></Tooltip>
                            }
                            &nbsp; &nbsp;
                            <Typography sx={{ color: 'red', fontSize: '0.8em' }}>Max Length 200 Characters</Typography>
                            <button type="submit" className="postBtn" disabled={!user?.email}>Post</button>
                        </Box>
                    </form>}
                </Box>
            </Box>
            <HashTags />
            <PopularPosts />
            {postSuccess && <Snackbar open={openSnackbar} autoHideDuration={2000} action={action}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Post created successfully!
                </Alert>
            </Snackbar>}

            {/* ImgModal Start */}
            <Modal
                open={openImgModal}
                onClose={handleCloseImgModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={imgModalStyle}>
                    <Typography variant="h6" sx={{ position: 'absolute', width: 1, textAlign: 'center', bgcolor: 'white', bottom: 0 }}>
                        {user?.displayName}
                        {creator &&
                            <Tooltip title="Verified Creator">
                                <VerifiedIcon sx={{ fontSize: 14, color: '#0693E3', ml: 1  }} />
                            </Tooltip>
                        }
                    </Typography>
                    <Avatar src={user?.photoURL} alt={user?.displayName} style={{ width: '100%', height: '100%', zIndex: -1, border: '5px solid #0693E3' }} />
                </Box>
            </Modal>
            {/* ImgModal End */}
        </Grid>
    );
};

export default WritePost;