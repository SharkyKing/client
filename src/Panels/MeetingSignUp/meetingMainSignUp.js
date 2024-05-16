import MeetingSignUp from "./MeetingSignUpSubComponents/meetingsignup";
import MeetingSignUpChooseDate from "./MeetingSignUpSubComponents/meetingsignupchoosedate";
import MeetingSignUpChoosePerson from "./MeetingSignUpSubComponents/meetingsignupchooseperson";

import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Button, Textbox, PersonCard} from '../../Components/imports.js'
import Cookies from 'universal-cookie';
import {getText} from '../../Languages/languages.js'
import { validateEmail, validateName, isAllEmpty } from '../../Additional/validationutils.js';

//CSS IMPORTAS
import './meetingMainSignUp.css'

const PageStates = {
    MEETING_SIGN_UP: 0,
    CHOOSE_PERSON: 1,
    CHOOSE_DATE: 2,
  };

function MeetingMainSignUp(){
    const [PageState, setPageState] = useState(PageStates.MEETING_SIGN_UP);

    const [Email, setEmail] = useState(null);
    const [PhoneNumber, setPhoneNumber] = useState(null);
    const [Firstname, setFirstname] = useState(null);
    const [Lastname, setLastname] = useState(null);
    const [ChosenConsultant, setChosenConsultant] = useState(null);

    const setStateChange = (newState) => {
        setPageState(newState);
        console.log(newState);
    };

    return <>
        <div className="meeting-signup-navigation">
            <div className="meeting-signup-navigation-navitem">
                <Button onClick={() => setStateChange(PageStates.MEETING_SIGN_UP)} className={PageState === PageStates.MEETING_SIGN_UP ? 'active' : ''}>1. Vartotojo informacija</Button>
            </div>
            <div className="meeting-signup-navigation-navitem-img">
                <img className='image-imgsrc-right-arrow' src="/images/right-arrow.png" alt="right-arrow" />
            </div>
            <div className="meeting-signup-navigation-navitem">
                <Button onClick={() => setStateChange(PageStates.CHOOSE_PERSON)} disabled={PageState === PageStates.MEETING_SIGN_UP} className={PageState === PageStates.CHOOSE_PERSON ? 'active' : ''}>2. Specialistas</Button>
            </div>
            <div className="meeting-signup-navigation-navitem-img">
                <img className='image-imgsrc-right-arrow' src="/images/right-arrow.png" alt="right-arrow" />
            </div>
            <div className="meeting-signup-navigation-navitem">
                <Button onClick={() => setStateChange(PageStates.CHOOSE_DATE)} disabled={PageState === PageStates.MEETING_SIGN_UP || PageState === PageStates.CHOOSE_PERSON} className={PageState === PageStates.CHOOSE_DATE ? 'active' : ''}>3. Konsultacijos laikas</Button>
            </div>
    </div>

    <div className="meeting-signup-container">
        {PageState === PageStates.MEETING_SIGN_UP && (
            <>
            <div className="meeting-signup-viewcontainer-signup">
                <MeetingSignUp 
                    setStateChange={setStateChange} 
                    State={PageStates.CHOOSE_PERSON}
                    email={Email}
                    setEmail={setEmail}
                    phoneNumber={PhoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    firstname={Firstname}
                    setFirstname={setFirstname}
                    lastname={Lastname}
                    setLastname={setLastname}
                />
            </div>
            <div className='meeting-signup-image-signup'>
                <img className='image-imgsrc-signup' src="/images/signup.jpg" alt="signupimg" />
            </div>
            </>
        )}
        {PageState === PageStates.CHOOSE_PERSON && (
            <>
            <div className="meeting-signup-viewcontainer-person">
                <MeetingSignUpChoosePerson setStateChange={setStateChange} State={PageStates.CHOOSE_DATE}/>
            </div>
            </>
        )}
        {PageState === PageStates.CHOOSE_DATE && (
            <>
             <div className='meeting-signup-image-date'>
                <img className='image-imgsrc-signup' src="/images/signup.jpg" alt="signupimg" />
            </div>
            <div className="meeting-signup-viewcontainer-date">
                <MeetingSignUpChooseDate />
            </div>
            </>
        )}
        
    </div>
    </>
}

export default MeetingMainSignUp;