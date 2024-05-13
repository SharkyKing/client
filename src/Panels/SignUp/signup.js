//BACK END SERVERIS
import { apiPaths } from '../../Additional/serverPaths.js';

//IMPORTAI
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import Cookies from 'universal-cookie';
import bcrypt from 'bcryptjs';

//CUSTOM IMPORTAI
import {Button, Textbox} from '../../Components/imports.js'
import PasswordStrengthMeter from '../../Components/PasswordStrengthMeter/passwordstrengthmeter.js';
import { validateEmail, validateName, isAllEmpty } from '../../Additional/validationutils.js';
import { paths } from '../../Additional/paths.js';
import {getText} from '../../Languages/languages'

//CSS IMPORTAS
import './signup.css'



function SignUp({login}) {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const [errors, setErrors] = useState({});
    const [submissionFailed, setSubmissionFailed] = useState(false);
    const [submissionFailedMsg, setSubmissionFailedMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const cookies = new Cookies();
    const lang = cookies.get('lang');
    const saltRounds = 10;

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setErrors({ ...errors, email: !validateEmail(event.target.value) });
    };

    const handleFirstnameChange = (event) => {
        setFirstname(event.target.value);
        setErrors({ ...errors, firstname: !validateName(event.target.value) });
    };

    const handleLastnameChange = (event) => {
        setLastname(event.target.value);
        setErrors({ ...errors, lastname: !validateName(event.target.value) });
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRepeatPasswordChange = (event) => {
        setRepeatPassword(event.target.value);
        setErrors({ ...errors, repeatPassword: event.target.value !== password });
    };

    const resetForm = () => {
        setEmail('');
        setFirstname('');
        setLastname('');
        setPassword('');
        setRepeatPassword('');
        setSubmissionFailed(false);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);

      const formData = { email, firstname, lastname, password, repeatPassword };
        const allValues = Object.values(formData);
        const formErrors = {
            email: !validateEmail(email),
            firstname: !validateName(firstname),
            lastname: !validateName(lastname),
            repeatPassword: repeatPassword !== password
        };

      if (isAllEmpty(allValues) || Object.values(formErrors).some(Boolean)) {
        setSubmissionFailedMsg(getText(isAllEmpty(allValues) ? 'signInUp.signup.fillall' : 'signInUp.signup.validinfo', lang));
        setSubmissionFailed(true);
        setLoading(false);
        return;
      }

      try {
        const hashedPassword = await bcrypt.hash(formData.password, saltRounds);

        const response = await axios.post(apiPaths.signUpPath(), {
          email,
          firstname,
          lastname,
          password: hashedPassword
      });
        
        if (response.status !== 200) {
            setSubmissionFailed(true);
            setLoading(false);
            throw new Error(response.error);
        }

        resetForm();
        setLoading(false);
        navigate(paths.SIGNIN);
      } catch (error) {
        setLoading(false);
        if (error.response) {
              console.error('Error response from server:', error.response.data);
              console.error('Status code:', error.response.status);
              if (error.response.data && error.response.data.error) {
                console.error('Error message:', error.response.data.error);
                setSubmissionFailedMsg(error.response.data.error);
              }
          } else if (error.request) {
              console.error('No response received:', error.request);
          } else {
              console.error('Error setting up the request:', error.message);
          }
          setSubmissionFailed(true);
      }
      };


    return (
        <>
          <div className='container-signup'>
            <div className='container-fields'>
            <h1>{getText('signInUp.signup.signup',lang)}</h1>
              <div className='container-textbox'>
                <Textbox
                  type="email"
                  placeholder={getText('signInUp.signup.email',lang)}
                  value={email}
                  onChange={handleEmailChange }
                  className={errors.email ? 'error' : ''}
                  autoComplete="off"
                  name="email"
                />
                <p className={`error-message ${errors.email ? 'show' : ''}`}>{errors.email ? getText('signInUp.signup.wrongEmail',lang) : '\u00A0'}</p>
              </div>
              <div className='container-textbox'>
                <Textbox
                  type="text"
                  placeholder={getText('signInUp.signup.firstname',lang)}
                  value={firstname}
                  onChange={handleFirstnameChange }
                  className={errors.firstname ? 'error' : ''}
                  autoComplete="off"
                />
                <p className={`error-message ${errors.firstname ? 'show' : ''}`}>{errors.firstname ? getText('signInUp.signup.firstNameOnlyLetters',lang) : '\u00A0'}</p>
              </div>
              <div className='container-textbox'>
                <Textbox
                  type="text"
                  placeholder={getText('signInUp.signup.lastname',lang)}
                  value={lastname}
                  onChange={handleLastnameChange }
                  className={errors.lastname ? 'error' : ''}
                  autoComplete="off"
                />
                <p className={`error-message ${errors.lastname ? 'show' : ''}`}>{errors.lastname ? getText('signInUp.signup.lastNameOnlyLetters',lang) : '\u00A0'}</p>
              </div>
              <div className='container-textbox'>
                <Textbox
                  type="password"
                  placeholder={getText('signInUp.signup.password',lang)}
                  value={password}
                  onChange={handlePasswordChange }
                  className={errors.password ? 'error' : ''}
                  autoComplete="off"
                />
                <PasswordStrengthMeter password={password} />
              </div>
              <div className='container-textbox'>
                <Textbox
                  type="password"
                  placeholder={getText('signInUp.signup.repeatPassword',lang)}
                  value={repeatPassword}
                  onChange={handleRepeatPasswordChange }
                  className={errors.repeatPassword ? 'error' : ''}
                  autoComplete="off"
                />
                <p className={`error-message ${errors.repeatPassword ? 'show' : ''}`}>{errors.repeatPassword ? getText('signInUp.signup.passDoNotMatch',lang) : '\u00A0'}</p>
              </div>
              <Button className='signup-btn' onClick={handleSubmit}>{loading ? <div className="spinner"></div> : getText('signInUp.signup.signup',lang)}</Button>
              {submissionFailed && <p className='submission-message'>{submissionFailedMsg}</p>}
              <p className={`submission-message ${submissionFailed ? 'show' : ''}`}>{submissionFailed ? submissionFailedMsg : '\u00A0'}</p>
            </div>
            <div className='container-image'>
                <img className='image-imgsrc-signup' src="/images/signup.jpg" alt="signupimg" />
            </div>
          </div>
        </>
      );
    }

export default SignUp;
