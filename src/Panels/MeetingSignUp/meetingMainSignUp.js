//BACK END SERVERIS
import { apiPaths } from '../../Additional/serverPaths.js';
import axios from 'axios';

import MeetingSignUp from "./MeetingSignUpSubComponents/meetingsignup";
import MeetingSignUpChooseDate from "./MeetingSignUpSubComponents/meetingsignupchoosedate";
import MeetingSignUpChoosePerson from "./MeetingSignUpSubComponents/meetingsignupchooseperson";

import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Button, Textbox, PersonCard} from '../../Components/imports.js'
import Cookies from 'universal-cookie';
import {getText} from '../../Languages/languages.js'
import { validateEmail, validateName, isAllEmpty } from '../../Additional/validationutils.js';
import Swal from 'sweetalert2';

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
    const [selectedMonth, setSelectedMonth] = useState('______');
    const [selectedDay, setSelectedDay] = useState('______');
    const [selectedTime, setSelectedTime] = useState('______');

    const setStateChange = (newState) => {
        setPageState(newState);
        console.log(newState);
    };

    var str=
        "<b>Vardas Pavardė.: ".padEnd(25, " ") + "</b>" + Firstname + " " + Lastname + "\n" +
        "<b>Telefono numeris.: ".padEnd(25, " ") + "</b>" + PhoneNumber + "\n" +
        "<b>El. paštas.: ".padEnd(25, " ") + "</b>" + Email + "\n\n" +
        "<b>Laikas.: ".padEnd(25, " ") + "</b>" + selectedMonth + "-" + selectedDay + " " + selectedTime + " h" + "\n" +
        "<b>Specialistas.: ".padEnd(25, " ") + "</b>" + ChosenConsultant + "\n"

    const HandleSwalCodeInput = useCallback(() => {
        Swal.fire({
            title: "Išsiuntėme KODĄ numeriu -" + PhoneNumber + "-. Įveskite jį žemiau, kad patvirntumėte registraciją",
            html: '<input id="swal-input" class="swal2-input" type="text" oninput="this.value=this.value.replace(/[^0-9]/g,\'\');">',
            showCancelButton: true,
            confirmButtonText: "Patvirtinti",
            cancelButtonText: "Siųsti iš naujo!",
            showCloseButton: true,
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading(),
            preConfirm: () => {
                const inputValue = document.getElementById('swal-input').value;
                if (!inputValue) {
                    Swal.showValidationMessage('Įveskite kodą!');
                    return false;
                }
                return inputValue;
            }
          }).then(async (result) => {
            if (result.isConfirmed) {
                const inputNumber = result.value;
                await Swal.fire({
                    icon: "success",
                    title: "Lauksime jūsų " + selectedMonth + "-" + selectedDay + " " + selectedTime + " h" + "\n",
                    confirmButtonText: "Užbaigti"
                });   

                const dateStr = selectedMonth + "-" + selectedDay; 
                const timeStr = selectedTime;

                const [month, day] = dateStr.split("-");
                const [hours, minutes] = timeStr.split(":");

                const currentYear = new Date().getFullYear();

                const dateTime = new Date(currentYear, month - 1, day, hours, minutes);

                const formattedDateTimeString = dateTime.toISOString();
                console.log(formattedDateTimeString);
                const response = await axios.post(`${apiPaths.saveMeeting(Firstname, Lastname, PhoneNumber, Email, ChosenConsultant, formattedDateTimeString)}`);
            
                if (response.status !== 200) {
                    throw new Error(response.error);
                }

                setStateChange(PageStates.MEETING_SIGN_UP)
                setEmail(null);
                setPhoneNumber(null);
                setFirstname(null);
                setLastname(null);
                setChosenConsultant(null);
                setSelectedMonth('______');
                setSelectedDay('______');
                setSelectedTime('______');
                return;
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                HandleSwalCodeInput()
            }
        });
    }, [selectedMonth, selectedDay, selectedTime]);

    const handleNextRoom = useCallback(() => {
        if (selectedMonth === '______' || selectedDay === '______' || selectedTime === '______') {
            if(selectedMonth === '______'){
                Swal.fire({
                    icon: "error",
                    title: "Nepasirinktas mėnesis"
                  });
                  return;
            }
            if(selectedDay === '______'){
                Swal.fire({
                    icon: "error",
                    title: "Nepasirinkta diena"
                  });
                  return;
            }
            if(selectedTime === '______'){
                Swal.fire({
                    icon: "error",
                    title: "Nepasirinktas laikas"
                  });   
                  return;
            }
        }
        
        Swal.fire({
            title: "Ar informacija teisinga?",
            html: '<pre class="swal-html-container">' + str + '</pre>',
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Taip!",
            cancelButtonText: "Ne, reikia patikslinti!"
        }).then((result) => {
            if(result.isConfirmed){
                HandleSwalCodeInput();
            }
        });
      }, [selectedMonth, selectedDay, selectedTime]);


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
                <MeetingSignUpChoosePerson 
                    setStateChange={setStateChange} 
                    State={PageStates.CHOOSE_DATE}
                    setChosenConsultant = {setChosenConsultant}
                />
            </div>
            </>
        )}
        {PageState === PageStates.CHOOSE_DATE && (
            <>
             <div className='meeting-signup-image-date'>
                <img className='image-imgsrc-signup' src="/images/signup.jpg" alt="signupimg" />
            </div>
            <div className="meeting-signup-viewcontainer-date">
                <MeetingSignUpChooseDate 
                    setSelectedMonth={setSelectedMonth}
                    selectedMonth = {selectedMonth}
                    setSelectedDay = {setSelectedDay}
                    selectedDay = {selectedDay}
                    setSelectedTime = {setSelectedTime}
                    selectedTime = {selectedTime}
                    handleFinish = {handleNextRoom}
                />
            </div>
            </>
        )}
        
    </div>
    </>
}

export default MeetingMainSignUp;