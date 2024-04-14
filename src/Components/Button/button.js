import React from 'react';
import './button.css'; // Import the CSS file for styling (optional)

function Button({ onClick, children, className }) {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
