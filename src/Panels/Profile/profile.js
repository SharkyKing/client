//BACK END SERVERIS
import { apiPaths } from '../../Additional/serverPaths.js';

//IMPORTAI
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import moment from 'moment';

//CUSTOM IMPORTAI
import {getText} from '../../Languages/languages'

//CSS IMPORTAS
import './profile.css';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const cookies = new Cookies();
  const lang = cookies.get('lang');
  const userID = cookies.get('userID'); // Replace with your actual email


  const formattedCreatedAt = userData?.createdAt
  ? moment(userData.createdAt).format('YYYY-MM-DD HH:mm')
  : '';

  const formattedUpdatedAt = userData?.createdAt
  ? moment(userData.updatedAt).format('YYYY-MM-DD HH:mm')
  : '';
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null); // Clear any previous errors before fetching
      try {
        const response = await axios.get(`${apiPaths.profileData(userID)}`);
        setUserData(response.data.user)
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error); // Store the error for displaying
      } finally {
        setIsLoading(false);
      }
    };
  
      fetchData();
    }, []); // Empty dependency array ensures data is fetched only once on component mount
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      // Implement logic to submit updated user data to the server (e.g., using axios.put)
      console.log('Submitted user data:', userData); // For now, just log the data
    };

  return (
    <>
      <div className="profile-container">
        <h2>{getText('profile.settings',lang)}</h2>
        {isLoading && <p>Loading user data...</p>}
      {error && <p>Error: {error.message}</p>}
      {true && ( // Only render the form if userData is available
        <form onSubmit={handleSubmit}>
          <div className="profile-field">
            <label htmlFor="FirstName" className="profile-label">
              {getText('profile.firstName',lang)}
            </label>
            <input
              type="text"
              id="FirstName"
              name="FirstName"
              className="profile-input"
              value={userData?.FirstName || 'Nodata'} // Handle potential undefined values
              readOnly
            />
          </div>
          <div className="profile-field">
            <label htmlFor="lastName" className="profile-label">
              {getText('profile.lastName',lang)}
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="profile-input"
              value={userData?.LastName || 'Nodata'}
              readOnly
            />
          </div>
          <div className="profile-field">
            <label htmlFor="email" className="profile-label">
              {getText('profile.email',lang)}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="profile-input"
              value={userData?.Email || 'Nodata'}
              disabled // Keep email address read-only
            />
          </div>
          <div className="profile-field">
            <label htmlFor="createdAt" className="profile-label">
              {getText('profile.createdAt',lang)}
            </label>
            <span id="createdAt" className="profile-input" disabled>
            {formattedCreatedAt} 
            </span>
          </div>
          <div className="profile-field">
            <label htmlFor="updatedAt" className="profile-label">
              {getText('profile.updatedAt',lang)}
            </label>
            <span id="updatedAt" className="profile-input" disabled>
            {formattedUpdatedAt} 
            </span>
          </div>
        </form>
      )}
      </div>
    </>
  );

}

export default Profile;
