import React, { useState, useEffect } from 'react';

// --- CSS Styles (Embedded) ---
const styles = `
:root {
  --emerald-50: #ecfdf5;
  --emerald-100: #d1fae5;
  --emerald-200: #a7f3d0;
  --emerald-300: #6ee7b7;
  --emerald-400: #34d399;
  --emerald-500: #10b981;
  --emerald-600: #059669;
  --emerald-700: #047857;
  --emerald-800: #065f46;
  --emerald-900: #064e3b;
  --emerald-950: #022c22;
}

/* --- Main Wrapper --- */
.meditools-wrapper {
  padding: 40px 20px;
  background-color: transparent;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.meditools-caption {
  text-align: center;
  color: var(--emerald-900);
  font-size: 1.6rem;
  margin-bottom: 30px;
  letter-spacing: 1.2px;
  font-weight: 800;
  text-transform: uppercase;
  text-shadow: 0 1px 2px rgba(255,255,255,0.8);
}

/* --- Carousel Structure --- */
.carousel-container {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
}

.meditools-viewport {
  width: 100%;
  overflow: hidden;
}

.meditools-track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}

.slide-item {
  flex-shrink: 0;
  padding: 0 10px;
  box-sizing: border-box;
}

/* --- Navigation Buttons --- */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--emerald-600);
  color: white;
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 10;
}

.nav-btn.left-btn { left: -150px; }
.nav-btn.right-btn { right: -150px; }

.nav-btn:hover {
  background-color: var(--emerald-800);
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.nav-btn.disabled {
  background-color: var(--emerald-200);
  cursor: not-allowed;
  transform: translateY(-50%);
  opacity: 0.6;
}

/* --- Tool Card --- */
.tool-card {
  width: 100%;
  max-width: 400px;
  height: 400px;
  background: white;
  border: 1px solid var(--emerald-100);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-sizing: border-box;
}

.tool-card:hover {
  transform: translateY(-5px);
  border-color: var(--emerald-300);
  box-shadow: 0 12px 24px rgba(16, 185, 129, 0.12);
}

.tool-header {
  width: 100%;
  background: linear-gradient(135deg, var(--emerald-600), var(--emerald-500));
  color: white;
  padding: 12px;
  text-align: center;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.tool-card form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-grow: 1;
}

.tool-card input,
.tool-card select,
.tool-card button {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--emerald-200);
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;
  background-color: var(--emerald-50);
  box-sizing: border-box;
  transition: border-color 0.2s, background-color 0.2s;
}

.tool-card input:focus,
.tool-card select:focus {
  border-color: var(--emerald-500);
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.row-inputs {
  display: flex;
  gap: 10px;
}

.row-inputs input {
  flex: 1;
}

.tool-card button {
  background-color: var(--emerald-700);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  margin-top: auto;
  transition: background-color 0.2s;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

.tool-card button:hover {
  background-color: var(--emerald-900);
}

.tool-result {
  margin-top: 15px;
  background-color: var(--emerald-50);
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  color: var(--emerald-900);
  border: 1px dashed var(--emerald-400);
  font-size: 0.95rem;
  animation: fadeIn 0.4s ease-out;
}

.tool-result strong {
  display: block;
  font-size: 1.4rem;
  color: var(--emerald-700);
  margin-bottom: 2px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

// --- Sub-Components ---
const BMICalc = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState(null);
  const [msg, setMsg] = useState('');

  const calculate = e => {
    e.preventDefault();
    if (weight && height) {
      const val = (weight / ((height / 100) ** 2)).toFixed(1);
      setResult(val);
      setMsg(val < 18.5 ? 'Underweight' : val < 25 ? 'Healthy' : val < 30 ? 'Overweight' : 'Obese');
    }
  };

  return (
    <div className="tool-card">
      <div className="tool-header">BMI Checker</div>
      <form onSubmit={calculate}>
        <input placeholder="Weight (kg)" type="number" onChange={e => setWeight(e.target.value)} required />
        <input placeholder="Height (cm)" type="number" onChange={e => setHeight(e.target.value)} required />
        <button type="submit">Check BMI</button>
      </form>
      {result && <div className="tool-result">BMI: <strong>{result}</strong> <small>({msg})</small></div>}
    </div>
  );
};

const BMRCalc = () => {
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [result, setResult] = useState(null);

  const calculate = e => {
    e.preventDefault();
    const r = (10 * weight) + (6.25 * height) - (5 * age) + (gender === 'male' ? 5 : -161);
    setResult(r.toFixed(0));
  };

  return (
    <div className="tool-card">
      <div className="tool-header">BMR (Metabolism)</div>
      <form onSubmit={calculate}>
        <select value={gender} onChange={e => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <div className="row-inputs">
          <input placeholder="Age" type="number" onChange={e => setAge(e.target.value)} required />
          <input placeholder="Weight (Kg)" type="number" onChange={e => setWeight(e.target.value)} required />
        </div>
        <input placeholder="Height (cm)" type="number" onChange={e => setHeight(e.target.value)} required />
        <button type="submit">Calculate BMR</button>
      </form>
      {result && <div className="tool-result">Burn <strong>{result}</strong> cal/day</div>}
    </div>
  );
};

const TDEECalc = () => {
  const [activity, setActivity] = useState(1.2);
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);

  const calculate = e => {
    e.preventDefault();
    setResult((weight * 24 * activity).toFixed(0));
  };

  return (
    <div className="tool-card">
      <div className="tool-header">TDEE (Energy)</div>
      <form onSubmit={calculate}>
        <select value={activity} onChange={e => setActivity(Number(e.target.value))}>
          <option value={1.2}>Sedentary</option>
          <option value={1.55}>Moderate</option>
          <option value={1.9}>Athlete</option>
        </select>
        <input placeholder="Weight (kg)" type="number" onChange={e => setWeight(e.target.value)} required />
        <button type="submit">Calc Daily Cal</button>
      </form>
      {result && <div className="tool-result">Need <strong>{result}</strong> cal</div>}
    </div>
  );
};

const BodyFatCalc = () => {
  const [waist, setWaist] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState(null);

  const calculate = e => {
    e.preventDefault();
    setResult(((waist / height) * 35).toFixed(1));
  };

  return (
    <div className="tool-card">
      <div className="tool-header">Body Fat %</div>
      <form onSubmit={calculate}>
        <div className="row-inputs">
          <input placeholder="Waist" type="number" onChange={e => setWaist(e.target.value)} required />
          <input placeholder="Neck" type="number" required />
        </div>
        <input placeholder="Height" type="number" onChange={e => setHeight(e.target.value)} required />
        <button type="submit">Estimate %</button>
      </form>
      {result && <div className="tool-result">Fat: <strong>{result}%</strong></div>}
    </div>
  );
};

const WaterCalc = () => {
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);

  const calculate = e => {
    e.preventDefault();
    setResult((weight * 0.035).toFixed(2));
  };

  return (
    <div className="tool-card">
      <div className="tool-header">Water Intake</div>
      <form onSubmit={calculate}>
        <input placeholder="Weight (kg)" type="number" onChange={e => setWeight(e.target.value)} required />
        <button type="submit">Calc Water</button>
      </form>
      {result && <div className="tool-result">Drink <strong>{result}L</strong></div>}
    </div>
  );
};

// --- MAIN COMPONENT ---
const MediTools = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(2);

  const tools = [<BMICalc key="bmi" />, <BMRCalc key="bmr" />, <TDEECalc key="tdee" />, <BodyFatCalc key="bf" />, <WaterCalc key="water" />];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsToShow(1);
      else setItemsToShow(2);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = tools.length - itemsToShow;

  const nextSlide = () => {
    if (currentIndex < maxIndex) setCurrentIndex(prev => prev + 1);
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  return (
    <div className="meditools-wrapper">
      <style>{styles}</style>
      <h2 className="meditools-caption">INTERACTIVE HEALTH DASHBOARD</h2>
      <div className="carousel-container">
        <button className={`nav-btn left-btn ${currentIndex === 0 ? 'disabled' : ''}`} onClick={prevSlide} disabled={currentIndex === 0}>&#8592;</button>
        <div className="meditools-viewport">
          <div className="meditools-track" style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}>
            {tools.map((tool, index) => (
              <div className="slide-item" key={index} style={{ width: `${100 / itemsToShow}%` }}>
                {tool}
              </div>
            ))}
          </div>
        </div>
        <button className={`nav-btn right-btn ${currentIndex === maxIndex ? 'disabled' : ''}`} onClick={nextSlide} disabled={currentIndex === maxIndex}>&#8594;</button>
      </div>
    </div>
  );
};

export default MediTools;
