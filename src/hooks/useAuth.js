import React, { useContext, useState, useEffect } from "react";
import auth from "../firebase";
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut as firebaseSignOut,
    sendPasswordResetEmail,
    updateProfile as firebaseUpdateProfile,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [inAuth, setInAuth] = useState(true);

    const updateDisplayName = async (name) => {
        try {
            firebaseUpdateProfile(auth.currentUser, {
                displayName: name,
                photoURL: "",
            });
        } catch (err) {
            console.log(err);
        }
    };

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signOut = () => {
        return firebaseSignOut(auth);
    };

    const passwordReset = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    async function setNick() {
        if (currentUser?.displayName === null) {
            let name = String(currentUser.email).split("@");
            await updateDisplayName(name[0]);
        }
    }

    const props = {
        currentUser,
        signIn,
        signOut,
        passwordReset,
        updateDisplayName,
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user ? user : null);
            setInAuth(false);
            await setNick();
        });
        return () => {
            unsubscribe();
        };
    });

    return (
        <AuthContext.Provider value={props}>
            {!inAuth && children}
        </AuthContext.Provider>
    );
}
