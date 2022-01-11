import { Chip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const HashTags = () => {
    return (
        <Box className="userInfoGrid">
            <Box sx={{ px: 1 }}>
                <Typography variant="subtitle1">Popular Hashtags <span className="coloredTxt">#</span></Typography>
            </Box>
            <Box sx={{ p: 1 }}>
                <Chip
                    label="#newonbloom"
                    component="a"
                    href="/popular-posts/newonbloom"
                    variant="outlined"
                    clickable sx={{ margin: '4px 3px', border: '1px solid #0693E3' }}
                />
                <Chip
                    label="#trending"
                    component="a"
                    href="/popular-posts/trending"
                    variant="outlined"
                    clickable sx={{ margin: '4px 3px', border: '1px solid #0693E3' }}
                />
                <Chip
                    label="#news"
                    component="a"
                    href="/popular-posts/news"
                    variant="outlined"
                    clickable sx={{ margin: '4px 3px', border: '1px solid #0693E3' }}
                />
                <Chip
                    label="#motivation"
                    component="a"
                    href="/popular-posts/motivation"
                    variant="outlined"
                    clickable sx={{ margin: '4px 3px', border: '1px solid #0693E3' }}
                />                
                <Chip
                    label="#covid19"
                    component="a"
                    href="/popular-posts/covid19"
                    variant="outlined"
                    clickable sx={{ margin: '4px 3px', border: '1px solid #0693E3' }}
                />
                <Chip
                    label="#vaccine"
                    component="a"
                    href="/popular-posts/vaccine"
                    variant="outlined"
                    clickable sx={{ margin: '4px 3px', border: '1px solid #0693E3' }}
                />
                <Chip
                    label="#sports"
                    component="a"
                    href="/popular-posts/sports"
                    variant="outlined"
                    clickable sx={{ margin: '4px 3px', border: '1px solid #0693E3' }}
                />
                <Chip
                    label="#memes"
                    component="a"
                    href="/popular-posts/memes"
                    variant="outlined"
                    clickable sx={{ margin: '4px 3px', border: '1px solid #0693E3' }}
                />
                <Chip
                    label="#newyear2022"
                    component="a"
                    href="/popular-posts/newyear2022"
                    variant="outlined"
                    clickable sx={{ margin: '4px 3px', border: '1px solid #0693E3' }}
                />
            </Box>
        </Box>
    );
};

export default HashTags;