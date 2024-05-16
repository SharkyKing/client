import React from 'react';
import './button.css'; // Import the CSS file for styling (optional)

const Button = ({ onClick, disabled, children, className }) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <button className={`button ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
