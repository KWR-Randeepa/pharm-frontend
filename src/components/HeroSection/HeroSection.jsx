import React, { useState } from 'react'; // Removed useEffect, useRef
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';
// import Button from '../Button/Button'; // Removed if not used
import SearchIcon from '../../assets/search.svg';

const HeroSection = () => {
  // Removed categoryOpen, selectedCategory, dropdownRef states/variables
  const [query, setQuery] = useState('');
  
  const navigate = useNavigate();

  // Removed categories array

  // Removed useEffect (for handleClickOutside)
  // Removed handleSelectCategory

  // Updated handleSearch logic (simplified as category is always 'Medicine')
  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!query.trim()) return;

    // Navigate to Home page with the query param
    navigate(`/home?drug=${encodeURIComponent(query)}`);
  };

  return (
    <section className="hero-container">
      <h1 className="hero-title">Healthy Tablets and Medicine</h1>

      <form className="search-wrapper" onSubmit={handleSearch}>
        <div className="search-bar">
          
          {/* Search Input (Placeholder simplified) */}
          <input
            type="text"
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search for medicine...`}
            required
          />

          <button type="submit" className="search-button">
            <img src={SearchIcon} alt="Search" className="search-icon" />
          </button>
        </div>
      </form>

      {/* Action Buttons removed as they were not in the snippet and might be unused */}
      {/* If you need them back, let me know! */}
      
    </section>
  );
};

export default HeroSection;