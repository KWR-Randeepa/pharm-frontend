import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './Login.css';

const clientId =
  "1021227931270-50trr6ij37m65fkt624gr58m7usn5p3r.apps.googleusercontent.com";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError('');
  };

  // Normal login (UNCHANGED backend flow)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post(
        'http://localhost:5000/api/pharmacy/login',
        formData
      );

      localStorage.setItem('userToken', res.data.token);
      navigate('/admin/pannel');

    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        'Login failed. Please check your credentials.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Google login success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);

      // Send Google token to backend
      const res = await axios.post(
        'http://localhost:5000/api/pharmacy/google-login',
        {
          token: credentialResponse.credential,
        }
      );

      localStorage.setItem('userToken', res.data.token);
      navigate('/admin/pannel');

    } catch (err) {
      setError('Google login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Google login error
  const handleGoogleError = () => {
    setError('Google authentication failed');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h1>Log In</h1>

          {/* Error */}
          {error && (
            <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          {/* Email */}
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

          {/* Password */}
          <div className="input-group">
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
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
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="options-row">
            <a href="#forgot-password">Forgot Password?</a>
            <label className="remember-me">
              <input type="checkbox" />
              Remember me
            </label>
          </div>

          {/* Login Button */}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>

          {/* Sign Up */}
          <div className="login-link">
            Don't have an account? <a href="/pharmacy-registration">Sign Up</a>
          </div>

          {/* Google Login */}
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
            />
          </div>
        </form>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
