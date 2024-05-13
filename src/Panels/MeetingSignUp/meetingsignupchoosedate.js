import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Button, Textbox, PersonCard} from '../../Components/imports.js'
import Cookies from 'universal-cookie';
import {getText} from '../../Languages/languages'
import { validateEmail, validateName, isAllEmpty } from '../../Additional/validationutils.js';

//CSS IMPORTAS
import './meetingsignupchoosedate.css'
function MeetingSignUpChooseDate() {
    const cookies = new Cookies();
    const lang = cookies.get('lang');
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const handleNextRoom = useCallback(
        (data) => {
          navigate(`/meetingsignup-choosedate`);
        },
        [navigate]
      );

      const [selectedMonth, setSelectedMonth] = useState(null);

      const handleMonthClick = (month) => {
          setSelectedMonth(month);
      };

      const [selectedDay, setSelectedDay] = useState(null);

      const handleDayClick = (day) => {
          setSelectedDay(day);
      };
  
      // Create an array of numbers from 1 to 31
      const days = Array.from({length: 31}, (_, index) => index + 1);

      const [selectedTime, setSelectedTime] = useState(null);

    const handleTimeClick = (time) => {
        setSelectedTime(time);
    };

    // Generate time slots from 7:00 AM to 5:00 PM with 20-minute intervals
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


  return (
    <>
    <h1>
        Pasirinkite laiką!
    </h1>
    <h1>
        Mėnesis
    </h1>
    <div className="Month-Container">
            <Button className={selectedMonth === 'Sausis' ? 'selected' : ''} onClick={() => handleMonthClick('Sausis')}>Sausis</Button>
            <Button className={selectedMonth === 'Vasaris' ? 'selected' : ''} onClick={() => handleMonthClick('Vasaris')}>Vasaris</Button>
            <Button className={selectedMonth === 'Kovas' ? 'selected' : ''} onClick={() => handleMonthClick('Kovas')}>Kovas</Button>
            <Button className={selectedMonth === 'Balandis' ? 'selected' : ''} onClick={() => handleMonthClick('Balandis')}>Balandis</Button>
            <Button className={selectedMonth === 'Gegužė' ? 'selected' : ''} onClick={() => handleMonthClick('Gegužė')}>Gegužė</Button>
            <Button className={selectedMonth === 'Birželis' ? 'selected' : ''} onClick={() => handleMonthClick('Birželis')}>Birželis</Button>
            <Button className={selectedMonth === 'Liepa' ? 'selected' : ''} onClick={() => handleMonthClick('Liepa')}>Liepa</Button>
            <Button className={selectedMonth === 'Rugpjūtis' ? 'selected' : ''} onClick={() => handleMonthClick('Rugpjūtis')}>Rugpjūtis</Button>
            <Button className={selectedMonth === 'Rugsėjis' ? 'selected' : ''} onClick={() => handleMonthClick('Rugsėjis')}>Rugsėjis</Button>
            <Button className={selectedMonth === 'Spalis' ? 'selected' : ''} onClick={() => handleMonthClick('Spalis')}>Spalis</Button>
            <Button className={selectedMonth === 'Lapkritis' ? 'selected' : ''} onClick={() => handleMonthClick('Lapkritis')}>Lapkritis</Button>
            <Button className={selectedMonth === 'Gruodis' ? 'selected' : ''} onClick={() => handleMonthClick('Gruodis')}>Gruodis</Button>
    </div>
    <h1>
        Diena
    </h1>
    <div className="Day-Container">
            {days.map((day) => (
                <Button 
                    key={day}
                    className={selectedDay === day ? 'selected' : ''}
                    onClick={() => handleDayClick(day)}
                >
                    {day}
                </Button>
            ))}
        </div>
        <h1>
        Laikas
    </h1>
    <div className="Time-Container">
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
    <Button className='signup-btn' onClick={handleNextRoom}>Tęsti</Button>
    </>
  );
}

export default MeetingSignUpChooseDate;
