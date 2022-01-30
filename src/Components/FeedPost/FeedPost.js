import { Alert, Avatar, Card, CardActions, CardContent, CardHeader, Checkbox, ClickAwayListener, IconButton, Modal, Snackbar, TextField, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { Box } from '@mui/system';
import { EmailShareButton, FacebookShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { EmailIcon, FacebookIcon, TelegramIcon, TwitterIcon, WhatsappIcon } from "react-share";
import ReportIcon from '@mui/icons-material/Report';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import useAuth from '../../hooks/useAuth';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router-dom';
import Linkify from 'react-linkify';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedIcon from '@mui/icons-material/Verified';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    bgcolor: '#E6ECF0',
    boxShadow: 24,
    p: 3,
    textAlign: 'center'
};
const editModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: '#E6ECF0',
    boxShadow: 24,
    p: 3
};

const moreBtnPortalStyle = {
    position: 'absolute',
    top: 30,
    right: 115,
    zIndex: 1,
    p: 1,
    width: '100%',
    bgcolor: 'transparent',
    display: 'flex',
    justifyContent: 'flex-start'
};

const imgModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    height: 200,
    boxShadow: 24,
    border: 'none',
    outline: 'none'
};

const FeedPost = ({ singlePost, handleDelete }) => {
    const { _id, username, email, date, img, content, time, userLocation } = singlePost;
    const { user, admin } = useAuth();
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [editedContent, setEditedContent] = useState('');
    const [editSuccess, setEditSuccess] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [moreOpen, setMoreOpen] = useState(false);
    const handleShareModalOpen = () => setShareModalOpen(true);
    const handleShareModalClose = () => setShareModalOpen(false);
    const handleEditModalOpen = () => setEditModalOpen(true);
    const handleEditModalClose = () => setEditModalOpen(false);
    const handleClick = () => setMoreOpen((prev) => !prev);
    const handleClickAway = () => setMoreOpen(false);
    const mainLink = "https://bloom-micro-blogsite.web.app";
    const hashtags = ["bloom", "microblogsite", "postoftheday"];
    const related = ["@iftakher_hossen", "@microbblogsite, @healyourselfbd"];
    const navigate = useNavigate();
    const viewLink = `/${username}/posts/${_id}`;
    const viewPostLink = viewLink.replace(/ /g, '');
    const [savedPost, setSavedPost] = useState([]);
    const localDate = time + ', ' + date + ', ' + userLocation;
    const [creator, setCreator] = useState(false);
    const [openImgModal, setOpenImgModal] = useState(false);
    const handleOpenImgModal = () => setOpenImgModal(true);
    const handleCloseImgModal = () => setOpenImgModal(false);

    useEffect(() => {
        fetch(`https://shrouded-eyrie-37217.herokuapp.com/users/${email}/creator`)
            .then(res => res.json())
            .then(data => setCreator(data.creator))
    }, [email])

    const handleCopyBtn = (content) => {
        navigator.clipboard.writeText(content);
    }

    const handleViewPost = (_id, username, email, date, img, content) => {
        const singlePost = { _id, username, email, date, img, content };
        navigate(viewPostLink, { state: singlePost });
        console.log(singlePost);
    }

    const handleSavePost = (_id, username, email, date, img, content) => {
        const postData = { _id, username, email, date, img, content };
        console.log(postData);
        setSavedPost(postData);
    }

    const handleViewProfile = () => {
        console.log("clicked")
    }

    const handleEditPost = () => {
        handleEditModalOpen();
        fetch(`https://shrouded-eyrie-37217.herokuapp.com/posts/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedContent)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    setEditSuccess(true);
                    setOpenSnackbar(true);
                }
            })
    }

    const handleSnackbarClose = (event, reason) => {
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
                onClick={handleSnackbarClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

    const handleImgModal = () => {
        handleOpenImgModal();
    }

    return (
        <Card sx={{ width: 1, mt: 1, mb: 2 }}>
            <CardHeader
                avatar={
                    <Avatar alt={username} src={img} sx={{ bgcolor: "#0693E3" }} onClick={handleImgModal} />
                }
                action={
                    <ClickAwayListener onClickAway={handleClickAway}>
                        <Box sx={{ position: 'relative' }}>
                            <IconButton aria-label="settings" onClick={handleClick}>
                                <MoreVertIcon className="iconHover" />
                            </IconButton>
                            {moreOpen ? (
                                <Box sx={moreBtnPortalStyle}>
                                    {
                                        user?.email === email || admin ? <Tooltip title="Delete Post">
                                            <IconButton aria-label="delete-post" onClick={() => handleDelete(_id)}>
                                                <DeleteIcon className="redHover" />
                                            </IconButton>
                                        </Tooltip> :
                                            <Tooltip title="Report Post">
                                                <IconButton aria-label="report-post">
                                                    <ReportIcon className="redHover" />
                                                </IconButton>
                                            </Tooltip>
                                    }
                                    <Tooltip title="View Post">
                                        <IconButton aria-label="copy-post" onClick={() => handleViewPost(_id, username, email, date, img, content)}>
                                            <OpenInNewIcon className="iconHover" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Copy Text">
                                        <IconButton aria-label="copy-post" onClick={() => handleCopyBtn(content)}>
                                            <ContentCopyIcon className="iconHover" />
                                        </IconButton>
                                    </Tooltip>
                                    {
                                        user?.email === email ?
                                            <Tooltip title="Edit Post">
                                                <IconButton aria-label="edit-post" onClick={() => handleEditPost(_id, content)}>
                                                    <EditIcon className="iconHover" />
                                                </IconButton>
                                            </Tooltip>
                                            :
                                            <Tooltip title="Save Post">
                                                <IconButton aria-label="save-post" onClick={() => handleSavePost(_id, username, email, date, img, content)}>
                                                    <LibraryAddIcon className="iconHover" />
                                                </IconButton>
                                            </Tooltip>
                                    }
                                </Box>
                            ) : null}
                        </Box>
                    </ClickAwayListener>
                }
                title={
                    <Typography variant="body1" sx={{ mb: '-4px', fontWeight: 'bold' }} onClick={() => handleViewProfile()}>
                        {username} {creator && <Tooltip title="Verified Creator"><VerifiedIcon sx={{ fontSize: 14, color: '#0693E3' }} /></Tooltip>}
                    </Typography>
                }
                subheader={
                    <Typography variant="caption" sx={{ color: '#aaa', mt: 0, pt: 0 }}>{localDate}</Typography>
                }
            />
            <CardContent>
                <Typography variant="body1" sx={{ wordWrap: 'break-word', whiteSpace: 'pre-line' }}>
                    <Linkify>
                        {content}
                    </Linkify>
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Checkbox aria-label="reaction" icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: '#E56178' }} />} />
                <IconButton aria-label="share" onClick={handleShareModalOpen}>
                    <ShareIcon className="iconHover" />
                </IconButton>
            </CardActions>


            {/* ImgModal Start */}
            <Modal
                open={openImgModal}
                onClose={handleCloseImgModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={imgModalStyle}>
                    <Typography variant="h6" sx={{ position: 'absolute', width: 1, textAlign: 'center', bgcolor: 'white', bottom: 0 }}>{username} {creator && <Tooltip title="Verified Creator"><VerifiedIcon sx={{ fontSize: 14, color: '#0693E3' }} /></Tooltip>}</Typography>
                    <img src={img} alt={username} style={{width: '100%'}} />
                </Box>
            </Modal>
            {/* ImgModal End */}

            {/* Edit Modal Start */}
            <Modal
                open={editModalOpen}
                onClose={handleEditModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card sx={editModalStyle}>
                    <CardHeader
                        avatar={
                            <Avatar alt={username} src={img} sx={{ bgcolor: "#0693E3" }} />
                        }
                        title={
                            <Typography variant="body1" sx={{ mb: '-4px' }} className="fwBold" onClick={() => handleViewProfile()}>{username}</Typography>
                        }
                        subheader={
                            <Typography variant="caption" sx={{ color: '#aaa', mt: 0, pt: 0 }}>
                                {date}
                            </Typography>
                        }
                    />
                    <CardContent>
                        <form onSubmit={handleEditPost}>
                            <TextField
                                id="standard-multiline-static"
                                multiline
                                rows={4}
                                defaultValue={content}
                                sx={{ width: '100%', userSelect: 'text' }}
                                placeholder="Write what's on your mind!"
                                // {...register("content", { required: true })}
                                inputProps={{ maxLength: 200 }}
                                onChange={e => setEditedContent(e.target.value)}
                            />
                            <Box sx={{ textAlign: 'right' }}><button type="submit" className="editBtn" disabled={!editedContent}>Post</button></Box>
                        </form>
                    </CardContent>
                </Card>
            </Modal>
            {/* Edit Modal End */}

            {/* Share Modal Start */}
            <Modal
                open={shareModalOpen}
                onClose={handleShareModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Share this Post
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        <EmailShareButton url={`${mainLink}/${username}/posts/${_id}`} subject="Sharing Post via Email" body={`${username} shared a post on micro blogsite`} separator=" " className="shareBtn">
                            <EmailIcon size={30} round={true} />
                        </EmailShareButton>
                        <FacebookShareButton url={`${mainLink}/posts/${_id}`} title={`${username} shared a post on micro blogsite`} hashtags={hashtags} className="shareBtn">
                            <FacebookIcon size={30} round={true} />
                        </FacebookShareButton>
                        <TelegramShareButton url={`${mainLink}/posts/${_id}`} title={`${username} shared a post on micro blogsite`} className="shareBtn">
                            <TelegramIcon size={30} round={true} />
                        </TelegramShareButton>
                        <TwitterShareButton url={`${mainLink}/posts/${_id}`} title={`${username} shared a post on micro blogsite`} via="MicroBlogsite" hashtags={hashtags} related={related} className="shareBtn">
                            <TwitterIcon size={30} round={true} />
                        </TwitterShareButton>
                        <WhatsappShareButton url={`${mainLink}/posts/${_id}`} separator=" " title={`${username} shared a post on micro blogsite`} className="shareBtn">
                            <WhatsappIcon size={30} round={true} />
                        </WhatsappShareButton>
                    </Box>
                </Box>
            </Modal>
            {/* Share Modal End */}

            {editSuccess && <Snackbar open={openSnackbar} autoHideDuration={2000} action={action}>
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Post updated successfully!
                </Alert>
            </Snackbar>}
        </Card >
    );
};

export default FeedPost;