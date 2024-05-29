//BACK END SERVERIS
import { apiPaths } from '../../Additional/serverPaths.js';

//IMPORTAI
import axios from 'axios';
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { auth } from '../../Secure/firebase.js';
//CUSTOM IMPORTAI
import {getText} from '../../Languages/languages'
import {Button, Textbox, MeetingCard} from '../../Components/imports.js'
//CSS IMPORTAS
import './Worktime.css';

function Worktime() {
    const [meetings, setMeetings] = useState([]);
    const [meetingStateFilter, setMeetingStateFilter] = useState(1)

    const [error, setError] = useState(null);

    const fetchMeetings = async () => {
        try {
            const response = await axios.get(apiPaths.getMeetings(auth.currentUser.email, meetingStateFilter)); // Example with specialist ID 1
            console.log(response.status)
            if (response.status === 200) {
                setMeetings(response.data.meetings);
            } else {
                setError(response.data.error);
            }
            console.log(response.data.meetings);
            console.log(meetings);
        } catch (error) {
            setError('Error fetching meetings');
            console.error('Error:', error);
        } finally {
        }
    };

    useEffect(() => {
        setMeetings([])
        fetchMeetings();
    }, [meetingStateFilter]); 

    const handleButtonClick = (filterState) => {
        if (filterState !== meetingStateFilter) { // Check if the new filter is different from the current one
            setMeetingStateFilter(filterState);
        }
    };

    return (
        <>
         <div className='worktime-container'>
            <div className='worktime-tab-control'>
            <Button
                className={meetingStateFilter === 1 ? 'selected' : ''}
                onClick={() => handleButtonClick(1)}
            >
                Ateinantys
            </Button>
            <Button
                className={meetingStateFilter === 3 ? 'selected' : ''}
                onClick={() => handleButtonClick(3)}
            >
                Praėje
            </Button>
            <Button
                className={meetingStateFilter === 2 ? 'selected' : ''}
                onClick={() => handleButtonClick(2)}
            >
                Atšaukti
            </Button>
            </div>
            <div className='worktime-list'>
                {meetings && meetings.length > 0 ? (
                    meetings.map((meeting, index) => (
                        <MeetingCard
                            key={index}
                            buttonText='Atšaukti'
                            meetingObj={meeting}
                        />
                    ))
                ) : (
                    <div className='nomeetings'>
                        <p>Nothing found</p>
                    </div>
                    
                )}
            </div>
         </div>
        </>
    );

}

export default Worktime;
