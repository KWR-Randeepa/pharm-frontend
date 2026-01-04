import React from 'react';

const TermsOfUse = () => {
    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
            <h1 style={{ color: '#064e3b', marginBottom: '20px' }}>Terms of Use</h1>
            <p style={{ color: '#4b5563', lineHeight: '1.6' }}>
                Welcome to MediFind. By using our website, you agree to comply with and be bound by the following terms and conditions of use.
            </p>
            <h2 style={{ color: '#111827', marginTop: '30px', fontSize: '1.5rem' }}>1. Acceptance of Terms</h2>
            <p style={{ color: '#4b5563', lineHeight: '1.6' }}>
                By accessing or using MediFind, you agree to be bound by these Terms of Use and all applicable laws and regulations.
            </p>
            <h2 style={{ color: '#111827', marginTop: '30px', fontSize: '1.5rem' }}>2. Use of Service</h2>
            <p style={{ color: '#4b5563', lineHeight: '1.6' }}>
                You agree to use our service only for lawful purposes. You are prohibited from using the site to compromise security or tamper with system resources and accounts.
            </p>
            {/* Add more sections as needed */}
        </div>
    );
};

export default TermsOfUse;
