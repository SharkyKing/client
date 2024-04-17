import React, { useEffect, useMemo, useRef, useState } from "react";
import {Button, Textbox} from '../../Components/imports.js'
import VideoPlayer from "./videoplayer.js";
import Options from "./options.js";
import { SocketProvider } from "./socketcontext.js";

import './room.css'

function Room() {
    return (
        <div className="room">
            <SocketProvider>
                <VideoPlayer />
                <Options />
            </SocketProvider>
        </div>
    );
}

export default Room;

