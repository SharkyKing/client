import React, { useState, useCallback, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Textbox, Button } from '../../../Components/imports';
import './UserSide.css'
import { useSocket } from '../ConferencingHelpers/SocketProvider';
import peer from '../ConferencingHelpers/PeerService.js'
import { UserSideHandler } from './UserSideHandler.js';
import { auth } from '../../../Secure/firebase.js';

const ServerEmits = {
    USERROOMJOIN: "user:room:join",
    USERREADY: "user:ready",
    PEERNEGONEEDED: "peer:nego:needed",
    PEERNEGODONE: "peer:nego:done"
}

const ServerOnListeners = {
    USERROOMJOINSUCCESS: "user:room:joinsuccess",
    PARTICIPANTJOINED: "participant:joined",
    GUESTCALLPREPARED: "guestcall:prepared",
    PEERNEGONEEDED: "peer:nego:needed",
    PEERNEGOFINAL: "peer:nego:final",
}

function UserSide() {
    const socket = useSocket();

    const [serverConnected, setServerConnected] = useState(false);
    const [remoteSocketID, setRemoteSocketID] = useState(null);

    const [currentUserVideo, setCurrentUserVideo] = useState(null);
    const [otherUserVideo, setOtherUserVideo] = useState(null);
    
    const roomID = "123456";
    const email = auth.currentUser.email;

    const { 
        handleUserSuccessConnect, 
        handleParticipantJoined, 
        handleGuestCallAccepted,
        handleNegotiationNeeded,
        handlePeerNegoNeeded,
        handleManualOffer,
        handlePeerNegoFinal,
    } 
        
    = UserSideHandler(
        socket, ServerEmits,
        setServerConnected,
        setRemoteSocketID,
        setCurrentUserVideo,
        setOtherUserVideo
    );

    const handleUserSuccessConnectWrapper = (data) => {
        handleUserSuccessConnect(data);
    };

    const handleParticipantJoinedWrapper = (data) => {
        handleParticipantJoined(data);
    };

    const handleGuestCallAcceptedWrapper = (data) => {
        handleGuestCallAccepted(data, currentUserVideo);
    };

    const handlePeerNegoNeededWrapper = () => {
        handlePeerNegoNeeded(remoteSocketID);
    };

    const handlePeerNegoFinalWrapper = (data) => {
        handlePeerNegoFinal(data);
    };

    const handleNegotiationNeededWrapper = () => {
        handleNegotiationNeeded(remoteSocketID);
    };

    useEffect(() => {
        
        socket.on(ServerOnListeners.USERROOMJOINSUCCESS, handleUserSuccessConnectWrapper);
        socket.on(ServerOnListeners.PARTICIPANTJOINED, handleParticipantJoinedWrapper);
        socket.on(ServerOnListeners.GUESTCALLPREPARED, handleGuestCallAcceptedWrapper)
        socket.on(ServerOnListeners.PEERNEGONEEDED, handlePeerNegoNeededWrapper);
        socket.on(ServerOnListeners.PEERNEGOFINAL, handlePeerNegoFinalWrapper);

        if (!serverConnected) {
            socket.emit(ServerEmits.USERROOMJOIN, { email, roomID });
            setServerConnected(true);
        }

        return () => {
            socket.off(ServerOnListeners.USERROOMJOINSUCCESS, handleUserSuccessConnectWrapper);
            socket.off(ServerOnListeners.PARTICIPANTJOINED, handleParticipantJoinedWrapper);
            socket.off(ServerOnListeners.GUESTCALLPREPARED, handleGuestCallAcceptedWrapper);
            socket.off(ServerOnListeners.PEERNEGONEEDED, handlePeerNegoNeededWrapper);
            socket.off(ServerOnListeners.PEERNEGOFINAL, handlePeerNegoFinalWrapper);
        };
    }, [
        email, socket, roomID, 
        handleUserSuccessConnectWrapper, handleParticipantJoinedWrapper,handleGuestCallAcceptedWrapper,handlePeerNegoNeededWrapper,handlePeerNegoFinalWrapper
    ]);
    
    

    useEffect(() => {
        peer.peer.addEventListener("track", async (ev) => {
            const remoteStream = ev.streams;
            setOtherUserVideo(remoteStream[0]);
        })

        peer.peer.addEventListener("negotiationneeded", handleNegotiationNeededWrapper);
        return () => {
            peer.peer.removeEventListener("negotiationneeded", handleNegotiationNeededWrapper);
        }
    }, [handleNegotiationNeededWrapper]);

    return (
        <>
        <div className='userjoin-container'>
            <div className='userjoin-video'>
                <div className='userjoin-videocontrols'>
                    <h4>{remoteSocketID ? "User connected" : "Room empty"}</h4>
                    {
                        remoteSocketID && <Button onClick={() => handleManualOffer(remoteSocketID)}>Pradėti pokalbį</Button>
                    }
                    
                </div>
                
                <div className="userjoin-videplayer-wrapper" >
                    {
                        otherUserVideo && <ReactPlayer width="95vw" height="80vh" className='user-guestjoin-videplayer' playing muted url={otherUserVideo}/>
                    }
                    {
                        currentUserVideo && <ReactPlayer width="20vw" height="20vh" className='user-userjoin-videplayer' playing muted url={currentUserVideo}/>
                    }
                </div>
            </div>
        </div>
        </>
    );

}

export default UserSide;
