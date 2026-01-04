import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

import SearchIcon from '../../assets/search.svg';

const HeroSection = () => {

  const [query, setQuery] = useState('');
  
  const navigate = useNavigate();

  
  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!query.trim()) return;

    // Navigate to Home page with the query param
    navigate(`/home?drug=${encodeURIComponent(query)}`);
  };

  return (
    <section className="hero-container">
      <h1 className="hero-title">Find Your Medicine Instantly</h1>

      <form className="search-wrapper" onSubmit={handleSearch}>
        <div className="search-bar">
          
          {/* Search Input (Placeholder simplified) */}
          <input
            type="text"
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Enter Medicine Name eg:panadol...`}
            required
          />

          <button type="submit" className="search-button">
            <img src={SearchIcon} alt="Search" className="search-icon" />
          </button>
        </div>
      </form>

     
      
    </section>
  );
};

export default HeroSection;