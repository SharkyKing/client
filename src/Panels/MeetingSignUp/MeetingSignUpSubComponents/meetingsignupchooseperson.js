import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Button, Textbox, PersonCard} from '../../../Components/imports.js'
import Cookies from 'universal-cookie';
import {getText} from '../../../Languages/languages.js'
import { validateEmail, validateName, isAllEmpty } from '../../../Additional/validationutils.js';
import Swal from 'sweetalert2';

//CSS IMPORTAS
import './meetingsignupchooseperson.css'
function MeetingSignUpChoosePerson({ setStateChange, State, setChosenConsultant }) {
    const cookies = new Cookies();
    const lang = cookies.get('lang');
    const navigate = useNavigate();

    const  handleNext = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "To change consultant choose \"Specialistas\" in nvaigation!",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, my choice is correct!"
      }).then((result) => {
        if (result.isConfirmed) {
          setStateChange(State)   
        }
      });
    }

  return (
    <>
    <h1>
        Pasirinkite specialistą!
    </h1>
    <div className="Persons-Container">
        <PersonCard imgSource={'/images/doctor1.jpg'} onClick={handleNext} setState={setChosenConsultant}/>
        <PersonCard imgSource={'/images/doctor2.jpg'} onClick={handleNext} setState={setChosenConsultant}/>
        <PersonCard imgSource={'/images/doctor3.jpeg'} onClick={handleNext} setState={setChosenConsultant}/>
        <PersonCard imgSource={'/images/doctor4.jpg'} onClick={handleNext} setState={setChosenConsultant}/>
        <PersonCard imgSource={'/images/doctor1.jpg'} onClick={handleNext} setState={setChosenConsultant}/>
        <PersonCard imgSource={'/images/doctor2.jpg'} onClick={handleNext} setState={setChosenConsultant}/>
        <PersonCard imgSource={'/images/doctor3.jpeg'} onClick={handleNext} setState={setChosenConsultant}/>
        <PersonCard imgSource={'/images/doctor4.jpg'} onClick={handleNext} setState={setChosenConsultant}/>
    </div>
    </>
  );
}

export default MeetingSignUpChoosePerson;
