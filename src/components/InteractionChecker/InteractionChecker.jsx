import React, { useState } from 'react';
import './InteractionChecker.css';

const InteractionChecker = () => {
  const [med1, setMed1] = useState('');
  const [med2, setMed2] = useState('');
  const [result, setResult] = useState('');
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState(''); // safe, warning, error

  const handleCheck = async (e) => {
    e.preventDefault();
    setResult('Checking...');
    setEvents([]);
    setStatus('');

    try {
      const res = await fetch('http://localhost:5000/api/interaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ med1, med2 }),
      });
      const data = await res.json();

      setStatus(data.status || 'error');
      setResult(data.message);
      setEvents(data.events || []);
    } catch (err) {
      setResult('Error connecting to server.');
      setStatus('error');
      setEvents([]);
    }
  };

  return (
    <div className="interaction-section">
      <h2 className="section-title">Check Drug Interactions</h2>

      <div className={`interaction-wrapper ${result ? 'show-result' : ''}`}>
        <div className="interaction-card">
          <form onSubmit={handleCheck} className="interaction-form">
            <input
              type="text"
              placeholder="Enter first medicine"
              value={med1}
              onChange={(e) => setMed1(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enter second medicine"
              value={med2}
              onChange={(e) => setMed2(e.target.value)}
              required
            />
            <button type="submit">Check Interaction</button>
          </form>
        </div>

        {result && (
          <div className={`interaction-result-container ${status}`}>
            <p className="interaction-result">{result}</p>

            {events.length > 0 && (
              <>
                <ul className="event-list">
                  {events.map((ev, idx) => (
                    <li key={idx}>{ev}</li>
                  ))}
                </ul>
                <p className="interaction-note">
                  *These are reported events from OpenFDA and may not indicate a confirmed interaction.*
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractionChecker;
