import React, { useState } from 'react';
import axios from 'axios';
import './AddTestMed.css';
import toast ,{Toaster}from 'react-hot-toast';

const AddMedicine = () => {
  const [formData, setFormData] = useState({
    brandName: '',
    genericName: '',
    description: '',
    status: 'In Stock'
  });

  const [message, setMessage] = useState({ text: '', type: '' });

  // Handle text field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Get the Pharmacy ID (Assuming it's stored in localStorage after login)
    // If you use Context API or Redux, fetch it from there instead.
    const pharmacyId = localStorage.getItem('pharmacyId') || localStorage.getItem('userToken'); 
    console.log("Attempting to submit...");
    console.log("Found Token:", pharmacyId);
    const config = {
    headers: {
      Authorization: `Bearer ${pharmacyId}`, // <--- CRITICAL: Must include "Bearer " space token
    },
  };
    if (!pharmacyId) {
      setMessage({ text: 'Error: You are not logged in.', type: 'error' });
      return;
    }

    try {
      // 2. Send data to your backend
      // Note: Your backend route needs to handle looking up/creating the 'Medicine' 
      // based on the brandName/genericName sent here.
     const response = await axios.post(
      'http://localhost:5000/api/inventory/add',  // Ensure NO trailing slash or ID
      formData,                                   // Body: { brandName, genericName, ... }
      config                                      // Headers here
    );
      toast.success("Medicine added successfully!");
      //setMessage({ text: 'Medicine added successfully!', type: 'success' });
      
      // Clear form
      setFormData({
        brandName: '',
        genericName: '',
        description: '',
        status: 'In Stock'
      });

    } catch (error) {
      console.error(error);
      toast.error("Error adding medicine. Please try again.");
      //setMessage({ text: 'Failed to save medicine. Try again.', type: 'error' });
    }
  };

  return (
    <div className="add-medicine-container">
      <Toaster/>
      <Toaster position="top-center" reverseOrder={false}/>
      <div className="form-card">
        <h2>Add Inventory Item</h2>
        

        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Brand Name</label>
            <input
              type="text"
              name="brandName"
              value={formData.brandName}
              onChange={handleChange}
              placeholder="e.g. Panadol"
              required
            />
          </div>

          <div className="form-group">
            <label>Generic Name</label>
            <input
              type="text"
              name="genericName"
              value={formData.genericName}
              onChange={handleChange}
              placeholder="e.g. Paracetamol"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter dosage or details..."
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            Save Medicine
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMedicine;