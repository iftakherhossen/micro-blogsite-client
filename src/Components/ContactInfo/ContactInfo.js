import { Alert, Button, IconButton, Modal, Snackbar, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { init } from '@emailjs/browser';
init("user_E3AjQo3AWXplLPqSzFb2c");

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    textAlign: 'center'
};

const styleSubs = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    textAlign: 'center'
};

const ContactInfo = () => {
    const [openContact, setOpenContact] = useState(false);
    const handleContactOpen = () => setOpenContact(true);
    const handleContactClose = () => setOpenContact(false);

    const [openSubscribe, setOpenSubscribe] = useState(false);
    const handleSubscribeOpen = () => setOpenSubscribe(true);
    const handleSubscribeClose = () => setOpenSubscribe(false);

    const form = useRef();

    const [success, setSuccess] = useState(false);
    const [successSubscribe, setSuccessSubscribe] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openSubsSnackbar, setOpenSubsSnackbar] = useState(false);


    const { register, handleSubmit, reset } = useForm();

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

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm("service_s4i7iut", "template_3ymg1lw", form.current, "user_E3AjQo3AWXplLPqSzFb2c")
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset();

        setSuccess(true);
        handleContactClose();
        openSnackbar(true);
    };

    const subscribe = data => {
        const email = data.email;

        fetch('https://shrouded-eyrie-37217.herokuapp.com/subscription', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(email)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    setSuccessSubscribe(true);
                    setOpenSubsSnackbar(true);
                    reset();
                }
            })
    }

    return (
        <Box className="userInfoGrid">
            <Box sx={{ p: 1, textAlign: 'center' }}>
                <button className="contactBtn" onClick={handleContactOpen}>Contact</button>
                <button className="contactBtn" onClick={handleSubscribeOpen}>Subscribe</button>
            </Box>


            {/* Contact Modal */}
            <Modal
                open={openContact}
                onClose={handleContactClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ textAlign: 'center', mb: 1 }}>
                        Contact with us!
                    </Typography>
                    <Box sx={{ px: 2 }}>
                        <form ref={form} onSubmit={sendEmail}>
                            <TextField
                                id="standard-basic"
                                label="Name"
                                name="name"
                                required
                                variant="standard"
                                autoComplete="off"
                                sx={{ width: 1, mb: 2 }}
                            />
                            <TextField
                                id="standard-basic"
                                label="Email"
                                required
                                name="email"
                                variant="standard"
                                autoComplete="off"
                                sx={{ width: 1, mb: 2 }}
                            />
                            <TextField
                                id="standard-basic"
                                label="Subject"
                                name="subject"
                                required
                                variant="standard"
                                autoComplete="off"
                                sx={{ width: 1, mb: 2 }}
                            />
                            <TextField
                                id="standard-multiline-static"
                                label="Message"
                                multiline
                                name="message"
                                required
                                rows={4}
                                variant="standard"
                                autoComplete="off"
                                sx={{ width: 1, mb: 3 }}
                            />
                            <Button variant="contained" type="submit" sx={{ py: '5px', fontSize: '1em' }}>Send &nbsp; <SendIcon sx={{ fontSize: '16.5px' }} /></Button>
                        </form>
                    </Box>
                </Box>
            </Modal>

            {success && <Snackbar open={openSnackbar} autoHideDuration={2000} action={action}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Message send successfully!
                </Alert>
            </Snackbar>}

            {/* Subscribe Modal */}
            <Modal
                open={openSubscribe}
                onClose={handleSubscribeClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleSubs}>
                    <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ textAlign: 'center', mb: 2 }}>
                        Subscribe to get News & Updates!
                    </Typography>
                    <Box sx={{ px: 2 }}>
                        <form onSubmit={handleSubmit(subscribe)}>
                            <TextField
                                id="standard-basic"
                                label="Email"
                                name="email"
                                variant="standard"
                                required
                                sx={{ width: 1, mb: 3 }}
                                {...register("email", { required: true })}
                            />
                            <Button type="submit" variant="contained" sx={{ py: '5px', px: 2 }}>Subscribe</Button>
                        </form>
                    </Box>
                </Box>
            </Modal>

            {successSubscribe && <Snackbar open={openSubsSnackbar} autoHideDuration={1000} action={action}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Subscription added successfully!
                </Alert>
            </Snackbar>}
        </Box>
    );
};

export default ContactInfo;