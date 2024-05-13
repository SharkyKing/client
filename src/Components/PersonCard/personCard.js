import React from 'react';
import './personCard.css'; // Import the CSS file for styling (optional)

function PersonCard({ onClick, imgSource, className }) {
  return (
    <div className={`personCard ${className}`} onClick={onClick}>
        <div className='personCard-role-container'>
            <p className='personCard-role'>Specialybė</p>
        </div>
        <div className='personCard-image-container'>
            <img className='personCard-image' src={imgSource} alt="cardImage" />
        </div>
        <div className='personCard-data-container'>
            <p className='personCard-data-name'>Vardas Pavardė</p>
        </div>
    </div>
  );
}

export default PersonCard;
