import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    return (
        <Container>
            <Grid container className="footerSection" data-aos="fade-down">
                <Grid item xs={12} sm={2} md={1} className="smIconHolder">
                    <InstagramIcon className="smIcon" />
                    <TwitterIcon className="smIcon" />
                    <LinkedInIcon className="smIcon" />
                </Grid>
                <Grid item xs={12} sm={10} md={11} className="txtHolder">
                    <Typography className="fwBold">© 2021, All rights reserved, Developed By  <span className="developer"><a href="https://iftakher-hossen.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'white' }}>Iftakher Hossen</a></span></Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Footer;