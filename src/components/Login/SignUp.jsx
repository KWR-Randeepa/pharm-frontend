import React, { useState } from 'react';
import './SignUp.css';

function SignUp() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        pharmacyName: '',
        location: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        pharmacyName: '',
        location: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState({
        email: false,
        password: false,
        pharmacyName: false,
        location: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData({ 
            ...formData, 
            [name]: value 
        });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({
            ...touched,
            [name]: true
        });
        validateField(name, formData[name]);
    };

    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'email':
                if (!value) {
                    error = 'You need to enter your email';
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    error = 'Please enter a valid email address';
                }
                break;
            
            case 'password':
                if (!value) {
                    error = 'You need to enter your password';
                } else if (value.length < 8) {
                    error = 'Password must be at least 8 characters';
                } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(value)) {
                    error = 'Password must contain both letters and numbers';
                }
                break;
            
            case 'pharmacyName':
                if (!value) {
                    error = 'You need to enter pharmacy name';
                } else if (value.length < 2) {
                    error = 'Pharmacy name must be at least 2 characters';
                }
                break;
            
            case 'location':
                if (!value) {
                    error = 'You need to enter pharmacy location';
                } else if (value.length < 3) {
                    error = 'Please enter a valid location';
                }
                break;
            
            default:
                break;
        }

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error
        }));

        return error;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Mark all fields as touched
        setTouched({
            email: true,
            password: true,
            pharmacyName: true,
            location: true
        });

        // Validate all fields
        const emailError = validateField('email', formData.email);
        const passwordError = validateField('password', formData.password);
        const pharmacyNameError = validateField('pharmacyName', formData.pharmacyName);
        const locationError = validateField('location', formData.location);

        // Check if form is valid
        const isValid = !emailError && !passwordError && !pharmacyNameError && !locationError;

        if (isValid) {
            console.log("Signing up with:", formData);
            // Submit form data here
            alert('Sign up successful!');
        } else {
            console.log("Form has errors");
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
               
                <form onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <div className="form-group">
                    <h1>Sign Up</h1>
                
                        <label className="form-label"> <strong>Email</strong></label>
                        <input
                            type="email"
                            name="email"
                            className={`form-input ${touched.email && errors.email ? 'error' : ''}`}
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter your email"
                            required
                        />
                        {touched.email && errors.email && (
                            <div className="error-message">{errors.email}</div>
                        )}
                    </div>

                    

                    {/* Password Field */}
                    <div className="form-group">
                        <label className="form-label">
                            <strong>Password</strong>
                        </label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className={`form-input ${touched.password && errors.password ? 'error' : ''}`}
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
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
                        <div className="password-hint">
                            Minimum 8 letters & numbers
                        </div>
                        {touched.password && errors.password && (
                            <div className="error-message">{errors.password}</div>
                        )}
                    </div>

                 

                    {/* Pharmacy Name Field */}
                    <div className="form-group">
                        <label className="form-label">
                            <strong>Pharmacy Name</strong>
                        </label>
                        <input
                            type="text"
                            name="pharmacyName"
                            className={`form-input ${touched.pharmacyName && errors.pharmacyName ? 'error' : ''}`}
                            placeholder="Enter pharmacy name"
                            value={formData.pharmacyName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        {touched.pharmacyName && errors.pharmacyName ? (
                            <div className="error-message">{errors.pharmacyName}</div>
                        ) : (
                            <div className="pharmacy-hint">
                            
                            </div>
                        )}
                    </div>

                    

                    {/* Location Field */}
                    <div className="form-group">
                        <label className="form-label">
                            <strong>Location</strong>
                        </label>
                        <input
                            type="text"
                            name="location"
                            className={`form-input ${touched.location && errors.location ? 'error' : ''}`}
                            placeholder="Enter pharmacy location"
                            value={formData.location}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        {touched.location && errors.location ? (
                            <div className="error-message">{errors.location}</div>
                        ) : (
                            <div className="location-hint">
                              
                            </div>
                        )}
                    </div>

                    

                    {/* Terms and Conditions */}
                    <div className="terms-section">
                  
                        <p className="terms-text">
                            By signing up, I agree to {' '}
                            <a href="/terms-of-use" className="terms-link">Medifind Terms of Use</a>
                            {' '}&{' '}
                            <a href="/privacy-policy" className="terms-link">Privacy Policy</a>. 
                           
                        </p>
                    </div>

                    <div className="divider"></div>

                    {/* Sign Up Button */}
                    <button type="submit" className="signup-button">
                        Sign Up
                    </button>

                    {/* Login Link */}
                    <div className="login-link">
                        Already have an account? <a href="/login">Log In</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;