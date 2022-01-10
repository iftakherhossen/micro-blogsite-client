import { Avatar, Chip, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const WritePost = () => {
    return (
        <Grid item xs={12} sm={12} md={3.5} className="userInfoGridCard">
            <Box className="userInfoGrid">
                <Box className="wrapper">
                    <Box className="alignCenter">
                        <Avatar alt="User Name" src="images" className="avatar" />
                    </Box>
                    <Box className="userName">
                        <Typography variant="h6">User Name</Typography>
                    </Box>
                    <Box className="multilineTextField">
                        <TextField
                            id="standard-multiline-static"
                            multiline
                            rows={6}
                            sx={{ width: '100%' }}
                            inputProps={{ maxLength: 250 }}
                        />
                    </Box>
                    <Box className="writePostFooter">
                        <Typography sx={{ color: 'red', fontSize: '0.8em' }}>Max Length 250 Characters *</Typography>
                        <button type="button" className="postBtn">Post</button>
                    </Box>
                </Box>
            </Box>
            <Box className="userInfoGrid">
                <Box sx={{ px: 1 }}>
                    <Typography variant="subtitle1">Popular Hashtags <span className="coloredTxt">#</span></Typography>
                </Box>
                <Box sx={{ p: 1 }}>
                    <Chip label="#trending" variant="outlined" sx={{ margin: '4px 2px', border: '1px solid #0693E3' }} />
                    <Chip label="#news" variant="outlined" sx={{ margin: '4px 2px', border: '1px solid #0693E3' }} />
                    <Chip label="#covid19" variant="outlined" sx={{ margin: '4px 2px', border: '1px solid #0693E3' }} />
                    <Chip label="#vaccine" variant="outlined" sx={{ margin: '4px 2px', border: '1px solid #0693E3' }} />
                    <Chip label="#sports" variant="outlined" sx={{ margin: '4px 2px', border: '1px solid #0693E3' }} />
                    <Chip label="#memes" variant="outlined" sx={{ margin: '4px 2px', border: '1px solid #0693E3' }} />
                    <Chip label="#happynewyear2022" variant="outlined" sx={{ margin: '4px 2px', border: '1px solid #0693E3' }} />
                </Box>
            </Box>
        </Grid>
    );
};

export default WritePost;