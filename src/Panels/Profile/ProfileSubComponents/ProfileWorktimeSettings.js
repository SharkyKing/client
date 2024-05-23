//BACK END SERVERIS
import { apiPaths } from '../../../Additional/serverPaths.js';

//IMPORTAI
import axios from 'axios';
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Typography, Row, Tabs } from 'antd';
import Cookies from 'universal-cookie';
import moment from 'moment';
import { Scheduler, SchedulerData, ViewType, DATE_FORMAT } from "react-big-schedule";
import dayjs from "dayjs";
import "react-big-schedule/dist/css/style.css";

import SourceCode from './SchedulerComponents/SourceCode';
import Fallback from './SchedulerComponents/Fallback';

//CUSTOM IMPORTAI
import {getText} from '../../../Languages/languages'
import {Button, Textbox, PersonCard} from '../../../Components/imports.js'
//CSS IMPORTAS
import './ProfileWorktimeSettings.css';

const ClassBasedComponent = lazy(() => import('./SchedulerComponents/classbasedScheduler.js'));
//https://github.com/react-scheduler/react-big-schedule
function ProfileWorktimeSettings() {
    const [type, setType] = useState('class-based');

    const items = [
        {
          key: 'class-based',
          label: 'Class',
          children: (
            <Suspense fallback={<Fallback />}>
              <ClassBasedComponent />
            </Suspense>
          ),
        }
      ];

    return (
        <>
            <div className='worktime-container'>
                <div className='worktime-view'>
                    <Tabs activeKey={type} items={items} onChange={setType} />
                </div>
            </div>
        </>
    );

}

export default ProfileWorktimeSettings;
