import React, { useState, useContext } from "react";
import {Button} from '../imports.js'
import './join.css'
import { SocketContext } from "../../Panels/Room/socketcontext.js";

export const CreateRoom = () => {
    const [isJoined, setIsJoined] = useState(false);
    const { ws } = useContext(SocketContext);

    const createRoom = () => {
        setIsJoined(!isJoined);
        ws.emit("create-room");
    }

    return (
        <Button className="join-leave-meeting" onClick={createRoom}>
            {isJoined ? "Leave Meeting" : "Join Meeting"}
        </Button>
    );
};
