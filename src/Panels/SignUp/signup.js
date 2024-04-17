import servers from '../../Additional/server.js';

import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';

import {Button, Textbox} from '../../Components/imports.js'
import PasswordStrengthMeter from '../../Components/PasswordStrengthMeter/passwordstrengthmeter.js';

import { validateEmail, validateName, validatePassword, isAllEmpty } from '../../Additional/validationutils.js';
import { paths } from '../../Additional/paths.js';

import './signup.css'

import bcrypt from 'bcryptjs';

function SignUp({login}) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [submissionFailed, setSubmissionFailed] = useState(false);
    const [submissionFailedMsg, setSubmissionFailedMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const saltRounds = 10;

    const handleEmailChange = (event) => {
        setSubmissionFailed(false);
        const value = event.target.value;
        setEmail(value);
        setErrors((prevErrors) => ({ ...prevErrors, email: !validateEmail(value) }));
    };

    const handlefirstnameChange = (event) => {
        setSubmissionFailed(false);
        const value = event.target.value;
        setfirstname(value);
        setErrors((prevErrors) => ({ ...prevErrors, firstname: !validateName(value) }));
    };

    const handlelastnameChange = (event) => {
        setSubmissionFailed(false);
        const value = event.target.value;
        setlastname(value);
        setErrors((prevErrors) => ({ ...prevErrors, lastname: !validateName(value) }));
    };

    const handlePasswordChange = (event) => {
        setSubmissionFailed(false);
        const value = event.target.value;
        setPassword(value);
        
        if (value.trim() === '') {
            setErrors((prevErrors) => ({ ...prevErrors, password: false }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, password: !validatePassword(value) }));
        }
    };

    const handleRepeatPasswordChange = (event) => {
        setSubmissionFailed(false);
        const value = event.target.value;
        setRepeatPassword(value);
        if (value.trim() === '') {
            setErrors((prevErrors) => ({ ...prevErrors, repeatPassword: false }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, repeatPassword: value !== password }));
        }
    };

    const resetFields = () => {
      setEmail('');
      setfirstname('');
      setlastname('');
      setlastname('');
      setPassword('');
      setRepeatPassword('');
      setSubmissionFailed(false);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
      const allValues = [email.trim(),firstname.trim(),lastname.trim(),password.trim(),repeatPassword.trim()];
      let preSubmitValidationFailed = false;

      if (isAllEmpty(allValues)) {
        setSubmissionFailedMsg('Fill all the fields')
        preSubmitValidationFailed = true;
      }

      if (Object.values(errors).some((error) => error)) {
        setSubmissionFailedMsg('Please enter valid information')
        preSubmitValidationFailed = true;
      }

      if(preSubmitValidationFailed){
        setSubmissionFailed(preSubmitValidationFailed);
        setLoading(false);
        return;
      }

      try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const response = await axios.post(`${servers.SERVER_URL}api/user/`, {
              email: email,
              firstname: firstname,
              lastname: lastname,
              password: hashedPassword
        });
        
        if (response.status !== 201) {
            setSubmissionFailed(true);
            setLoading(false);
            throw new Error(response.error);
        }

        resetFields();
        setLoading(false);
        login();
        navigate(paths.PROFILE);
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
            <h1>SIGN UP</h1>
              <div className='container-textbox'>
                <Textbox
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  className={errors.email ? 'error' : ''}
                />
                <p className={`error-message ${errors.email ? 'show' : ''}`}>{errors.email ? 'Invalid email format' : '\u00A0'}</p>
              </div>
              <div className='container-textbox'>
                <Textbox
                  type="text"
                  placeholder="First name"
                  value={firstname}
                  onChange={handlefirstnameChange}
                  className={errors.firstname ? 'error' : ''}
                />
                <p className={`error-message ${errors.firstname ? 'show' : ''}`}>{errors.firstname ? 'First name cannot contain numbers or symbols' : '\u00A0'}</p>
              </div>
              <div className='container-textbox'>
                <Textbox
                  type="text"
                  placeholder="Last name"
                  value={lastname}
                  onChange={handlelastnameChange}
                  className={errors.lastname ? 'error' : ''}
                />
                <p className={`error-message ${errors.lastname ? 'show' : ''}`}>{errors.lastname ? 'Last name cannot contain numbers or symbols' : '\u00A0'}</p>
              </div>
              <div className='container-textbox'>
                <Textbox
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className={errors.password ? 'error' : ''}
                />
                <PasswordStrengthMeter password={password} />
              </div>
              <div className='container-textbox'>
                <Textbox
                  type="password"
                  placeholder="Repeat password"
                  value={repeatPassword}
                  onChange={handleRepeatPasswordChange}
                  className={errors.repeatPassword ? 'error' : ''}
                />
                <p className={`error-message ${errors.repeatPassword ? 'show' : ''}`}>{errors.repeatPassword ? 'Passwords do not match' : '\u00A0'}</p>
              </div>
              <Button className='signup-btn' onClick={handleSubmit}>{loading ? <div className="spinner"></div> : 'Sign up'}</Button>
              {submissionFailed && <p className='submission-message'>{submissionFailedMsg}</p>}
              <p className={`submission-message ${submissionFailed ? 'show' : ''}`}>{submissionFailed ? submissionFailedMsg : '\u00A0'}</p>
            </div>
            <div className='container-image'>
                <img className='image-imgsrc-signup' src="/images/signupimage.jpg" alt="signupimg" />
            </div>
          </div>
        </>
      );
    }

export default SignUp;
