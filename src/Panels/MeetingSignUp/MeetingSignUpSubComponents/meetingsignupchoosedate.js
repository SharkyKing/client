import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Button, Textbox, PersonCard} from '../../../Components/imports.js'
import Cookies from 'universal-cookie';
import {getText} from '../../../Languages/languages.js'
import { validateEmail, validateName, isAllEmpty } from '../../../Additional/validationutils.js';
import Swal from 'sweetalert2';

//CSS IMPORTAS
import './meetingsignupchoosedate.css'
function MeetingSignUpChooseDate({ setSelectedMonth, selectedMonth, setSelectedDay, selectedDay, setSelectedTime, selectedTime,handleFinish  }) {
    const cookies = new Cookies();
    const lang = cookies.get('lang');

    const handleNextRoom = useCallback(() => {
        handleFinish();

      }, [selectedMonth, selectedDay, selectedTime]);
    
    const handleTimeClick = (time) => {
        setSelectedTime(time);
    };

    const handleMonthClick = (month) => {
        setSelectedMonth(month);
    };

    const handleDayClick = (day) => {
        setSelectedDay(day);
    };

    const generateTimeSlots = () => {
        const timeSlots = [];
        for (let hour = 7; hour <= 17; hour++) {
            for (let minute = 0; minute < 60; minute += 20) {
                const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                timeSlots.push(time);
            }
        }
        return timeSlots;
    };

    const timeSlots = generateTimeSlots();
    const days = Array.from({length: 31}, (_, index) => index + 1);

  return (
    <>
    <div className="topheader">
    <h1>
        Pasirinkite laiką!
    </h1>
    <h2>
        {selectedMonth}-{selectedDay}  {selectedTime} h
    </h2>
    <Button className='datechosen-btn' onClick={handleNextRoom}>Užbaigti registraciją!</Button>
    </div>
    <div className="dateselector-container">
    <div className="Month-Container">
        <h1>
            Mėnesis
        </h1>
        <div className="Month-Container-scroll">
            <Button className={selectedMonth === '01' ? 'selected' : ''} onClick={() => handleMonthClick('01')}>Sausis</Button>
            <Button className={selectedMonth === '02' ? 'selected' : ''} onClick={() => handleMonthClick('02')}>Vasaris</Button>
            <Button className={selectedMonth === '03' ? 'selected' : ''} onClick={() => handleMonthClick('03')}>Kovas</Button>
            <Button className={selectedMonth === '04' ? 'selected' : ''} onClick={() => handleMonthClick('04')}>Balandis</Button>
            <Button className={selectedMonth === '05' ? 'selected' : ''} onClick={() => handleMonthClick('05')}>Gegužė</Button>
            <Button className={selectedMonth === '06' ? 'selected' : ''} onClick={() => handleMonthClick('06')}>Birželis</Button>
            <Button className={selectedMonth === '07' ? 'selected' : ''} onClick={() => handleMonthClick('07')}>Liepa</Button>
            <Button className={selectedMonth === '08' ? 'selected' : ''} onClick={() => handleMonthClick('08')}>Rugpjūtis</Button>
            <Button className={selectedMonth === '09' ? 'selected' : ''} onClick={() => handleMonthClick('09')}>Rugsėjis</Button>
            <Button className={selectedMonth === '10' ? 'selected' : ''} onClick={() => handleMonthClick('10')}>Spalis</Button>
            <Button className={selectedMonth === '11' ? 'selected' : ''} onClick={() => handleMonthClick('11')}>Lapkritis</Button>
            <Button className={selectedMonth === '12' ? 'selected' : ''} onClick={() => handleMonthClick('12')}>Gruodis</Button>
        </div>
    </div>
    <div className="Day-Container">
        <h1>
            Diena
        </h1>
        <div className="Day-Container-scroll">
        {days.map((day) => (
            <Button 
                key={String(day).padStart(2, '0')}
                className={selectedDay === String(day).padStart(2, '0') ? 'selected' : ''}
                onClick={() => handleDayClick(String(day).padStart(2, '0'))}
            >
                {String(day).padStart(2, '0')}
            </Button>
        ))}
        </div>
    </div>
    
    <div className="Time-Container">
        <h1>
            Laikas
        </h1>
        <div className="Time-Container-scroll">
            {timeSlots.map((time) => (
                <Button 
                    key={time}
                    className={selectedTime === time ? 'selected' : ''}
                    onClick={() => handleTimeClick(time)}
                >
                    {time}
                </Button>
            ))}
        </div>    
    </div>
    </div> 
    </>
  );
}

export default MeetingSignUpChooseDate;
