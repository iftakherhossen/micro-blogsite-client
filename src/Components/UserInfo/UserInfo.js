import { Box, Button, Container, Grid, List } from '@mui/material';
import React, { useEffect, useState } from 'react';
import User from '../User/User';
import gameBanner1 from '../../tic-tac-toe.png';
import gameBanner2 from '../../jump-over.png';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const UserInfo = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://shrouded-eyrie-37217.herokuapp.com/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    return (
        <Grid item xs={12} sm={12} md={3} className="userInfoGridCard" data-aos="fade-left">
            <Box className="userInfoGrid">
                <Box className="wrapper" sx={{ p: 0 }}>
                    <List className="listWrapper">
                        {
                            users.map(folk => <User
                                key={folk._id}
                                folk={folk}
                            />)
                        }
                    </List>
                </Box>
            </Box>
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
        </Grid>
    );
};

export default UserInfo;