import React, { useState, useCallback, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Textbox, Button } from '../../../../Components/imports';
import './GuestSideConnect.css'

function GuestSideConnect(currentUserVideo, otherUserVideo) {
    return (
        <>
        <div className='userjoin-container'>
            <div className='userjoin-video'>
                <div className="userjoin-videplayer-wrapper" >
                    {
                        otherUserVideo && <ReactPlayer width="95vw" height="80vh" className='guest-userjoin-videplayer' playing muted url={otherUserVideo}/>
                    }
                    {
                        currentUserVideo && <ReactPlayer width="20vw" height="20vh" className='guest-guestjoin-videplayer' playing muted url={currentUserVideo}/>
                    }
                </div>
            </div>
        </div>
        </>
    );

}

export default GuestSideConnect;
