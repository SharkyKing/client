import servers from '../../Additional/server.js';

import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';

import {Button, Textbox} from '../../Components/imports.js'

import { validateEmail, validatePassword, isAllEmpty } from '../../Additional/validationutils.js';
import { paths } from '../../Additional/paths.js';

import './signin.css'

import bcrypt from 'bcryptjs';

function SignIn({ login })  {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submissionFailed, setSubmissionFailed] = useState(false);
    const [submissionFailedMsg, setSubmissionFailedMsg] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleEmailChange = (event) => {
        setSubmissionFailed(false);
        const value = event.target.value;
        setEmail(value);
        setErrors((prevErrors) => ({ ...prevErrors, email: !validateEmail(value) }));
    }

    const handlePasswordChange = (event) => {
        setSubmissionFailed(false);
        const value = event.target.value;
        setPassword(value);
        if (value.trim() === '') {
            setErrors((prevErrors) => ({ ...prevErrors, password: false }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, password: !validatePassword(value) }));
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const allValues = [email.trim(),password.trim()];
        let preSubmitValidationFailed = false;

        if (isAllEmpty(allValues)) {
            setSubmissionFailedMsg('Fill all the fields')
            preSubmitValidationFailed = true;
        }

        if (Object.values(errors).some((error) => error)) {
            setSubmissionFailedMsg('Incorrect login details')
            preSubmitValidationFailed = true;
        }

        if(preSubmitValidationFailed){
            setSubmissionFailed(preSubmitValidationFailed);
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`${servers.SERVER_URL}api/user/${email}`);
            
            if (response.status !== 200) {
                setLoading(false);
                setSubmissionFailed(true);
                if (response.status === 404) {
                    setSubmissionFailedMsg('User not found');
                } else {
                    setSubmissionFailedMsg('Error occurred during login');
                }
                throw new Error(response.error);
            }
            else {
              const userData = response.data.user;
              const match = await bcrypt.compare(password, userData.Password);
      
              if (match) {
                  setLoading(false);
                  login();
                  navigate(paths.PROFILE);
              } else {
                  setLoading(false);
                  setSubmissionFailed(true);
                  setSubmissionFailedMsg('Invalid username or password');
              }
            }
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
          <div className='container-signin'>
            <div className='sign-in-container-fields'>
                <h1>SIGN IN</h1>
              <div className='sign-in-container-textbox'>
                <Textbox
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className='sign-in-container-textbox'>
                <Textbox
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <Button className='signin-btn' onClick={handleSubmit}>{loading ? <div className="spinner"></div> : 'Sign in'}</Button>
              {submissionFailed && <p className='submission-message'>{submissionFailedMsg}</p>}
              <p className={`submission-message ${submissionFailed ? 'show' : ''}`}>{submissionFailed ? submissionFailedMsg : '\u00A0'}</p>
            </div>
            <div className='sign-in-container-image'>
                <img className='image-imgsrc-signin' src="/images/signinimage.jpg" alt="Description" />
            </div>
          </div>
        </>
      );
    }

export default SignIn;
