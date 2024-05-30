import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Button, Textbox, PersonCard} from '../../../Components/imports.js'
import Cookies from 'universal-cookie';
import {getText} from '../../../Languages/languages.js'
import { validateEmail, validateName, isAllEmpty } from '../../../Additional/validationutils.js';
import Swal from 'sweetalert2';
import { apiPaths } from '../../../Additional/serverPaths.js'
import axios from 'axios';
//CSS IMPORTAS
import './meetingsignupchooseperson.css'
function MeetingSignUpChoosePerson({ setStateChange, State, setChosenConsultant }) {
    const cookies = new Cookies();
    const lang = cookies.get('lang');
    const [users, setUsers] = useState([]);

    useEffect(() => {
      // Fetch users from the backend
      const fetchUsers = async () => {
          try {
              const response = await axios.get(apiPaths.getAllUsers());
              setUsers(response.data);
          } catch (error) {
              console.error('Error fetching users:', error);
          }
      };

      fetchUsers();
    }, []);

    const  handleNext = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "To change consultant choose \"Specialistas\" in nvaigation!",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, my choice is correct!"
      }).then((result) => {
        if (result.isConfirmed) {
          setStateChange(State)   
        }
      });
    }

  return (
    <>
    <h1>
        Pasirinkite specialistą!
    </h1>
    <div className="Persons-Container">
        {users.map((user) => (
            <PersonCard
                key={user.id}
                imgSource={'/images/doctor1.jpg'} // Assuming you have a default avatar image
                name={`${user.FirstName} ${user.LastName}`} // Assuming you have a name field
                speciality={`${user.Speciality}`}
                setState={setChosenConsultant}
                info={`${user.Info}`}
                onClick={() => {
                  console.log("UserID:", user.id)
                    setChosenConsultant(user.id); // Pass the chosen user back to the parent component
                    handleNext();
                }}
            />
        ))}
    </div>
    </>
  );
}

export default MeetingSignUpChoosePerson;
