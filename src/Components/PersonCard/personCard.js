import React, { useState, useCallback, useEffect } from "react";
import './personCard.css'; // Import the CSS file for styling (optional)
import {Button, Textbox} from '../imports'

function PersonCard({ onClick, imgSource, className }) {
  const [useSpecialty, setUseSpecialty] = useState(true);
  
  return (
    <div className="personData">
      <div className={`personCard ${className}`} >
          <div className='personCard-image-container'>
              <img className='personCard-image' src={imgSource} alt="cardImage" />
          </div>
          <p className='personCard-data-name'>Vardas Pavardė</p>
      </div>
      <div className="personData-info">
        <div className='personData-info-role'>
            {useSpecialty &&
                <p>Specialybė</p>
            }
        </div>
        <div className="personData-info-about">
            <p>Info</p>
        </div>
        <div className="personData-info-confirm">
          <Button onClick={onClick}>Pasirinkti specialistą</Button>
        </div>
      </div>
    </div>
  );
}

export default PersonCard;
