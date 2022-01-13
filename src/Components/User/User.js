import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const User = ({ folk }) => {
    const { _id, displayName, photoURL } = folk;
    const link = `/users/${_id}:${displayName}`;
    const updatedLink = link.replace(/ /g, '');

    return (
        <Link to={updatedLink} className="link">
            <ListItem className="listItem userProfile" sx={{ p: 1}}>
                <ListItemAvatar sx={{p: 0, m: 0}}>
                    <Avatar alt="User Avatar" src={photoURL} />
                </ListItemAvatar>
                <ListItemText sx={{p: 0, m: 0}}>
                    <Typography sx={{fontSize: '0.9em', fontWeight: 600}}>{displayName}</Typography>
                </ListItemText>
            </ListItem>
        </Link>
    );
};

export default User;