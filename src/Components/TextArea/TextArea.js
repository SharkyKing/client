import React from 'react';
import './TextArea.css';

function TextArea({ placeholder, value, onChange, rows }) {
  return (
    <textarea className='textArea-input'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
    />
  );
}

export default TextArea;
