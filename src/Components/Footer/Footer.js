import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
    return (
        <Container>
            <Grid container className="footerSection">
                <Grid item xs={12} sm={2} md={1} className="smIconHolder">
                    <a href="https://twitter.com/iftakher_hossen" target="_blank" rel="noopener noreferrer" style={{ color: '#aaa' }}><TwitterIcon className="smIcon" /></a>
                    <a href="https://www.linkedin.com/in/iftakher-hossen/" target="_blank" rel="noopener noreferrer" style={{ color: '#aaa' }}><LinkedInIcon className="smIcon" /></a>
                    <a href="https://github.com/iftakherhossen" target="_blank" rel="noopener noreferrer" style={{ color: '#aaa' }}><GitHubIcon className="smIcon" /></a>
                </Grid>
                <Grid item xs={12} sm={10} md={11} className="txtHolder">
                    <Typography className="fwBold">© 2021, All rights reserved, Developed By  <span className="developer"><a href="https://iftakher-hossen.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'white' }}>Iftakher Hossen</a></span></Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Footer;