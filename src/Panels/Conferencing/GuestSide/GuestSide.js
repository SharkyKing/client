import React, { useState, useCallback, useEffect } from 'react';
import { Textbox, Button } from '../../../Components/imports';
import './GuestSide.css'
import GuestSidePrepare from './GuestSidePrepare/GuestSidePrepare';
import GuestSideConnect from './GuestSideConnect/GuestSideConnect.js';
import { GuestSideHandler } from './GuestSideHandler';
import { useSocket } from '../ConferencingHelpers/SocketProvider';
import peer from '../ConferencingHelpers/PeerService.js'

const GuestActivePages = {
    LOBBY: 0,
    PREPARE: 1,
    CONNECT: 2,
};

const ServerEmits = {
    GUESTROOMJOIN: "guest:room:join",
    GUESTCALLACCEPTED: "guestcall:accepted",
    PEERNEGODONE: "peer:nego:done",
    PEERNEGONEEDED: "peer:nego:needed"
}

const ServerOnListeners = {
    GUESTROOMJOINSUCCESS: "guest:room:joinsuccess",
    USERPREPARED: "user:prepared",
    PEERNEGONEEDED: "peer:nego:needed",
    PEERNEGOFINAL: "peer:nego:final",
}

function GuestSide() {
    const socket = useSocket();
    
    const [roomID, setRoomID] = useState('')
    const [email, setEmail] = useState('test@mail.com')

    const [remoteSocketID, setRemoteSocketID] = useState(null);
    const [currentUserVideo, setCurrentUserVideo] = useState(null);
    const [otherUserVideo, setOtherUserVideo] = useState(null);

    const [serverConnected, setServerConnected] = useState(false);

    const [answer, setAnswer] = useState(null)

    const [GuestActivePage, setGuestActivePage] = useState(GuestActivePages.LOBBY);

    const { 
        handleGuestSuccessConnect,
        handleConnect,
        handleRoomIDChange,
        handleUserPrepared,
        handlePeerNegoNeeded,
        handleNegotiationNeeded,
        handlePeerNegoFinal,
        directConnect
    } = GuestSideHandler(
        socket, ServerEmits,GuestActivePages,
            setServerConnected,
            setRemoteSocketID,
            setCurrentUserVideo,
            setGuestActivePage,
            setRoomID,
            setEmail,
            setAnswer
        );

    const handleGuestSuccessConnectWrapper = (data) => {
        handleGuestSuccessConnect(data);
    };

    const handleUserPreparedWrapper = (data) => {
        handleUserPrepared(data);
    };

    const handlePeerNegoNeededWrapper = (data) => {
        handlePeerNegoNeeded(data);
    };

    const handlePeerNegoFinalWrapper = (data) => {
        handlePeerNegoFinal(data);
    };

    const handleConnectWrapper = (event) => {
        event.preventDefault();
        handleConnect(email, roomID);
    };

    const handleNegotiationNeededWrapper = () => {
        handleNegotiationNeeded(remoteSocketID);
    };

    useEffect(() =>{
        socket.on(ServerOnListeners.GUESTROOMJOINSUCCESS, handleGuestSuccessConnectWrapper);
        socket.on(ServerOnListeners.USERPREPARED, handleUserPreparedWrapper);
        socket.on(ServerOnListeners.PEERNEGONEEDED, handlePeerNegoNeededWrapper);
        socket.on(ServerOnListeners.PEERNEGOFINAL, handlePeerNegoFinalWrapper);
        return () => {
            socket.off(ServerOnListeners.GUESTROOMJOINSUCCESS,handleGuestSuccessConnectWrapper);
            socket.off(ServerOnListeners.USERPREPARED, handleUserPreparedWrapper);
            socket.off(ServerOnListeners.PEERNEGONEEDED, handlePeerNegoNeededWrapper);
            socket.off(ServerOnListeners.PEERNEGOFINAL, handlePeerNegoFinalWrapper);
        }
    }, [socket, handleGuestSuccessConnectWrapper,handleUserPreparedWrapper,handlePeerNegoNeededWrapper,handlePeerNegoFinalWrapper]);

    


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
        <div className='guestjoin-container'>
            
            {GuestActivePage === GuestActivePages.LOBBY && (
                <>
                    <h1>Prisijungimas</h1>
                    <div className='guestjoin'>
                        <Textbox type="text" placeholder="Prisijungimo kodas" onChange={handleRoomIDChange} value={roomID}/>
                        <Button onClick={handleConnectWrapper}>Prisijungti</Button>
                    </div>
                </>
            )}
            {GuestActivePage === GuestActivePages.PREPARE && (
                <>
                    <GuestSidePrepare 
                        socket={socket}
                        currentUserVideo={currentUserVideo}
                        directConnect={() => directConnect(remoteSocketID, answer)}
                        remoteSocketID={remoteSocketID}
                    />
                </>
            )}
            {GuestActivePage === GuestActivePages.CONNECT && (
                <>
                    <GuestSideConnect 
                        currentUserVideo={currentUserVideo}
                        otherUserVideo={otherUserVideo}
                    />
                </>
            )}
        </div>
        </>
    );

}

export default GuestSide;
