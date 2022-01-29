import { Alert, Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, Snackbar, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';

const User = ({ folk }) => {
    const { _id, displayName, photoURL, email } = folk;
    const link = `/users/${displayName}`;
    const updatedLink = link.replace(/ /g, '');
    const navigate = useNavigate();
    const { user, admin } = useAuth();
    const [success, setSuccess] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [users, setUsers] = useState([]);
    const [usersPost, setUsersPost] = useState([]);

    const handleUserProfile = (data) => {
        navigate(updatedLink, { state: data });
    }

    useEffect(() => {
        fetch(`https://shrouded-eyrie-37217.herokuapp.com/posts/${email}`)
            .then(res => res.json())
            .then(data => setUsersPost(data))
    }, [email]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

    const handleDelete = (id) => {
        const confirm = window.confirm('Are you sure? You wanna delete this overridden user!');

        if (confirm === true) {
            fetch(`https://shrouded-eyrie-37217.herokuapp.com/user/${_id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        setSuccess(true);
                        setOpenSnackbar(true);
                        const remaining = users.filter(u => u._id !== id);
                        setUsers(remaining);
                        window.location.reload();
                    }
                })
        }
        else {
            window.location.reload();
        }
    }

    return (
        <Box className={"listItem userProfile " + (user?.email === email && "profileBorder")} sx={{ px: 1, display: 'flex', overflow: 'none' }}>
            <ListItem onClick={() => handleUserProfile(folk)}>
                <ListItemAvatar sx={{ my: '1px', p: 0 }}>
                    <Avatar alt={displayName} src={photoURL} />
                </ListItemAvatar>
                <ListItemText sx={{ my: '1px', p: 0 }}>
                    <Typography sx={{ fontSize: '0.9em', fontWeight: 600, mb: '-4px', color: 'black' }} className={(user?.email === email && "coloredTxt")}>
                        {displayName}
                    </Typography>
                    {email && <Typography variant="caption" sx={{ color: 'black' }}>
                        Total Post - {usersPost?.length}
                    </Typography>}
                </ListItemText>
            </ListItem>
            <div className="overlay">
                {
                    admin && <Tooltip title="Delete User">
                        <IconButton aria-label="delete-post" onClick={() => handleDelete(_id)}>
                            <DeleteIcon className="redHover" />
                        </IconButton>
                    </Tooltip>
                }
            </div>
            {success && <Snackbar open={openSnackbar} autoHideDuration={2000} action={action}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Overridden User deleted successfully!
                </Alert>
            </Snackbar>}
        </Box>
    );
};

export default User;