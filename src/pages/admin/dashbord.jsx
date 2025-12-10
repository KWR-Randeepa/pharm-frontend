import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css'; // Keeps your card styling

const Dashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // --- 1. Helper to get Token safely ---
  const getToken = () => {
    const rawData = localStorage.getItem('userToken') || 
                    localStorage.getItem('userInfo') || 
                    localStorage.getItem('token');
    if (!rawData) return null;
    try {
      if (rawData.includes('{')) {
         const parsed = JSON.parse(rawData);
         return parsed.token || parsed;
      }
    } catch (e) {}
    return rawData.replace(/^"|"$/g, '');
  };

  // --- 2. Fetch Data (Only to count items) ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        if (!token) {
           setError("Please log in.");
           setLoading(false);
           return;
        }

        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        // We still fetch the list so we can count the "In Stock" items
        const { data } = await axios.get('http://localhost:5000/api/inventory/my-medicines', config);
        
        setInventory(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        // Optional: fail silently so the dashboard just shows 0 instead of an error
      }
    };

    fetchData();
  }, []);

  // --- 3. Calculate the numbers ---
  const totalProducts = inventory.length;
  const inStockCount = inventory.filter(item => item.status === 'In Stock').length;
  const outOfStockCount = inventory.filter(item => item.status === 'Out of Stock').length;

  if (loading) return <div className="loading-state">Loading Stats...</div>;

  return (
    <div className="inventory-container">
      <div className="inventory-header" style={{ borderBottom: 'none' }}>
        <h2>Dashboard Overview</h2>
      </div>

      {/* --- THE CARDS --- */}
      <div className="stats-grid">
        
        {/* Card 1: Total */}
        <div className="stat-card stat-total">
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
        </div>
        
        {/* Card 2: In Stock */}
        <div className="stat-card stat-in-stock">
          <h3>In Stock</h3>
          <p>{inStockCount}</p>
        </div>
        
        {/* Card 3: Out of Stock */}
        <div className="stat-card stat-out">
          <h3>Out of Stock</h3>
          <p>{outOfStockCount}</p>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;