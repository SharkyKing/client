//BACK END SERVERIS
import { apiPaths } from '../../../Additional/serverPaths.js';

//IMPORTAI
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import moment from 'moment';

//CUSTOM IMPORTAI
import {getText} from '../../../Languages/languages'
import {Button, Textbox, PersonCard} from '../../../Components/imports.js'
import MonthView from './WorkTimeViews/MonthView.js';
//CSS IMPORTAS
import './ProfileWorktimeSettings.css';

function ProfileWorktimeSettings() {
    return (
        <>
            <div className='worktime-container'>
                <div className='worktime-view-select'>
                    <Button>Mėnesis</Button>
                    <Button>Savaitė</Button>
                    <Button>Diena</Button>
                </div>
                <div className='worktime-view'>
                    <MonthView/>
                </div>
            </div>
        </>
    );

}

export default ProfileWorktimeSettings;
