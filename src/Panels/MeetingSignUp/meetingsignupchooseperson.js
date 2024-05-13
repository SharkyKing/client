import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Button, Textbox, PersonCard} from '../../Components/imports.js'
import Cookies from 'universal-cookie';
import {getText} from '../../Languages/languages'
import { validateEmail, validateName, isAllEmpty } from '../../Additional/validationutils.js';

//CSS IMPORTAS
import './meetingsignupchooseperson.css'
function MeetingSignUpChoosePerson() {
    const cookies = new Cookies();
    const lang = cookies.get('lang');
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const handleNextRoom = useCallback(
        (data) => {
          navigate(`/meetingsignup-choosedate`);
        },
        [navigate]
      );

  return (
    <>
    <h1>
        Pasirinkite specialistą!
    </h1>
    <div className="Persons-Container">
        <PersonCard imgSource={'/images/doctor1.jpg'}/>
        <PersonCard imgSource={'/images/doctor2.jpg'}/>
        <PersonCard imgSource={'/images/doctor3.jpeg'}/>
        <PersonCard imgSource={'/images/doctor4.jpg'}/>
    </div>
    <Button className='signup-btn' onClick={handleNextRoom}>Tęsti</Button>
    </>
  );
}

export default MeetingSignUpChoosePerson;
