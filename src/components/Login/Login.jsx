import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';


function Login() {
    const navigate = useNavigate(); // Hook for redirection
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ 
            ...formData, 
            [e.target.name]: e.target.value 
        });
        // Clear error when user types
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // 1. Send Login Request
            const res = await axios.post('http://localhost:5000/api/pharmacy/login', formData);

            // 2. Save the Token
            localStorage.setItem('userToken', res.data.token);
            
            // 3. Redirect to Admin Panel
            // Make sure you have a route defined for '/admin' in your App.js
            navigate('/admin/pannel'); 

        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Login failed. Please check your credentials.';
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h1>Log In</h1>

                {/* Error Message Display */}
                {error && (
                    <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                <div className="input-group">
                    <input
                        type="email"
                        name="email"
                        className="input-field"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className="input-field"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "HIDE" : "SHOW"}
                        </button>
                    </div>
                </div>

                <div className="options-row">
                    <a href="#forgot-password">Forgot Password?</a>
                    <label className="remember-me">
                        <input type="checkbox" />
                        Remember me
                    </label>
                </div>

                <button type="submit" className="login-button" disabled={loading}>
                    {loading ? 'Logging in...' : 'Log In'}
                </button>

                <div className="login-link">
                    Don't have an account? <a href="/pharmacy-registration">Sign Up</a>
                </div>
            </form>
        </div>
    );
}

export default Login;