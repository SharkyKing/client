import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Button, Textbox, PersonCard} from '../../../Components/imports.js'
import Cookies from 'universal-cookie';
import {getText} from '../../../Languages/languages.js'
import { validateEmail, validateName, isAllEmpty } from '../../../Additional/validationutils.js';
import Swal from 'sweetalert2';

//CSS IMPORTAS
import './meetingsignupchoosedate.css'
function MeetingSignUpChooseDate() {
    const cookies = new Cookies();
    const lang = cookies.get('lang');

    const days = Array.from({length: 31}, (_, index) => index + 1);

    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const handleNextRoom = useCallback(() => {
        if (selectedMonth === null || selectedDay === null || selectedTime === null) {
            if(selectedMonth === null){
                Swal.fire({
                    icon: "error",
                    title: "Nepasirinktas mėnesis"
                  });
                  return;
            }
            if(selectedDay === null){
                Swal.fire({
                    icon: "error",
                    title: "Nepasirinkta diena"
                  });
                  return;
            }
            if(selectedTime === null){
                Swal.fire({
                    icon: "error",
                    title: "Nepasirinktas laikas"
                  });   
                  return;
            }
        }

        Swal.fire({
            title: "Išsiuntemė jums kodą nurodytu telefono numeriu, gavus kodą, įrašykite jį :)",
            input: "text",
            inputAttributes: {
              autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Patvirtinti",
            cancelButtonText: "Atšaukti",
            showLoaderOnConfirm: true,
            preConfirm: async (login) => {
              try {
                console.log("YEY")
              } catch (error) {
                Swal.showValidationMessage(`
                  Request failed: ${error}
                `);
              }
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: `${result.value.login}'s avatar`,
                imageUrl: result.value.avatar_url
              });
            }
          });

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


  return (
    <>
    <div className="topheader">
    <h1>
        Pasirinkite laiką!
    </h1>
    <Button className='datechosen-btn' onClick={handleNextRoom}>Užbaigti registraciją!</Button>
    </div>
    <div className="dateselector-container">
    <div className="Month-Container">
        <h1>
            Mėnesis
        </h1>
        <div className="Month-Container-scroll">
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
    </div>
    <div className="Day-Container">
        <h1>
            Diena
        </h1>
        <div className="Day-Container-scroll">
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
