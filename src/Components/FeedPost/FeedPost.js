import { Avatar, Card, CardActions, CardContent, CardHeader, ClickAwayListener, IconButton, Modal, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Box } from '@mui/system';
import { EmailShareButton, FacebookShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { EmailIcon, FacebookIcon, TelegramIcon, TwitterIcon, WhatsappIcon } from "react-share";
import ArticleIcon from '@mui/icons-material/Article';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

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
    right: 75,
    zIndex: 1,
    p: 1,
    width: '100%',
    bgcolor: 'transparent',
    display: 'flex',
    justifyContent: 'flex-start'
};

const FeedPost = ({ singlePost }) => {
    const { _id, username, date, img, content } = singlePost;
    const [modalOpen, setModalOpen] = useState(false);
    const [moreOpen, setMoreOpen] = useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
    const handleClick = () => setMoreOpen((prev) => !prev);
    const handleClickAway = () => setMoreOpen(false);
    const [color, setColor] = useState('#aaa');

    const hashtags = ["microblogsite", "postoftheday"];
    const related = ["@iftakher_hossen", "@microbblogsite, @healyourselfbd"];

    const handleReaction = e => {
        setColor('red')
    }
    const handleRemoveReaction = e => {
        setColor('#aaa')
    }

    const handleCopyBtn = (content) => {
        navigator.clipboard.writeText(content);
    }

    return (
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
                                    <Tooltip title="View Post">
                                        <IconButton aria-label="full-post">
                                            <ArticleIcon className="iconHover" />
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
                <Typography variant="body1">{content}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <IconButton onClick={handleReaction} onDoubleClick={handleRemoveReaction}>
                    <FavoriteIcon sx={{ color: color }} />
                </IconButton>
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
                        <EmailShareButton url={`/${username}/posts/${_id}`} subject="Sharing Post via Email" body={`${username} shared a post on micro blogsite`} separator=" " className="shareBtn">
                            <EmailIcon size={30} round={true} />
                        </EmailShareButton>
                        <FacebookShareButton url={`/${username}/posts/${_id}`} title={`${username} shared a post on micro blogsite`} hashtags={hashtags} className="shareBtn">
                            <FacebookIcon size={30} round={true} />
                        </FacebookShareButton>
                        <TelegramShareButton url={`/${username}/posts/${_id}`} title={`${username} shared a post on micro blogsite`} className="shareBtn">
                            <TelegramIcon size={30} round={true} />
                        </TelegramShareButton>
                        <TwitterShareButton url={`/${username}/posts/${_id}`} title={`${username} shared a post on micro blogsite`} via="MicroBlogsite" hashtags={hashtags} related={related} className="shareBtn">
                            <TwitterIcon size={30} round={true} />
                        </TwitterShareButton>
                        <WhatsappShareButton url={`/${username}/posts/${_id}`} separator=" " title={`${username} shared a post on micro blogsite`} className="shareBtn">
                            <WhatsappIcon size={30} round={true} />
                        </WhatsappShareButton>
                    </Box>
                </Box>
            </Modal>
            {/* Modal End */}
        </Card >
    );
};

export default FeedPost;