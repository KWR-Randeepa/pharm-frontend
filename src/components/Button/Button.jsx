import React from 'react';
import './Button.css';

const Button = ({ type = 'light', text }) => {
  return <button className={`btn btn-${type}`}>{text}</button>;
};

export default Button;
