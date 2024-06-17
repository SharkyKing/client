import { useCallback, useState } from 'react';
import peer from '../ConferencingHelpers/PeerService.js';



export const UserSideHandler = (socket, ServerEmits,
        setServerConnected,
        setRemoteSocketID,
        setCurrentUserVideo,
        setOtherUserVideo
) => {
    const handleUserSuccessConnect = useCallback(({ email, roomID }) => {
        handleGetCurrentUserVideo();
    }, []);

    const handleParticipantJoined = useCallback(({ email, remoteSocketID }) => {
        if (remoteSocketID !== socket.id && remoteSocketID && socket.id) {
            setRemoteSocketID(remoteSocketID);
        }
    }, [socket.id]);

    const handleGetCurrentUserVideo = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });
        setCurrentUserVideo(stream);
    }, []);

    const handleOffer = async (remoteSocketID) => {
        const offer = await peer.getOffer();
        console.log(remoteSocketID)
        socket.emit(ServerEmits.USERREADY, { to: remoteSocketID, offer });
    };

    const handleGuestCallAccepted = useCallback(async ({ from, answer }, currentUserVideo) => {
        await peer.setLocalDescription(answer)
        for (const track of currentUserVideo.getTracks()){
            peer.peer.addTrack(track, currentUserVideo);
        }
    }, [socket]);

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

    const handleManualOffer = (remoteSocketID) => {
        if (remoteSocketID) {
            handleOffer(remoteSocketID);
        } else {
            console.warn("No remote user connected.");
        }
    };


    return {
        handleUserSuccessConnect,
        handleParticipantJoined,
        handleGetCurrentUserVideo,
        handleGuestCallAccepted,
        handleNegotiationNeeded,
        handlePeerNegoNeeded,
        handleManualOffer,
        handlePeerNegoFinal
    };
}

