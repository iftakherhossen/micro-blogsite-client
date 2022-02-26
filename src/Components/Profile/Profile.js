import { Avatar, Grid, IconButton, Modal, Tooltip, Typography } from '@mui/material';
import { Box } from "@mui/system";
import React, { useEffect, useState } from 'react';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import VerifiedIcon from '@mui/icons-material/Verified';
import Styles from '../Styles/Styles';

const { imgModalStyle } = Styles();

const Profile = ({ userData }) => {
    const [userPost, setUserPost] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();
    const [openImgModal, setOpenImgModal] = useState(false);
    const handleOpenImgModal = () => setOpenImgModal(true);
    const handleCloseImgModal = () => setOpenImgModal(false);

    useEffect(() => {
        fetch(`https://shrouded-eyrie-37217.herokuapp.com/posts/${userData.email}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => setUserPost(data));
    }, [userData.email])

    const handleSavedPosts = () => {
        const link = `/users/${userData.displayName}/savedPosts`;
        const updateLink = link.replace(/ /g, '');
        navigate(updateLink)
    }
    const handleNewPost = () => {
        navigate('/')
    }
    const handleImgModal = () => {
        handleOpenImgModal();
    }

    return (
        <Grid item xs={12} sm={12} md={3} className="userInfoGridCard" data-aos="fade-right">
            <Box className="userInfoGrid">
                <Box sx={{ py: 2 }}>
                    <Box className="alignCenter">
                        <Avatar
                            alt={userData.displayName}
                            src={userData.photoURL}
                            className="avatar"
                            sx={{ width: 100, height: 100, mt: 1, mb: 3, mx: 'auto' }}
                            onClick={handleImgModal}
                        />
                    </Box>
                    <Box className="userName">
                        <Typography variant="h5">
                            {userData?.displayName} {(userData.role === 'creator' || userData.role === 'admin') && <Tooltip title={(userData.role === 'creator' ? "Verified Creator" : "Admin")}><VerifiedIcon sx={{ fontSize: 18, color: '#0693E3' }} /></Tooltip>}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#5F5858', mb: 1 }}>{(userData?.email === user?.email) && user.email}</Typography>
                    </Box>
                    <Box className="alignCenter">
                        {userData?.email && <Typography variant="body1">
                            Total Post - {userPost.length}
                        </Typography>}
                    </Box>
                    <Box sx={{ mt: 1 }}>
                        {userData?.email === user?.email && <Tooltip title="Saved Posts">
                            <IconButton type="button" onClick={handleSavedPosts}>
                                <FolderSpecialIcon sx={{ color: '#0693E3', fontSize: '1.25em' }} />
                            </IconButton>
                        </Tooltip>}
                        {userData?.email === user?.email && <Tooltip title="New Post">
                            <IconButton type="button" onClick={handleNewPost}>
                                <BorderColorIcon sx={{ color: '#0693E3', fontSize: '1em' }} />
                            </IconButton>
                        </Tooltip>}
                    </Box>
                </Box>
            </Box>

            {/* ImgModal Start */}
            <Modal
                open={openImgModal}
                onClose={handleCloseImgModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={imgModalStyle}>
                    <Typography variant="h6" sx={{ position: 'absolute', width: 1, textAlign: 'center', bgcolor: 'white', bottom: 0 }}>
                        <span style={{ paddingRight: '8px' }}>{userData.displayName}</span>
                        {(userData.role === 'creator' || userData.role === 'admin') &&
                            <Tooltip title={userData.role === 'creator' ? 'Verified Creator' : 'Admin'}>
                                <VerifiedIcon sx={{ fontSize: 14, color: '#0693E3' }} />
                            </Tooltip>
                        }
                    </Typography>
                    <Avatar src={userData.photoURL} alt={userData.displayName} style={{ width: '100%', height: '100%', zIndex: -1, border: '5px solid #0693E3' }} />
                </Box>
            </Modal>
            {/* ImgModal End */}
        </Grid>
    );
};

export default Profile;