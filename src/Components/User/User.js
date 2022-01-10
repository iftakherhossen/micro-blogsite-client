import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React from 'react';

const User = () => {
    return (
        <ListItem dense>
            <ListItemAvatar>
                <Avatar alt="User Avatar" src="avatar" />
            </ListItemAvatar>
            <ListItemText>
                <Typography>User Name</Typography>
            </ListItemText>
        </ListItem>
    );
};

export default User;