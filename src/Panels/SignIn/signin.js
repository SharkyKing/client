import React, { useState } from 'react';
import {Button, Textbox} from '../../Components/imports.js'
import './signin.css'
import axios from 'axios';
import backendServerUrl from '../../Additional/server.js';
import { useNavigate  } from 'react-router-dom';
import { paths } from '../../Additional/paths.js';

function SignIn({ login })  {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submissionFailed, setSubmissionFailed] = useState(false);
    const [submissionFailedMsg, setSubmissionFailedMsg] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        setSubmissionFailed(false);

        try {
            const response = await axios.post(`${backendServerUrl}api/user/`, {
                email,
                password,
              });
            console.log(response.data);
        } catch (error) {
            console.error('Error occurred during login:', error);
        }
        
        login();
        navigate(paths.PROFILE);
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
                />
              </div>
              <div className='sign-in-container-textbox'>
                <Textbox
                  type="password"
                  placeholder="Password"
                  value={password}
                />
              </div>
              <Button className='signin-btn' onClick={handleSubmit}>Sign in</Button>
              {submissionFailed && <p className='submission-message'>{submissionFailedMsg}</p>}
              <p className={`submission-message ${submissionFailed ? 'show' : ''}`}>{submissionFailed ? submissionFailedMsg : '\u00A0'}</p>
            </div>
            <div className='sign-in-container-image'>
                <img className='image-imgsrc-signin' src="/images/signinimage.jpg" alt="Description of the image" />
            </div>
          </div>
        </>
      );
    }

export default SignIn;
