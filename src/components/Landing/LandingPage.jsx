import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';
import InquiryModal from './InquiryModal';
import './LandingPage.css';

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="logo-section">
          <div className="logo-box">OT</div>
          <span className="logo-title">Oro-TIPC</span>
        </div>
        <nav className="landing-nav">
          <a href="#home">Home</a>
          <a href="#about">About CDO</a>
          <a href="#contact">Contact</a>
          <Link to="/login" className="login-link">Login</Link>
          <button onClick={() => setIsModalOpen(true)} className="inquire-btn">Inquire Now</button>
        </nav>
      </header>

      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <section id="home" className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Invest in Cagayan de Oro</h1>
          <p>The Gateway to Northern Mindanao and the 4th Most Competitive City in the Philippines.</p>
          <div className="hero-buttons">
            <Link to="/login" className="cta-primary">Start Your Investment Journey</Link>
            <a href="#about" className="cta-secondary">Learn More</a>
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="section-container">
          <h2>Why Cagayan de Oro?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Strategic Location</h3>
              <p>The logistics and transshipment hub of Northern Mindanao.</p>
            </div>
            <div className="feature-card">
              <h3>Economic Growth</h3>
              <p>Consistently high GRDP growth rates and booming business sector.</p>
            </div>
            <div className="feature-card">
              <h3>Skilled Workforce</h3>
              <p>Home to top universities producing high-quality graduates.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="section-container">
          <h2>Contact Us</h2>
          <p>Ready to invest? Get in touch with the Trade and Investment Promotions Center.</p>
          <div className="contact-info">
            <p><MapPin size={18} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> City Hall, Cagayan de Oro City</p>
            <p><Mail size={18} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> invest@cagayandeoro.gov.ph</p>
            <p><Phone size={18} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> (088) 857-3143</p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <p>&copy; 2025 Cagayan de Oro Trade and Investment Promotions Center</p>
      </footer>
    </div>
  );
};

export default LandingPage;
