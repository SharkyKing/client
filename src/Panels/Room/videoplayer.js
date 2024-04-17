import React, { useEffect, useMemo, useRef, useState, useContext } from "react";
import './room.css'
import { CreateRoom } from "../../Components/CreateRoom/createroom.js";

function VideoPlayer() {
    
    return (
        <div className="meeting-room">
            <CreateRoom />
            <div className="videos">
                <video playsInline muted  autoPlay className="video-player" id="user-1" controls ></video>
                <video playsInline  autoPlay className="video-player" id="user-2" controls></video>
            </div>
        </div>
      );
    }

export default VideoPlayer;
