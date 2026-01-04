import { Link } from 'react-router-dom';
import './Footer.css';
// Importing icons
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">

        {/* Column 1: Brand & Description */}
        <div className="footer-col brand-col">
          <h2 className="footer-logo">MediFind</h2>
          <p className="footer-text">
            Connecting you with the nearest pharmacies and essential medicines instantly.
            Bridging the gap between patients and healthcare providers.
          </p>
          <div className="social-links">
            <a href="#facebook" className="social-icon"><FaFacebookF /></a>
            <a href="#twitter" className="social-icon"><FaTwitter /></a>
            <a href="#instagram" className="social-icon"><FaInstagram /></a>
            <a href="#linkedin" className="social-icon"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-of-use">Terms of Use</Link></li>

          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="footer-col">
          <h3 className="footer-title">Contact Us</h3>
          <ul className="footer-contact">
            <li>
              <FaMapMarkerAlt className="contact-icon" />
              <span>123 Health Avenue, Colombo 07, Sri Lanka</span>
            </li>
            <li>
              <FaPhoneAlt className="contact-icon" />
              <span>+94 11 234 5678</span>
            </li>
            <li>
              <FaEnvelope className="contact-icon" />
              <span>medifind247@gmail.com</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MediFind. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;  