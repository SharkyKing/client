export const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(String(email).toLowerCase());
};

export const validateName = (name) => {
    const namePattern = /^[a-zA-Z\s]*$/;
    return namePattern.test(String(name));
};

export const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[A-Z]).{8,}$/;
    return passwordPattern.test(password);
};

export const isEmpty = (value) => {
    return !value.trim(); 
};

export const isAllEmpty = (values) => {
    return values.some(value => !value.trim()); // Returns true if any value is empty or contains only whitespace
};