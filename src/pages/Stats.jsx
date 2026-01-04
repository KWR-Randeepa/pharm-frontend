import React, { useState, useEffect, useRef } from 'react';
import './Stats.css';
import { FaClinicMedical, FaMapMarkedAlt, FaChartLine } from 'react-icons/fa';

// Counter Component with Scroll Trigger
const Counter = ({ target, duration }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef(null);

  // 1. Setup Intersection Observer (Wait until visible to start)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); 
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 2. Counting Logic
  useEffect(() => {
    if (!isVisible) return; // Don't start if not visible

    // Parse the target number (removing any non-digit characters if present)
    const end = parseInt(String(target).replace(/\D/g, ''));
    if (end === 0) return;

    let startTimestamp = null;
    const stepDuration = duration * 1000; // convert seconds to ms

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / stepDuration, 1);
      
      // Math.floor(progress * end) creates the linear increment effect
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);

  }, [isVisible, target, duration]);

  return <span ref={countRef}>{count}</span>;
};

const Stats = () => {
  const statsData = [
    {
      id: 1,
      label: "Pharmacies Registered",
      number: 20,
      icon: <FaClinicMedical />, 
      suffix: "+"
    },
    {
      id: 2,
      label: "Active Locations",
      number: 10,
      icon: <FaMapMarkedAlt />, 
      suffix: ""
    },
    {
      id: 3,
      label: "Site Visits",
      number: 500,
      icon: <FaChartLine />, 
      suffix: "+"
    }
  ];

  return (
    <section className="stats-section">
      <div className="stats-container">
        {statsData.map((stat) => (
          <div key={stat.id} className="stat-card">
            <div className="stat-icon-box">{stat.icon}</div>
            <h2 className="stat-number">
              {/* Duration is in seconds. 2 seconds provides a smooth feel. */}
              <Counter target={stat.number} duration={2} />{stat.suffix}
            </h2>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;