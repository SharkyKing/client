import React, { useState, useCallback, useEffect } from "react";
import './MeetingCard.css'; // Import the CSS file for styling (optional)
import {Button, Textbox} from '../imports'

function MeetingCard({ onClick, className, buttonText, meetingObj }) {
  const userLocale = navigator.language;

  function calculateDateDifference(meetingDate) {
    const currentDate = new Date();
    const differenceInMilliseconds = meetingDate - currentDate;
    const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    return differenceInDays;
}

  return (
    <div className={`meetingCard ${className}`} >
        <div className="meetingCard-data">
          <div className="meetingCard-client">
              <h1>{meetingObj.FirstName + ' ' + meetingObj.LastName}</h1>
          </div>
          <div className="meetingCard-contact">
              <p>
                <b>El. pašto adresas.:</b> {meetingObj.Email}
              </p>
              <p>
                <b>Telefono numeris.:</b> {meetingObj.Phone}
              </p>
          </div>
          <div className="meetingCard-date">
            <h3>
                {new Date(meetingObj.MeetingDate).toLocaleString(userLocale, {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false // Use 24-hour format
                })}
            </h3>
            <p>
              {calculateDateDifference(new Date(meetingObj.MeetingDate))} days until the meeting
            </p>
          </div>
        </div>
        <div className="meetingCard-control">
        </div>
    </div>
  );
}

export default MeetingCard;
