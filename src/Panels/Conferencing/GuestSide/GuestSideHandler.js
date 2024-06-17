import { useCallback, useState } from 'react';
import { auth } from '../../../Secure/firebase.js';
import peer from '../ConferencingHelpers/PeerService.js';

export const GuestSideHandler = 
(socket, ServerEmits,GuestActivePages,
        setServerConnected,
        setRemoteSocketID,
        setCurrentUserVideo,
        setGuestActivePage,
        setRoomID, 
        setEmail,
        setAnswer
) => {
    
    const handleRoomIDChange = (event) => {
        setRoomID(event.target.value);
    };

    const handleConnect = useCallback((email, roomID) => {
        socket.emit(ServerEmits.GUESTROOMJOIN, {email, roomID});
    }, [socket]);
    

    const handleGuestSuccessConnect = useCallback((data)=>{
        setGuestActivePage(GuestActivePages.PREPARE)
        handleGetCurrentUserVideo()
    },[])

    const handleGetCurrentUserVideo = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });
        setCurrentUserVideo(stream);
    }, []);

    const handleUserPrepared = useCallback(async ({from, offer}) => {
        setRemoteSocketID(from);
        const ans = await peer.getAnswer(offer);
        setAnswer(ans);
    },[])

    const handleNegotiationNeeded = useCallback(async (remoteSocketID) => {
        const offer = await peer.getOffer();
        socket.emit(ServerEmits.PEERNEGONEEDED, {offer, to: remoteSocketID})
    }, [socket])

    const handlePeerNegoNeeded = useCallback(async ({from, offer}) => {
        const ans = peer.getAnswer(offer);
        socket.emit(ServerEmits.PEERNEGODONE, {to:from, ans});
    },[])

    const handlePeerNegoFinal = useCallback(async ({ans}) => {
        await peer.setLocalDescription(ans)
    },[])


    const directConnect = useCallback(async (remoteSocketID, answer) => {
        console.log("DIRECT CONNECT", answer)
        if(answer){
            socket.emit(ServerEmits.GUESTCALLACCEPTED, {to: remoteSocketID, answer })
            setGuestActivePage(GuestActivePages.CONNECT);
        }
    }, [])

    return {
        handleGuestSuccessConnect,
        handleConnect,
        handleGetCurrentUserVideo,
        handleRoomIDChange,
        handleUserPrepared,
        handleNegotiationNeeded,
        handlePeerNegoNeeded,
        handlePeerNegoFinal,
        directConnect
    };
}

