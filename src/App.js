import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import SignUp from './components/Login/SignUp';
import HeroSection from './components/HeroSection/HeroSection';
import TermsOfUse from './components/TermsOfUse/TermsOfUse';
import PrivacyPolicy from './components/TermsOfUse/PrivacyPolicy';
import Home from './pages/Home';
import AdminAddMedicinePage from './pages/admin/addMedicine';
import AdminPannel from './pages/admin/adminPannel';
import Registration from './components/Pharmacy_reg/Registration';
import PharmacyHero from './pages/PharmacyHero';

import PharmacyReview from './pages/PharmacyReview';
import Stats from './pages/Stats';
import Footer from './pages/Footer';
import HealthNews from './components/HealthNews/HealthNews';
import InteractionChecker from './components/InteractionChecker/InteractionChecker';
import MediTools from './components/MediTools/MediTools';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    
    <Router>
      <AppContent />
    </Router>
   
    
  );
}

function AppContent() {
  const location = useLocation();
  // Check if the current path starts with /admin
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="App">
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<><HeroSection /><PharmacyHero/><Stats/><HealthNews/><InteractionChecker/><MediTools/><PharmacyReview/><Footer/></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin/add-medicine" element={<AdminAddMedicinePage />} />
        <Route path="/admin/pannel/*" element={<AdminPannel />} />
        <Route path="/pharmacy-registration" element={<Registration />} />
      
      </Routes>
    </div>
  );
}

export default App;