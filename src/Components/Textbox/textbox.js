import React from 'react';
import './textbox.css';

function TextBox({ type,placeholder, value, onChange, readOnly }) {
  return (
    <input className='textbox-input'
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
    />
  );
}

export default TextBox;
