//BACK END SERVERIS
import { apiPaths } from '../../Additional/serverPaths.js';

//IMPORTAI
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import Cookies from 'universal-cookie';
import bcrypt from 'bcryptjs';

//CUSTOM IMPORTAI
import {Button, Textbox} from '../../Components/imports.js'
import PasswordStrengthMeter from '../../Components/PasswordStrengthMeter/passwordstrengthmeter.js';
import { validateEmail, validateName, validatePassword, isAllEmpty } from '../../Additional/validationutils.js';
import { paths } from '../../Additional/paths.js';
import {getText} from '../../Languages/languages'

//CSS IMPORTAS
import './signup.css'



function SignUp({login}) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      repeatPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [submissionFailed, setSubmissionFailed] = useState(false);
    const [submissionFailedMsg, setSubmissionFailedMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const cookies = new Cookies();
    const lang = cookies.get('lang');
    const saltRounds = 10;

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: name === 'email' ? !validateEmail(value) : !validateName(value) });
    };

    const resetForm = () => {
      setFormData({ email: '', firstname: '', lastname: '', password: '', repeatPassword: '' });
      setSubmissionFailed(false);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);

      const allValues = Object.values(formData);
      const formErrors = Object.keys(formData).reduce((acc, key) => {
        acc[key] = key === 'email' ? !validateEmail(formData[key]) : !validateName(formData[key]);
        return acc;
      }, {});

      if (isAllEmpty(allValues) || Object.values(formErrors).some(Boolean)) {
        setSubmissionFailedMsg(getText(isAllEmpty(allValues) ? 'signInUp.signup.fillall' : 'signInUp.signup.validinfo', lang));
        setSubmissionFailed(true);
        setLoading(false);
        return;
      }

      try {
        const hashedPassword = await bcrypt.hash(formData.password, saltRounds);

        const response = await axios.post(apiPaths.signUpPath(), {
          email: formData.email,
          firstname: formData.firstname,
          lastname: formData.lastname,
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
                  value={formData.email}
                  onChange={handleInputChange}
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
                  value={formData.firstname}
                  onChange={handleInputChange}
                  className={errors.firstname ? 'error' : ''}
                  autoComplete="off"
                />
                <p className={`error-message ${errors.firstname ? 'show' : ''}`}>{errors.firstname ? getText('signInUp.signup.firstNameOnlyLetters',lang) : '\u00A0'}</p>
              </div>
              <div className='container-textbox'>
                <Textbox
                  type="text"
                  placeholder={getText('signInUp.signup.lastname',lang)}
                  value={formData.lastname}
                  onChange={handleInputChange}
                  className={errors.lastname ? 'error' : ''}
                  autoComplete="off"
                />
                <p className={`error-message ${errors.lastname ? 'show' : ''}`}>{errors.lastname ? getText('signInUp.signup.lastNameOnlyLetters',lang) : '\u00A0'}</p>
              </div>
              <div className='container-textbox'>
                <Textbox
                  type="password"
                  placeholder={getText('signInUp.signup.password',lang)}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? 'error' : ''}
                  autoComplete="off"
                />
                <PasswordStrengthMeter password={formData.password} />
              </div>
              <div className='container-textbox'>
                <Textbox
                  type="password"
                  placeholder={getText('signInUp.signup.repeatPassword',lang)}
                  value={formData.repeatPassword}
                  onChange={handleInputChange}
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
                <img className='image-imgsrc-signup' src="/images/signupimage.jpg" alt="signupimg" />
            </div>
          </div>
        </>
      );
    }

export default SignUp;
