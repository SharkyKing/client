import React, { useEffect, useMemo, useRef, useState } from "react";
import {Button, Textbox} from '../../Components/imports.js'
import './room.css'

import { SocketContext } from "./socketcontext.js";

function VideoPlayer() {
    return (
        <div className="videos">
            <video playsInline muted  autoPlay className="user-1"></video>
            <video playsInline  autoPlay className="user-2"></video>
        </div>
      );
    }

export default VideoPlayer;
