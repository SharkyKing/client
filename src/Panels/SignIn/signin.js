//BACK END SERVERIS
import { apiPaths } from '../../Additional/serverPaths.js';

//IMPORTAI
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import Cookies from 'universal-cookie';
import bcrypt from 'bcryptjs';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../../Secure/firebase.js"

//CUSTOM IMPORTAI
import {getText} from '../../Languages/languages'
import {Button, Textbox} from '../../Components/imports.js'
import { validateEmail, validatePassword, isAllEmpty } from '../../Additional/validationutils.js';
import { paths } from '../../Additional/paths.js';

//CSS IMPORTAS
import './signin.css'

function SignIn()  {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [submissionFailed, setSubmissionFailed] = useState(false);
    const [submissionFailedMsg, setSubmissionFailedMsg] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const cookies = new Cookies();
    const lang = cookies.get('lang');

    const setErrorState = (email, password) => {
      setErrors({
        email: !validateEmail(email),
        password: password.trim() !== '' && !validatePassword(password),
      });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        setErrorState(email, password);

        const allValues = [email.trim(),password.trim()];
        if (isAllEmpty(allValues) || Object.values(errors).some(Boolean)) {
          setSubmissionFailedMsg(getText(isAllEmpty(allValues) ? 'signInUp.signin.fillall' : 'signInUp.signin.incorrectDetails', lang));
          setSubmissionFailed(true);
          setLoading(false);
          return;
        }

        try {
            const response = await axios.get(`${apiPaths.loginPath(email)}`);
            
            if (response.status !== 200) {
              setSubmissionFailedMsg(getText(response.status === 404 ? 'signInUp.signin.userNotFound' : 'signInUp.signin.systemError', lang));
              setSubmissionFailed(true);
              throw new Error(response.error);
            }

            const { Password: storedPassword, id } = response.data.user;
            const usr = response.data.user;
            const match = await bcrypt.compare(password, storedPassword);
            
            if (match) {
              signInWithEmailAndPassword(auth, email, password).then((useCredential) => {
                console.log(useCredential)
                navigate(paths.PROFILE);
              }).catch((error) => {
                console.log(error)
              })
            } else {
              setSubmissionFailedMsg(getText('signInUp.signin.incorrectUserOrPass', lang));
              setSubmissionFailed(true);
            }
        } catch (error) {
          const errorMessage = error.response?.data?.error || 'An error occurred during sign-in';
          setSubmissionFailedMsg(errorMessage);
          console.error('Sign-in error:', error);
          setSubmissionFailed(true);
          } finally {
            setLoading(false);
          }
       };


    return (
        <>
          <div className='container-signin'>
            <div className='sign-in-container-fields'>
                <h1>{getText('signInUp.signin.login',lang)}</h1>
              <div className='sign-in-container-textbox'>
                <Textbox
                  type="email"
                  placeholder={getText('signInUp.signin.email',lang)}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='sign-in-container-textbox'>
                <Textbox
                  type="password"
                  placeholder={getText('signInUp.signin.password',lang)}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button className='signin-btn' onClick={handleSubmit}>{loading ? <div className="spinner"></div> : getText('signInUp.signin.login',lang)}</Button>
              {submissionFailed && <p className='submission-message'>{submissionFailedMsg}</p>}
              <p className={`submission-message ${submissionFailed ? 'show' : ''}`}>{submissionFailed ? submissionFailedMsg : '\u00A0'}</p>
            </div>
            <div className='sign-in-container-image'>
                <img className='image-imgsrc-signin' src="/images/signin.jpg" alt="Description" />
            </div>
          </div>
        </>
      );
    }

export default SignIn;
