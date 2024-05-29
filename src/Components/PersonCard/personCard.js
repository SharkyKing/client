import React, { useState, useCallback, useEffect } from "react";
import './personCard.css'; // Import the CSS file for styling (optional)
import {Button, Textbox} from '../imports'

function PersonCard({ onClick, imgSource, className, setState, name, speciality, info }) {
  const [useSpecialty, setUseSpecialty] = useState(true);
  
  const  handleNext = () => {
    setState(1)
    onClick()
  }

  return (
    <div className="personData">
      <div className={`personCard ${className}`} >
          <div className='personCard-image-container'>
              <img className='personCard-image' src={imgSource} alt="cardImage" />
          </div>
          <p className='personCard-data-name'>{name}</p>
      </div>
      <div className="personData-info">
        <div className='personData-info-role'>
            {useSpecialty &&
                <p>{speciality}</p>
            }
        </div>
        <div className="personData-info-about">
            <p>{info}</p>
        </div>
        <div className="personData-info-confirm">
          <Button onClick={handleNext}>Pasirinkti specialistą</Button>
        </div>
      </div>
    </div>
  );
}

export default PersonCard;
