//BACK END SERVERIS
import { apiPaths } from '../../../Additional/serverPaths.js';

//IMPORTAI
import axios from 'axios';
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { auth } from '../../../Secure/firebase.js';
//CUSTOM IMPORTAI
import {getText} from '../../../Languages/languages'
import {Button, Textbox, MeetingCard, PhotoUploadContainer, TextArea} from '../../../Components/imports.js'
import { validateEmail, validateName, isAllEmpty } from '../../../Additional/validationutils.js';
//CSS IMPORTAS
import './ProfileSettings.css';
import Swal from 'sweetalert2';

function ProfileSettings() {
    const [userData, setUserData] = useState(null);
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [info, setInfo] = useState('')
    const [speciality, setSpeciality] = useState('')
    const [imageBuffer, setImageBuffer] = useState(null)
    const [Fullname, setFullname] = useState('')

    useEffect(() => {
        // Fetch user data from backend when component mounts
        const fetchUserData = async () => {
            try {
                const response = await axios.get(apiPaths.profileData(auth.currentUser.email));
                const userData = response.data.user;
                setEmail(userData.Email); 
                setPhone(userData.Phone);
                setInfo(userData.Info);
                setSpeciality(userData.Speciality)
                setFullname(userData.FirstName + ' ' + userData.LastName)
            } catch (error) {
                console.error('Error fetching user data:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to fetch user data',
                });
            }
        };

        fetchUserData(); // Call the fetchUserData function
    }, [email]);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleInfoChange = (event) => {
        if (event.target.value.length <= 150) {
            setInfo(event.target.value);
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Leidžiama įvesti tik iki 150 simbolių',
                position: 'top', // Set position to top-right corner
                showConfirmButton: false, // Hide the confirmation button
                toast: true, // Display as a toast
                timer: 3000 // Auto-close the toast after 3 seconds
              });
        }
    };

    const handleSpecialityChange = (event) => {
        setSpeciality(event.target.value);
    };

    const handlePhoneChange = (event) => {
        const inputValue = event.target.value;

        if (inputValue === '' || /^\+?\d*$/.test(inputValue)) {
            setPhone(inputValue);
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Telefono numerio formatas "+1234567.."',
                position: 'top', // Set position to top-right corner
                showConfirmButton: false, // Hide the confirmation button
                toast: true, // Display as a toast
                timer: 3000 // Auto-close the toast after 3 seconds
              });
        }
    };

    const HandleEmailCopy = (event) => {
        navigator.clipboard.writeText(email);
        Swal.fire({
            icon: 'success',
            text: 'El. pašto adresas nukopijuotas',
            position: 'top', // Set position to top-right corner
            showConfirmButton: false, // Hide the confirmation button
            toast: true, // Display as a toast
            timer: 3000 // Auto-close the toast after 3 seconds
          });
    }

    const HandlePhoneNoCopy = (event) => {
        navigator.clipboard.writeText(email);
        Swal.fire({
            icon: 'success',
            text: 'Telefono numeris nukopijuotas',
            position: 'top', // Set position to top-right corner
            showConfirmButton: false, // Hide the confirmation button
            toast: true, // Display as a toast
            timer: 3000 // Auto-close the toast after 3 seconds
          });
    }

    const HandleSpecialityCopy = (event) => {
        navigator.clipboard.writeText(speciality);
        Swal.fire({
            icon: 'success',
            text: 'Specialybės pav. nukopijuotas',
            position: 'top', // Set position to top-right corner
            showConfirmButton: false, // Hide the confirmation button
            toast: true, // Display as a toast
            timer: 3000 // Auto-close the toast after 3 seconds
          });
    }

    const HandleInfoCopy = (event) => {
        navigator.clipboard.writeText(info);
        Swal.fire({
            icon: 'success',
            text: 'Aprašas nukopijuotas',
            position: 'top', // Set position to top-right corner
            showConfirmButton: false, // Hide the confirmation button
            toast: true, // Display as a toast
            timer: 3000 // Auto-close the toast after 3 seconds
          });
    }


    const HandleSave = async (event) => {
        navigator.clipboard.writeText(email);
        try{
            const response = await axios.put(apiPaths.updateUser(auth.currentUser.email), {
                phone,
                imageBuffer,
                speciality, 
                info
            })
        }catch{
            Swal.fire({
                icon: 'error',
                text: 'Nepavyko išsaugoti duomenų',
                position: 'top', // Set position to top-right corner
                showConfirmButton: false, // Hide the confirmation button
                toast: true, // Display as a toast
                timer: 3000 // Auto-close the toast after 3 seconds
            });
            return; 
        }

        Swal.fire({
            icon: 'success',
            text: 'Duomenys išsaugoti',
            position: 'top', // Set position to top-right corner
            showConfirmButton: false, // Hide the confirmation button
            toast: true, // Display as a toast
            timer: 3000 // Auto-close the toast after 3 seconds
          });
    }

    return (
        <>
        <div className='profile-settings'>
            <div className='profile-data'>
                <div className='profile-data-photo'>
                    <PhotoUploadContainer setImageBuffer = {setImageBuffer} />
                    <h1>{Fullname}</h1>
                </div>
                <div className='profile-data-data'>
                <div className="input-group">
                    <div className='input-subGroup'>
                        <Textbox type="text" value={email} placeholder={"El. pašto adresas"} onChange={handleEmailChange} readOnly/>
                        <Button onClick={HandleEmailCopy}><img src="/images/copy.png" alt="Copy Icon"/></Button>
                    </div>
                    <div className='input-subGroup'>
                        <Textbox type="tel" inputMode="numeric" pattern="^\+?\d*$" value={phone} placeholder={"Telefono numeris"} onChange={handlePhoneChange}/>
                        <Button onClick={HandlePhoneNoCopy}><img src="/images/copy.png" alt="Copy Icon"/></Button>
                    </div>
                    <div className='input-subGroup'>
                        <Textbox type="text" value={speciality} placeholder={"Specialybė"} onChange={handleSpecialityChange}/>
                        <Button onClick={HandleSpecialityCopy}><img src="/images/copy.png" alt="Copy Icon"/></Button>
                    </div>
                    <div className='input-subGroup'>
                        <TextArea value={info} placeholder={"Aprašas"} onChange={handleInfoChange} rows={4}/>
                        <Button onClick={HandleInfoCopy}><img src="/images/copy.png" alt="Copy Icon"/></Button>
                    </div>
                    <div className='input-subGroupSave'>
                        <Button onClick={HandleSave}>Išsaugoti</Button>
                    </div>
                </div>
                </div>
            </div>
            <div className='profile-additional'>

            </div>
        </div>
        </>
    );

}

export default ProfileSettings;
