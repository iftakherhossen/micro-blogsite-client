const Styles = () => {
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 260,
        bgcolor: '#E6ECF0',
        boxShadow: 24,
        p: 3,
        textAlign: 'center'
    };

    const editModalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 350,
        bgcolor: '#E6ECF0',
        boxShadow: 24,
        p: 3
    };

    const moreBtnPortalStyle = {
        position: 'absolute',
        top: 30,
        right: 115,
        zIndex: 1,
        p: 1,
        width: '100%',
        bgcolor: 'transparent',
        display: 'flex',
        justifyContent: 'flex-start'
    };

    const imgModalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 200,
        height: 200,
        boxShadow: 24,
        border: 'none',
        outline: 'none'
    };

    const contactModalStyle = {
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

    return {
        modalStyle,
        editModalStyle,
        moreBtnPortalStyle,
        imgModalStyle,
        contactModalStyle,
    }
}

export default Styles;