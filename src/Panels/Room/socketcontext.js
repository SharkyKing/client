import React, {createContext, useState, useRef, useEffect, Children} from "react";
import servers from "../../Additional/server.js";
import socketIOClient from "socket.io-client";

export const SocketContext = createContext(null);

const ws = socketIOClient(servers.SIGNALING_SERVER_URL);

export const SocketProvider = ({children}) => {
    const enterRoom = (roomId) => {
        console.log("Entering room ", roomId);
    }

    useEffect(() => {
        ws.on("room-created", enterRoom);
    }, []);
    return (
        <SocketContext.Provider value={{ws}}>
            {children}
        </SocketContext.Provider>
    );
}