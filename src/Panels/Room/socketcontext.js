import React, {createContext, useState, useRef, useEffect, Children} from "react";
import {io} from 'socket.io-client'
import Peer from 'simple-peer'
import SERVER_URL from '../../Additional/server.js';

const SocketContext = createContext();
const socket = io(SERVER_URL);

const ContextProvider = ({children}) => 
{
    const [stream, setStream] = useState(null);
    const [user, setUser] = useState('');

    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [call, setCall] = useState({});
    const [name, setName] = useState('');

    const userVideo = useRef(null);
    const clientVideo = useRef(null);
    const connectionRef = useRef(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({video:true, audio:true})
            .then((currentStream) => {
                setStream(currentStream);
                if (userVideo.current) { // Added check to ensure ref exists
                    userVideo.current.srcObject = currentStream;
                }
            })

        socket.on('user', (id) => setUser(id))

        socket.on('calluser', (from, callerName, signal) => {
            setCall({isReceivedCall: true, from, name:callerName, signal})
        })
    }, [userVideo]);

    const answercall = () =>{
        setCallAccepted(true)

        const peer = new Peer({initiatior: false, trickle: false, stream});

        peer.on('signal', (data) => {
            socket.emit('answercall', {signal: data, to:call.from});
        });

        peer.on('stream', (currentStream) => {
            if (clientVideo.current) { // Added check to ensure ref exists
                clientVideo.current.srcObject = currentStream;
            }
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    }

    const calluser = (id) => {
        const peer = new Peer({initiatior: true, trickle: false, stream});
        peer.on('signal', (data) => {
            socket.emit('calluser', {userToCall: id, singalData: data, from: user, name});

        });

        peer.on('stream', (currentStream) => {
            if (clientVideo.current) { // Added check to ensure ref exists
                clientVideo.current.srcObject = currentStream;
            }
        });

        socket.on('callaccepted', (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;

    }

    const leaveCall = () => {
        setCallEnded(true);
        if (connectionRef.current) { 
            connectionRef.current.destroy();
        }
        window.location.reload();
    }

    return (
        <SocketContext.Provider value={
            {
                call, callAccepted, userVideo, stream, name, setName, callEnded, user, calluser, leaveCall, answercall
            }
        }>
            {children}
        </SocketContext.Provider>
    )
}

export {ContextProvider, SocketContext};