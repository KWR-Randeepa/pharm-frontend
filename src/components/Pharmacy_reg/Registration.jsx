import React, { useState } from 'react';
import { Camera, MapPin, User, Mail, Phone, Clock, Home, Loader2, Lock } from 'lucide-react';
import './Registration.css'; // This imports the CSS file
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ebjvkdjjzbblvscxnffz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVianZrZGpqemJibHZzY3huZmZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMzA5NzYsImV4cCI6MjA3OTYwNjk3Nn0.KWmEO6_XZ42IM23_A4wirMkz8-Qux-iPDQGgUmotFws';

export const supabase = createClient(supabaseUrl, supabaseKey);
export default function Registration() {

  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [formData, setFormData] = useState({
    pharmacyName: '',
    ownerName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    openingHours: '',
    latitude: '',
    longitude: '',
    profilePicture: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, profilePicture: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }));
        setLocating(false);
      },
      (error) => {
        alert("Unable to retrieve your location");
        setLocating(false);
      }
    );
  };

  /*const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    console.log("Form Data Submitted:", {
      ...formData,
      location: {
        type: 'Point',
        coordinates: [formData.longitude, formData.latitude]
      }
    });

    setTimeout(() => {
      setLoading(false);
      alert("Pharmacy registered successfully! (Check console for data)");
      toast.success('Pharmacy registered successfully!');
    }, 1500);
  };*/
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.latitude || !formData.longitude) {
      toast.error("Please get your current location first!");
      return;
    }

    setLoading(true);



    try {
      let imageUrl = "";
      if (formData.profilePicture) {
        const file = formData.profilePicture;
        const fileName = `${Date.now()}_${file.name}`;

        const { data, error } = await supabase.storage
          .from('pharmacy-img')
          .upload(fileName, file);

        if (error) {
          console.log(error);
          toast.error("Image upload failed");
          setLoading(false);
          return;
        }

        const { data: urlData } = supabase.storage
          .from('pharmacy-img')
          .getPublicUrl(fileName);

        imageUrl = urlData.publicUrl;
      }

      // 1. Create a standard JavaScript object (JSON payload)
      const payload = {
        pharmacyName: formData.pharmacyName,
        ownerName: formData.ownerName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        openingHours: formData.openingHours,
        latitude: formData.latitude,
        longitude: formData.longitude,
        profilePicture: imageUrl || null,
        
      };

      // 2. Send as JSON (Axios handles the headers automatically)
      const res = await axios.post(
        "http://localhost:5000/api/pharmacy/register",
        payload
      );

      toast.success(res.data.message);

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Registration failed");
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      <Toaster position="top-right" reverseOrder={false} />
      {/* Left Side - Visual/Branding */}
      <div className="sidebar">
        <div className="sidebar-top-bar"></div>
        <div className="sidebar-content">
          <h1 className="welcome-title">Welcome Partner</h1>

          <div className="info-card">
            <div className="icon-container">
              <div className="icon-glow"></div>
              <div className="icon-bg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="medical-svg">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  <path d="M12 5v14" className="svg-cross" />
                  <path d="M5 12h14" className="svg-cross" />
                </svg>
              </div>
            </div>
            <p className="info-text">
              Join our network of healthcare providers. Manage your inventory,
              connect with patients, and grow your pharmacy business with our
              comprehensive digital solutions.
            </p>
          </div>

          <div className="footer-links">
            <span>Secure Platform</span>
            <span>•</span>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="form-section">
        <div className="form-wrapper">
          <div className="form-header">
            <h2 className="form-title">Pharmacy Registration</h2>
            <button className="close-btn-mobile">✕</button>
          </div>

          <form onSubmit={handleSubmit} className="registration-form">

            {/* Profile Picture Upload */}
            <div className="upload-container">
              <label className="upload-label">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden-input"
                  onChange={handleFileChange}
                />
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="preview-image" />
                ) : (
                  <div className="upload-placeholder">
                    <Camera className="camera-icon" />
                    <span className="upload-text">Upload Logo</span>
                  </div>
                )}
                <div className="upload-overlay">
                  <span>Change</span>
                </div>
              </label>
            </div>

            {/* Pharmacy Name */}
            <div className="form-group">
              <label className="form-label">Pharmacy Name</label>
              <div className="input-wrapper">
                <div className="input-icon-wrapper">
                  <Home size={18} />
                </div>
                <input
                  type="text"
                  name="pharmacyName"
                  value={formData.pharmacyName}
                  onChange={handleChange}
                  placeholder="e.g. HealthCare Pharmacy"
                  className="form-input"
                  required
                  minLength={2}
                />
              </div>
            </div>

            {/* Owner Name */}
            <div className="form-group">
              <label className="form-label">Owner Name</label>
              <div className="input-wrapper">
                <div className="input-icon-wrapper">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="input-wrapper">
                <div className="input-icon-wrapper">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="form-input"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <div className="input-icon-wrapper">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="form-input"
                  required
                />
              </div>
            </div>
            {/* Phone Number */}
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <div className="input-wrapper">
                <div className="input-icon-wrapper">
                  <Phone size={18} />
                </div>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="(123) 456-7890"
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div className="form-group">
              <label className="form-label">Pharmacy Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street, City, Postal Code"
                rows="2"
                className="form-textarea"
                required
              />
            </div>

            {/* Location */}
            <div className="form-group">
              <label className="form-label label-row">
                <span>Location (Lat/Long)</span>
                <span className="badge">Required for Maps</span>
              </label>
              <div className="location-group">
                <div className="input-wrapper flex-grow">
                  <div className="input-icon-wrapper">
                    <MapPin size={18} />
                  </div>
                  <input
                    type="text"
                    value={formData.latitude && formData.longitude ? `${formData.latitude.toFixed(4)}, ${formData.longitude.toFixed(4)}` : ''}
                    placeholder="Coordinates"
                    disabled
                    className="form-input disabled-input"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleGetLocation}
                  className="location-btn"
                  title="Get Current Location"
                >
                  {locating ? <Loader2 className="spinner" /> : <MapPin className="icon-sm" />}
                </button>
              </div>
              <p className="helper-text">*Click the button to fetch current location for the GeoJSON field.</p>
            </div>

            {/* Opening Hours */}
            <div className="form-group">
              <label className="form-label">Opening Hours</label>
              <div className="input-wrapper">
                <div className="input-icon-wrapper">
                  <Clock size={18} />
                </div>
                <input
                  type="text"
                  name="openingHours"
                  value={formData.openingHours}
                  onChange={handleChange}
                  placeholder="e.g. Mon-Sat: 9am - 9pm"
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="submit-btn"
            >
              {loading ? (
                <>
                  <Loader2 className="spinner" />
                  Registering...
                </>
              ) : (
                'REGISTER PHARMACY'
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}