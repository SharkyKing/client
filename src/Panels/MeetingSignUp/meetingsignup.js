import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Button, Textbox, PersonCard} from '../../Components/imports.js'
import Cookies from 'universal-cookie';
import {getText} from '../../Languages/languages'
import { validateEmail, validateName, isAllEmpty } from '../../Additional/validationutils.js';

//CSS IMPORTAS
import './meetingsignup.css'
function MeetingSignUp() {
    const cookies = new Cookies();
    const lang = cookies.get('lang');
    const navigate = useNavigate();


    const [email, setEmail] = useState('');
    const [phoneno, setPhoneno] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    const [errors, setErrors] = useState({});

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        if (event.target.value.trim() === '') {
            setErrors({ ...errors, email: false });
        } else {
            setErrors({ ...errors, email: !validateEmail(event.target.value) });
        }
    };

    const handlePhoneChange = (event) => {
        setPhoneno(event.target.value);
        if (event.target.value.trim() === '') {
            setErrors({ ...errors, phone: false });
        } else {
            setErrors({ ...errors, phone: !validateEmail(event.target.value) });
        }
    };

    const handleFirstnameChange = (event) => {
        setFirstname(event.target.value);
        if (event.target.value.trim() === '') {
            setErrors({ ...errors, firstname: false });
        } else {
            setErrors({ ...errors, firstname: !validateName(event.target.value) });
        }
    };

    const handleLastnameChange = (event) => {
        setLastname(event.target.value);
        if (event.target.value.trim() === '') {
            setErrors({ ...errors, lastname: false });
        } else {
            setErrors({ ...errors, lastname: !validateName(event.target.value) });
        }
    };

    const handleNextRoom = useCallback(
        (data) => {
          navigate(`/meetingsignup-chooseperson`);
        },
        [navigate]
      );

  return (
    <>
          <div className='container-signup'>
            <div className='container-fields'>
            <h1>{getText('meetingsignup.phonenoheader',lang)}</h1>
              <div className='container-textbox'>
                <Textbox
                  type="email"
                  placeholder={getText('meetingsignup.email',lang)}
                  value={email}
                  onChange={handleEmailChange }
                  className={errors.email ? 'error' : ''}
                  autoComplete="off"
                  name="email"
                />
                <p className={`error-message ${errors.email ? 'show' : ''}`}>{errors.email ? getText('meetingsignup.wrongEmail',lang) : '\u00A0'}</p>
              </div>
              <div className='container-textbox'>
                <Textbox
                  type="text"
                  placeholder={getText('meetingsignup.phoneno',lang)}
                  value={phoneno}
                  onChange={handlePhoneChange }
                  className={errors.phoneno ? 'error' : ''}
                  autoComplete="off"
                />
                <p className={`error-message ${errors.phoneno ? 'show' : ''}`}>{errors.phoneno ? getText('meetingsignup.firstNameOnlyLetters',lang) : '\u00A0'}</p>
              </div>
              <div className='container-textbox'>
                <Textbox
                  type="text"
                  placeholder={getText('meetingsignup.firstname',lang)}
                  value={firstname}
                  onChange={handleFirstnameChange }
                  className={errors.firstname ? 'error' : ''}
                  autoComplete="off"
                />
                <p className={`error-message ${errors.firstname ? 'show' : ''}`}>{errors.firstname ? getText('meetingsignup.firstNameOnlyLetters',lang) : '\u00A0'}</p>
              </div>
              <div className='container-textbox'>
                <Textbox
                  type="text"
                  placeholder={getText('meetingsignup.lastname',lang)}
                  value={lastname}
                  onChange={handleLastnameChange }
                  className={errors.lastname ? 'error' : ''}
                  autoComplete="off"
                />
                <p className={`error-message ${errors.lastname ? 'show' : ''}`}>{errors.lastname ? getText('meetingsignup.lastNameOnlyLetters',lang) : '\u00A0'}</p>
              </div>
              <Button className='signup-btn' onClick={handleNextRoom}>Tęsti</Button>
            </div>
            <div className='container-image'>
                <img className='image-imgsrc-signup' src="/images/signup.jpg" alt="signupimg" />
            </div>
          </div>
        </>
  );
}

export default MeetingSignUp;
