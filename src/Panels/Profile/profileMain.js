//BACK END SERVERIS
import { apiPaths } from '../../Additional/serverPaths.js';

//IMPORTAI
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import moment from 'moment';

import ProfileSettings from "./ProfileSubComponents/ProfileSettings.js";

//CUSTOM IMPORTAI
import {getText} from '../../Languages/languages'
import {Button, Textbox, PersonCard} from '../../Components/imports.js'
//CSS IMPORTAS
import './profileMain.css';
const ProfileTabStates = {
    MAIN: 0,
    TEMPLATES: 2,
  };

function ProfileMain() {
    const [ProfileTabState, setProfileTabState] = useState(ProfileTabStates.MAIN);

    return (
        <>
            <div className='profile-tab-control'>
                <Button onClick={() => setProfileTabState(ProfileTabStates.MAIN)} className={ProfileTabState === ProfileTabStates.MAIN ? 'active' : ''}>Pagrindinis</Button>
                <Button onClick={() => setProfileTabState(ProfileTabStates.TEMPLATES)} className={ProfileTabState === ProfileTabStates.TEMPLATES ? 'active' : ''}>Šablonai</Button>
            </div>
            <div className='profile-containers'>
            {ProfileTabState === ProfileTabStates.MAIN && (
                <>
                    <ProfileSettings/>
                </>
            )}
            {ProfileTabState === ProfileTabStates.TEMPLATES && (
                <>
                </>
            )}
            </div>
        </>
    );

}

export default ProfileMain;
