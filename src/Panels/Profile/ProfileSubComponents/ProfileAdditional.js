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

function ProfileAdditional() {

    return (
        <>
        <div className='profile-additional'>
        </div>
        </>
    );

}

export default ProfileAdditional;
