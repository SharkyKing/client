import React, { useState, useCallback, useEffect } from 'react';
import { Textbox, Button } from '../../../Components/imports';
import './GuestSide.css'
import GuestSidePrepare from './GuestSidePrepare/GuestSidePrepare';
import { useSocket } from '../ConferencingHelpers/SocketProvider';

const GuestActivePages = {
    LOBBY: 0,
    PREPARE: 1,
  };

function GuestSide() {
    const [GuestActivePage, setGuestActivePage] = useState(GuestActivePages.LOBBY);

    const [roomID, setRoomID] = useState('')
    const [email, setEmail] = useState('test@mail.com')

    const socket = useSocket();

    const handleRoomIDChange = (event) => {
        setRoomID(event.target.value);
    };

    const handleConnect = useCallback((event) => {
        event.preventDefault();
        console.log("Connecting to room ID:", roomID);
        socket.emit('guest:room:join', {email, roomID});
    }, [email, roomID, socket]);

    const handleGuestSuccessConnect = useCallback((data)=>{
        console.log("DATA BACK FROM SEVER",data)
        setGuestActivePage(GuestActivePages.PREPARE)
    },[])

    useEffect(() =>{
        socket.on("guest:room:joinsuccess", handleGuestSuccessConnect);
        return () => {
            socket.off("guest:room:joinsuccess",handleGuestSuccessConnect);
        }
    }, [socket, handleGuestSuccessConnect]);

    return (
        <>
        <div className='guestjoin-container'>
            
            {GuestActivePage === GuestActivePages.LOBBY && (
                <>
                    <h1>Prisijungimas</h1>
                    <div className='guestjoin'>
                        <Textbox type="text" placeholder="Prisijungimo kodas" onChange={handleRoomIDChange} value={roomID}/>
                        <Button onClick={handleConnect}>Prisijungti</Button>
                    </div>
                </>
            )}
            {GuestActivePage === GuestActivePages.PREPARE && (
                <>
                    <GuestSidePrepare socket={socket}/>
                </>
            )}
        </div>
        </>
    );

}

export default GuestSide;
