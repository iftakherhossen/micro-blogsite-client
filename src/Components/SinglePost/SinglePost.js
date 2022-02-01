import { Avatar, Card, CardActions, CardContent, CardHeader, Checkbox, ClickAwayListener, Grid, IconButton, Modal, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
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
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

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

const SinglePost = ({ singlePost, handleDelete }) => {
    const { _id, username, email, date, img, content } = singlePost;
    const { user } = useAuth();
    const [modalOpen, setModalOpen] = useState(false);
    const [moreOpen, setMoreOpen] = useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
    const handleClick = () => setMoreOpen((prev) => !prev);
    const handleClickAway = () => setMoreOpen(false);
    const mainLink = "https://bloom-micro-blogsite.web.app";
    const hashtags = ["bloom", "microblogsite", "postoftheday"];
    const related = ["@iftakher_hossen", "@microbblogsite, @healyourselfbd"];
    const navigate = useNavigate();
    const link = `/${username}/posts/${_id}`;
    const updatedLink = link.replace(/ /g, '');

    const hashtagContent = content.split(" ").map((str) => {
        if (str.startsWith("#")) {
            return <span className="hashtag">{str} </span>;
        }
        return str + " ";
    })

    const handleCopyBtn = (content) => {
        navigator.clipboard.writeText(content);
    }

    const handleViewPost = (_id, username, email, date, img, content) => {
        const singlePost = { _id, username, email, date, img, content }
        navigate(updatedLink, { state: singlePost });
        console.log(singlePost)
    }

    return (
        <Grid item xs={12} sm={12} md={5.5} className="gridCard">
            <Card sx={{ width: 1, mt: 1, mb: 2 }}>
                <CardHeader
                    avatar={
                        <Avatar alt={username} src={img} sx={{ bgcolor: "#0693E3" }} />
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
                                            user?.email === email ? <Tooltip title="Delete Post">
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
                                        <Tooltip title="Save Post">
                                            <IconButton aria-label="save-post">
                                                <LibraryAddIcon className="iconHover" />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                ) : null}
                            </Box>
                        </ClickAwayListener>
                    }
                    title={
                        <Typography variant="body1" sx={{ mb: '-4px' }} className="fwBold">{username}</Typography>
                    }
                    subheader={
                        <Typography variant="caption" sx={{ color: '#aaa', mt: 0, pt: 0 }}>{date}</Typography>
                    }
                />
                <CardContent>
                    <Typography variant="body1" sx={{ wordWrap: 'break-word', whiteSpace: 'pre-line' }}>
                        <Linkify>
                            {hashtagContent}
                        </Linkify>
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Checkbox aria-label="reaction" icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: '#E56178' }} />} />
                    <IconButton aria-label="share" onClick={handleModalOpen}>
                        <ShareIcon className="iconHover" />
                    </IconButton>
                </CardActions>


                {/* Modal Start */}
                <Modal
                    open={modalOpen}
                    onClose={handleModalClose}
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
                {/* Modal End */}
            </Card >
        </Grid>
    );
};

export default SinglePost;