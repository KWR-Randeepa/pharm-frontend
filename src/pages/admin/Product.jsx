import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Product.css';

const InventoryTable = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // NEW: State to track which item is being deleted (null = modal closed)
  const [itemToDelete, setItemToDelete] = useState(null);

  // --- HELPER: Get Token ---
  const getToken = () => {
    const rawData = localStorage.getItem('userToken') ;
                  
    if (!rawData) return null;
    try {
      if (rawData.includes('{')) {
         const parsed = JSON.parse(rawData);
         return parsed.token || parsed;
      }
    } catch (e) {}
    return rawData.replace(/^"|"$/g, '');
  };

  const fetchInventory = async () => {
    try {
      const token = getToken();
      if (!token) {
        setError('No authentication token found.');
        setLoading(false);
        return;
      }
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get('http://localhost:5000/api/inventory/my-medicines', config);
      setInventory(data);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 401) {
          setError("Session expired. Please login again.");
      } else {
          setError(err.response?.data?.message || err.message);
      }
      setLoading(false);
    }
  };

  // 1. User clicks "Remove" -> Open Modal
  const initiateDelete = (id) => {
    setItemToDelete(id);
  };

  // 2. User clicks "Cancel" -> Close Modal
  const cancelDelete = () => {
    setItemToDelete(null);
  };

  // 3. User clicks "Yes, Delete" -> Actually delete from DB
  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      const token = getToken();
      if (!token) return alert("Not authorized");

      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      await axios.delete(`http://localhost:5000/api/inventory/${itemToDelete}`, config);
      
      // Close modal and refresh list
      setItemToDelete(null);
      fetchInventory(); 
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
      setItemToDelete(null); // Close modal even on error
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  if (loading) return <div className="loading-state">Loading inventory...</div>;
  if (error) return <div className="error-state">{error}</div>;

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <h2>Pharmacy Inventory</h2>
      </div>
      
      {inventory.length === 0 ? (
        <div className="empty-state">
          <p>No medicines in stock.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Brand Name</th>
                <th>Generic Name</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item._id}>
                  <td><strong>{item.brandName}</strong></td> 
                  <td>{item.genericName}</td>
                  <td>
                    <span className={`status-badge ${item.status === 'In Stock' ? 'status-in-stock' : 'status-out-of-stock'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>{new Date(item.updatedAt).toLocaleDateString()}</td>
                  <td>
                    <button 
                      className="btn-delete"
                      onClick={() => initiateDelete(item._id)} // Changed this line
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* --- CONFIRMATION MODAL --- */}
      {itemToDelete && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to remove this medicine? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={cancelDelete}>Cancel</button>
              <button className="btn-confirm" onClick={confirmDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default InventoryTable;