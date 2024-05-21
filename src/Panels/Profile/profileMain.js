//BACK END SERVERIS
import { apiPaths } from '../../Additional/serverPaths.js';

//IMPORTAI
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import moment from 'moment';

import ProfileWorktimeSettings from "./ProfileSubComponents/ProfileWorktimeSettings.js";

//CUSTOM IMPORTAI
import {getText} from '../../Languages/languages'
import {Button, Textbox, PersonCard} from '../../Components/imports.js'
//CSS IMPORTAS
import './profileMain.css';
const ProfileTabStates = {
    MAIN: 0,
    WORKTIME: 1,
    TEMPLATES: 2,
  };

function ProfileMain() {
    const [ProfileTabState, setProfileTabState] = useState(ProfileTabStates.WORKTIME);

    return (
        <>
            <div className='profile-tab-control'>
                <Button>Pagrindinis</Button>
                <Button>Užimtumas</Button>
                <Button>Šablonai</Button>
            </div>
            {ProfileTabState === ProfileTabStates.MAIN && (
                <>
                </>
            )}
            {ProfileTabState === ProfileTabStates.WORKTIME && (
                <>
                    <ProfileWorktimeSettings/>
                </>
            )}
            {ProfileTabState === ProfileTabStates.TEMPLATES && (
                <>
                </>
            )}
        </>
    );

}

export default ProfileMain;
