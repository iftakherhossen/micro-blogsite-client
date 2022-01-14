import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const User = ({ folk }) => {
    const { displayName, photoURL } = folk;
    const link = `/users/${displayName}`;
    const updatedLink = link.replace(/ /g, '');
    const navigate = useNavigate();

    const handleUserProfile = (data) => {
        navigate(updatedLink, {state: data});
    }

    return (
        <ListItem className="listItem userProfile" sx={{ p: 1 }} onClick={() => handleUserProfile(folk)}>
            <ListItemAvatar sx={{ p: 0, m: 0 }}>
                <Avatar alt="User Avatar" src={photoURL} />
            </ListItemAvatar>
            <ListItemText sx={{ p: 0, m: 0 }}>
                <Typography sx={{ fontSize: '0.9em', fontWeight: 600 }}>{displayName}</Typography>
            </ListItemText>
        </ListItem>
    );
};

export default User;