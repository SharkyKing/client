import React, { useState } from 'react';
import './passwordstrengthmeter.css';
import {getText} from '../../Languages/languages'

function PasswordStrengthMeter({ password }) {
    const calculateStrength = (password) => {
        let strength = -1;
        // Check for password length
        if (password.length >= 8) strength += 1;
        // Check for uppercase letters
        if (/[A-Z]/.test(password)) strength += 1;
        // Check for lowercase letters
        if (/[a-z]/.test(password)) strength += 1;
        // Check for numbers
        if (/\d/.test(password)) strength += 1;
        // Check for special characters
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        return strength;
    };

    const getStrengthLabel = (strength) => {
        switch (strength) {
            case -1:
                return '\u00A0';
            case 0:
                return getText('passwordStrength.veryweak', 'lt');
            case 1:
                return getText('passwordStrength.weak', 'lt');
            case 2:
                return getText('passwordStrength.moderate', 'lt');
            case 3:
                return getText('passwordStrength.strong', 'lt');
            case 4:
                return getText('passwordStrength.verystrong', 'lt');
            default:
                return '\u00A0';
        }
    };

    const strength = calculateStrength(password);

    return (
        <div className="password-strength-meter">
            <progress
                className={`progress ${'progress-' + (strength > 4 ? 4 : strength)}`}
                value={strength}
                max="4"
            ></progress>
            <p className={`strength-label ${strength >-1 ? 'show' : ''}`}>{getStrengthLabel(strength)}</p>
        </div>
    );
}

export default PasswordStrengthMeter;
