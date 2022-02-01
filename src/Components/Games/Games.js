import { Box, Button, Container } from '@mui/material';
import React from 'react';
import gameBanner1 from '../../tic-tac-toe.png';
import gameBanner2 from '../../jump-over.png';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const Games = () => {
    return (
        <Box className="userInfoGrid">
            <Container>
                <h2>Play Games</h2>
                <Box className="gameWrapper">
                    <Box className="gameBanner">
                        <img src={gameBanner1} alt="Tic Tac Toe" className="hoverBanner" />
                        <Box className="hoverMiddle">
                            <Button variant="contained" className="hoverBtn">
                                <a href="https://simple-responsive-tic-tac-toe.netlify.app/" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>Play <PlayArrowIcon /></a>
                            </Button>
                        </Box>
                    </Box>
                    <Box className="gameBanner">
                        <img src={gameBanner2} alt="Jump Over" className="hoverBanner" />
                        <Box className="hoverMiddle">
                            <Button variant="contained" className="hoverBtn">
                                <a href="https://jump-over-iftakher.netlify.app/" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>Play <PlayArrowIcon /></a>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Games;