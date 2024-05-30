import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Textbox, Button, VideoComponent } from '../../../Components/imports';
import './GuestSide.css'

function GuestSide() {
    const [joined, SetJoined] = useState(false)
    const [myStream, setMyStream] = useState();

    return (
        <>
        <div className='guestjoin-container'>
            <div className='guestjoin'>
                <Textbox/>
                <Button>Prisijungti</Button>
            </div>
        </div>
        </>
    );

}

export default GuestSide;
