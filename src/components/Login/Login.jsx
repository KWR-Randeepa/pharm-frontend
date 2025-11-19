import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './Login.css';

const clientId = "1021227931270-50trr6ij37m65fkt624gr58m7usn5p3r.apps.googleusercontent.com"; // Replace with your OAuth client ID

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ 
            ...formData, 
            [e.target.name]: e.target.value 
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Logging in with:", formData);
        // Add your email/password login logic here
    };

    const handleGoogleSuccess = (credentialResponse) => {
        console.log("Google Login Success:", credentialResponse);
        // Send credentialResponse.credential (JWT token) to backend to verify user
    };

    const handleGoogleError = () => {
        console.log("Google Login Failed");
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className="login-container">
                <form onSubmit={handleSubmit}>
                    <h1>Log In</h1>

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
                        <a href="#vjvyhrt">Forgot Password?</a>
                        <label className="remember-me">
                            <input type="checkbox" />
                            Remember me
                        </label>
                    </div>

                    <button type="submit" className="login-button">
                        Log In
                    </button>

                    <div className="login-link">
                        Don't have an account ? <a href="/signup">Sign Up</a>
                    </div>

                    <div className="google-login">
                        <h3>Or login with Google</h3>
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
