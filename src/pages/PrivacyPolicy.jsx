import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
            <h1 style={{ color: '#064e3b', marginBottom: '20px' }}>Privacy Policy</h1>
            <p style={{ color: '#4b5563', lineHeight: '1.6' }}>
                At MediFind, we prioritize your privacy. This policy outlines how we collect, use, and protect your personal information.
            </p>
            <h2 style={{ color: '#111827', marginTop: '30px', fontSize: '1.5rem' }}>1. Information We Collect</h2>
            <p style={{ color: '#4b5563', lineHeight: '1.6' }}>
                We may collect personal information such as your location and search queries to provide you with relevant pharmacy results.
            </p>
            <h2 style={{ color: '#111827', marginTop: '30px', fontSize: '1.5rem' }}>2. Data Security</h2>
            <p style={{ color: '#4b5563', lineHeight: '1.6' }}>
                We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.
            </p>
            {/* Add more sections as needed */}
        </div>
    );
};

export default PrivacyPolicy;
