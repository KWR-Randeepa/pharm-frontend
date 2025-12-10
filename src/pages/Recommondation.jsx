import React, { useState, useEffect } from 'react';
import './Recommondation.css';

const reviewsData = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "User",
    image: "https://i.pravatar.cc/150?img=1", // Random avatar
    text: "This service is absolutely amazing. I was able to find exactly what I needed in seconds. Highly recommended!",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "User",
    image: "https://i.pravatar.cc/150?img=11",
    text: "Great user interface and smooth experience.",
    rating: 4
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "User",
    image: "https://i.pravatar.cc/150?img=5",
    text: "The customer support team went above and beyond to help me resolve my issue. 10/10 service.",
    rating: 5
  }
];

const Reviews = () => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-change logic
  useEffect(() => {
    // If user is hovering, don't change the slide
    if (isHovered) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % reviewsData.length);
    }, 4000); // Change every 4 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % reviewsData.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + reviewsData.length) % reviewsData.length);
  };

  const { name, role, image, text, rating } = reviewsData[index];

  return (
    <div className="review-section">
      <h2 className="section-title">What Our Users Say</h2>
      
      <div 
        className="review-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="review-image-container">
          <img src={image} alt={name} className="review-img" />
          <span className="quote-icon">"</span>
        </div>
        
        <h3 className="author-name">{name}</h3>
        <p className="author-role">{role}</p>
        
        <div className="stars">
            {/* Simple logic to render stars based on rating */}
            {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
        </div>
        
        <p className="review-text">{text}</p>

        <div className="button-container">
          <button className="nav-btn" onClick={handlePrev}>❮</button>
          <button className="nav-btn" onClick={handleNext}>❯</button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;