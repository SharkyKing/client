import React, {createContext, useContext, useMemo, useEffect } from "react";
import {io} from "socket.io-client";
import servers from '../../../Additional/server'

const SocketContext = createContext(null);

export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
}

export const SocketProvider = (props) => {
    
    const socket = useMemo(() => io(servers.SIGNALING_SERVER_URL),[]);

    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    )
}