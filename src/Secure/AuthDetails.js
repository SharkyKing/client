import React, { useState, useCallback, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const useSignOut = () => {
    const handleSignOut = () => {
        signOut(auth).then(() => {
            console.log('Signed out')
        }).catch((error) => {
            console.log(error)
        })
    };

    return handleSignOut;
}

export const AuthDetails = ({ setIsLoggedIn }) => {
    const [authUser, setAuthUser] = useState(null)

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if(user){
                setAuthUser(user)
                setIsLoggedIn(true);
            }
            else{
                setAuthUser(null);
                setIsLoggedIn(false);
            }
        })

        return () => {
            listen();
        }
    }, [])

    return (
        <div></div>
    )
}