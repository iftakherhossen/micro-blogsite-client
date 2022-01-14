import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const User = ({ folk }) => {
    const { displayName, photoURL, email } = folk;
    const link = `/users/${displayName}`;
    const updatedLink = link.replace(/ /g, '');
    const navigate = useNavigate();

    const handleUserProfile = (data) => {
        navigate(updatedLink, { state: data });
    }

    const [usersPost, setUsersPost] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/posts/${email}`)
            .then(res => res.json())
            .then(data => setUsersPost(data))
    }, [email])

    return (
        <ListItem className="listItem userProfile"sx={{ px: 1 }} onClick={() => handleUserProfile(folk)}>
            <ListItemAvatar sx={{my: '1px', p: 0}}>
                <Avatar alt="User Avatar" src={photoURL} />
            </ListItemAvatar>
            <ListItemText sx={{ my: '1px', p: 0 }}>
                <Typography sx={{ fontSize: '0.9em', fontWeight: 600, mb: '-4px' }}>
                    {displayName}
                </Typography>
                {email && <Typography variant="caption">
                    Total Post - {usersPost.length}
                </Typography>}
            </ListItemText>
        </ListItem>
    );
};

export default User;