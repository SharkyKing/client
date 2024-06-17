import React from 'react';
import './TextArea.css';

function TextArea({ placeholder, value, onChange, rows, onKeyDown, readOnly }) {
  return (
    <textarea className='textArea-input'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        onKeyDown={onKeyDown}
        readOnly={readOnly}
    />
  );
}

export default TextArea;
