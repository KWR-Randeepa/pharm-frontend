import React from 'react';
import './registerSection.css';
import { useNavigate } from 'react-router-dom';

// ERROR FIX: Capitalized 'R' in RegisterSection
const RegisterSection = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    // Navigate to the route defined in App.js for registration
    navigate('/pharmacy-registration'); 
  };

  return (
    <div className="container">
      {/* Background Decor */}
      <div className="blob blob-1"></div>
      
      <div className="card">
        <h1 className="heading">
          Register Your <br />
          Pharmacy <br />
          With Ease
        </h1>
        <p className="subtext">
          Become part of our trusted healthcare network.
          Make your pharmacy visible, accessible, and ready
          for customers.
        </p>
        <button className="button" onClick={handleRegisterClick}>
          REGISTER NOW
        </button>
      </div>
    </div>
  );
};

export default RegisterSection;