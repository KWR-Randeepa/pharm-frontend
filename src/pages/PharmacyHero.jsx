import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './PharmacyHero.css';

const PharmacyHero = () => {
  const navigate = useNavigate(); 

  const handleRegisterClick = () => {
  
    navigate('/pharmacy-registration');
  };

  return (
    <div className="ph-hero-wrapper">
      {/* Background Decorative Blobs */}
      <div className="ph-blob ph-blob-1"></div>
      <div className="ph-blob ph-blob-2"></div>
      <div className="ph-blob ph-blob-3"></div>
      <div className="ph-blob ph-blob-4"></div>
      
      {/* Animating Pills */}
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={`med-${i}`} className={`ph-medication-icon ph-med-${i}`}></div>
      ))}

      {/* Animating Tablets */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={`tab-${i}`} className={`ph-tablet-icon ph-tab-${i}`}></div>
      ))}

      {/* Main Hero Card */}
      <div className="ph-card-container">
        <div className="ph-hero-card">
          <h1 className="ph-hero-title">
            Register Your <br />
            <span className="ph-highlight">Pharmacy</span> <br />
            With Ease
          </h1>
          
          <p className="ph-hero-description">
            Become part of our trusted healthcare network. <br />
            Make your pharmacy visible, accessible, and ready for customers.
          </p>

          <button 
            className="ph-register-btn" 
            onClick={handleRegisterClick} 
          >
            REGISTER NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default PharmacyHero;