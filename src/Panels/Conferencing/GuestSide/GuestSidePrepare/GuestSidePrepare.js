import React, { useState, useCallback, useEffect } from 'react';
import { Textbox, Button } from '../../../../Components/imports';
import './GuestSidePrepare.css'
import ReactPlayer from 'react-player';
function GuestSidePrepare({socket, currentUserVideo,otherUserVideo, directConnect, remoteSocketID}) {

    return (
        <>
        <div className='guestprepare-container'>
            <div className="guestjoin-videplayer-wrapper">
                    {currentUserVideo && (
                        <div className="player-container">
                            <ReactPlayer
                                width="50vw"
                                height="50vh"
                                className='guestjoin-videplayer'
                                playing
                                muted
                                url={currentUserVideo}
                            />
                        </div>
                    )}
            </div>
            <div className="guestjoin-settings-wrapper">
                <h1>
                    Settings
                </h1>
                {
                    remoteSocketID && 
                    <Button onClick={directConnect}>
                        Jungtis
                    </Button>
                    
                }
            </div>
        </div>
        </>
    );

}

export default GuestSidePrepare;
