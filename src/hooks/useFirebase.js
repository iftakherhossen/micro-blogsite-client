import { useState, useEffect } from 'react';
import { getAuth, signOut, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import initializeAuthentication from '../Firebase/firebase.init';

// initialize firebase app
initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [admin, setAdmin] = useState(true);
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    // google sign in
    const signInWithGoogle = () => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                saveUser(user.email, user.displayName, user.photoURL);
                setAuthError("");
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }; 

    //observe user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
            else {
                setUser({});
            }
            setIsLoading(false);
        });
        return () => unsubscribe
    }, [auth])

    const logOut = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => { })
            .catch((error) => { })
            .finally(() => setIsLoading(false));
        window.location.reload();
    }

    useEffect(() => {
        fetch(`https://shrouded-eyrie-37217.herokuapp.com/users/${user.email}/admin`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => setAdmin(data.admin));
    }, [user.email]);

    const saveUser = (email, displayName, photoURL) => {
        const user = { email, displayName, photoURL };

        fetch('https://shrouded-eyrie-37217.herokuapp.com/users', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    }

    return {
        signInWithGoogle,
        logOut,
        user,
        admin,
        isLoading,
        authError
    }
}

export default useFirebase;