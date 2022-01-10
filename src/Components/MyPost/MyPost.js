import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const MyPost = () => {
    return (
        <Paper elevation={3} className="myPostPaper">
            <Box>
                <Typography variant="body2">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                </Typography>
            </Box>
            <Box className="myPostDate">
                <Typography variant="caption" sx={{ color: '#607d8b'}}>10/01/2022</Typography>
            </Box>
        </Paper>
    );
};

export default MyPost;