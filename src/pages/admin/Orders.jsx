import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Product.css'; // Reusing table styles

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [confirming, setConfirming] = useState(null);

    const getToken = () => {
        const rawData = localStorage.getItem('userToken');
        if (!rawData) return null;
        try {
            if (rawData.includes('{')) {
                const parsed = JSON.parse(rawData);
                return parsed.token || parsed;
            }
        } catch (e) { }
        return rawData.replace(/^"|"$/g, '');
    };

    const fetchOrders = async () => {
        try {
            const token = getToken();
            if (!token) {
                setError('No authentication token found.');
                setLoading(false);
                return;
            }
            const config = { headers: { Authorization: `Bearer ${token}` } };

            // Fetch orders for logged in pharmacy
            const { data } = await axios.get('http://localhost:5000/api/orders', config);
            setOrders(data);
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

    const handleConfirmOrder = async (orderId) => {
        if (!window.confirm("Are you sure you want to confirm this order? An email will be sent to the customer.")) return;

        setConfirming(orderId);
        try {
            const token = getToken();
            const config = { headers: { Authorization: `Bearer ${token}` } };

            await axios.put(`http://localhost:5000/api/orders/${orderId}/confirm`, {}, config);

            // Refresh list
            fetchOrders();
            alert("Order confirmed successfully!");

        } catch (err) {
            alert(err.response?.data?.message || 'Confirmation failed');
        }
        setConfirming(null);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) return <div className="loading-state">Loading orders...</div>;
    if (error) return <div className="error-state">{error}</div>;

    return (
        <div className="inventory-container">
            <div className="inventory-header">
                <h2>Customer Orders</h2>
            </div>

            {orders.length === 0 ? (
                <div className="empty-state">
                    <p>No orders received yet.</p>
                </div>
            ) : (
                <div className="table-wrapper">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Prescription</th>
                                <th>Customer Info</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}</td>
                                    <td>
                                        <a href={`http://localhost:5000/${order.prescriptionImage}`} target="_blank" rel="noopener noreferrer">
                                            <img
                                                src={`http://localhost:5000/${order.prescriptionImage}`}
                                                alt="Prescription"
                                                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px', border: '1px solid #ddd' }}
                                            />
                                        </a>
                                    </td>
                                    <td>
                                        <div><strong>Email:</strong> {order.userEmail}</div>
                                        <div><strong>Phone:</strong> {order.userPhone}</div>
                                    </td>
                                    <td>
                                        <span className={`status-badge`} style={{
                                            backgroundColor: order.status === 'confirmed' ? '#d1fae5' : '#fee2e2',
                                            color: order.status === 'confirmed' ? '#065f46' : '#991b1b',
                                            padding: '5px 10px', borderRadius: '15px'
                                        }}>
                                            {order.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td>
                                        {order.status === 'pending' && (
                                            <button
                                                className="btn-delete" // Use same class for styling
                                                style={{ backgroundColor: '#059669' }}
                                                onClick={() => handleConfirmOrder(order._id)}
                                                disabled={confirming === order._id}
                                            >
                                                {confirming === order._id ? 'Processing...' : 'Confirm'}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderList;
