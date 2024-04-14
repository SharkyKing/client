import React from 'react';
import './textbox.css';

function TextBox({ type,placeholder, value, onChange }) {
  return (
    <input className='texbox-input'
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default TextBox;
