import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Modal, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Box } from '@mui/system';
import { EmailShareButton, FacebookShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton} from "react-share";
import { EmailIcon, FacebookIcon, TelegramIcon, TwitterIcon, WhatsappIcon } from "react-share";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    bgcolor: '#E6ECF0',
    boxShadow: 24,
    p: 3,
    textAlign: 'center'
};

const FeedPost = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const hashtags = ["#microblogsite", "#postoftheday"];
    const related = ["@iftakher_hossen", "@microbblogsite"];

    return (
        <Card sx={{ width: 1, mt: 1, mb: 2 }}>
            <CardHeader
                avatar={
                    <Avatar alt="User Name" src="img" sx={{ bgcolor: "#0693E3" }} />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={
                    <Typography variant="body1" className="postTitle">User Name</Typography>
                }
                subheader="Post Time & Date"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share" onClick={handleOpen}>
                    <ShareIcon />
                </IconButton>
            </CardActions>


            {/* Modal Start */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Share this Post
                    </Typography>
                    <Box>
                        <EmailShareButton url="" subject="Sharing Post via Email" body="Iftakher Hossen posted on Micro Blogsite, url" separator=" " className="shareBtn">
                            <EmailIcon size={30} round={true}  />
                        </EmailShareButton>
                        <FacebookShareButton url="" title="Iftakher Hossen posted on Micro Blogsite" hashtags={hashtags} className="shareBtn">
                            <FacebookIcon size={30} round={true}  />
                        </FacebookShareButton>
                        <TelegramShareButton url="" title="Iftakher Hossen posted on Micro Blogsite" className="shareBtn">
                            <TelegramIcon size={30} round={true}  />
                        </TelegramShareButton>
                        <TwitterShareButton url="" title="Iftakher Hossen posted on Micro Blogsite" via="Micro Blogsite" hashtags={hashtags} related={related} className="shareBtn">
                            <TwitterIcon size={30} round={true}  />
                        </TwitterShareButton>
                        <WhatsappShareButton url="" separator=" " title="Iftakher Hossen posted on Micro Blogsite" className="shareBtn">
                            <WhatsappIcon size={30} round={true}  />
                        </WhatsappShareButton>
                    </Box>
                </Box>
            </Modal>
            {/* Modal End */}
        </Card>
    );
};

export default FeedPost;