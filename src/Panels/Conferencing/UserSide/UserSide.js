import React, { useState, useCallback, useEffect } from 'react';
import { Textbox, Button } from '../../../Components/imports';
import './UserSide.css'
import { auth } from '../../../Secure/firebase.js';
import { useSocket } from '../ConferencingHelpers/SocketProvider';

function UserSide() {
    const socket = useSocket();

    const [serverConnected, setServerConnected] = useState(false);
    

    const roomID = (123456);
    const email = (auth.currentUser.email);

    

    const handleGuestSuccessConnect = useCallback((data)=>{
        console.log("DATA BACK FROM SEVER",data)
    },[])

    const handleParticipantJoined = useCallback(({email, remoteSocketID})=>{
        console.log("USER JOINED -","MY SOCKET ID - ", socket.id, "GUEST SOCKET ID - ", remoteSocketID)
        if(remoteSocketID != socket.id && remoteSocketID && socket.id){
            console.log("USER JOINED -","MY SOCKET ID - ", socket.id, "GUEST SOCKET ID - ", remoteSocketID)
        }
    },[socket.id])

    useEffect(() => {
        if(!serverConnected){
            console.log("Connecting to room ID:", roomID);
            socket.emit('user:room:join', {email, roomID});
            setServerConnected(true);
        }
    }, [email, serverConnected, socket])

    useEffect(() =>{
        socket.on("user:room:joinsuccess", handleGuestSuccessConnect);
        return () => {
            socket.off("user:room:joinsuccess",handleGuestSuccessConnect);
        }
    }, [socket, handleGuestSuccessConnect]);

    useEffect(() =>{
        socket.on("participant:joined", handleParticipantJoined)
        return () => {
            socket.off("participant:joined",handleParticipantJoined);
        }
    }, [socket, handleParticipantJoined]);

    return (
        <>
        <div className='userjoin-container'>
            <h1>Prisijungimas vartotojui</h1>
        </div>
        </>
    );

}

export default UserSide;
