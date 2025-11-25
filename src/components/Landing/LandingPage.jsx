import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, TrendingUp, Truck, Briefcase, Sprout, Palmtree, Award } from 'lucide-react';
import InquiryModal from './InquiryModal';
import './LandingPage.css';
import logo from '../../assets/oroinvestsphere.png';

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="logo-section">
          <img src={logo} alt="Oro-Invest-Sphere Logo" className="logo-image" style={{ height: '40px', marginRight: '10px' }} />
          <span className="logo-title">Oro-Invest-Sphere</span>
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
          
          <div className="about-intro">
            <p>
              Ranked as the <strong>6th most competitive highly-urbanized city</strong> in 2023, Cagayan de Oro is the strategic growth driver of Northern Mindanao. 
              With a robust infrastructure backbone, a dynamic economy growing at <strong>9.4%</strong>, and a business-friendly environment, it stands as the premier investment destination in the South.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><Award size={32} /></div>
              <h3>Ease of Doing Business</h3>
              <p>Pioneering full automation for business permits and tax payments, earning commendations from the Anti-Red Tape Authority (ARTA) for efficiency and transparency.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><TrendingUp size={32} /></div>
              <h3>Economic Powerhouse</h3>
              <p>Driving Region X's growth with a PhP261.8 billion GCDP. The city consistently outpaces regional growth, particularly in the Industry and Services sectors.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><Truck size={32} /></div>
              <h3>Logistics Hub</h3>
              <p>The most cost-effective access point to Mindanao, featuring an international seaport, airport, and extensive road networks connecting to major production areas.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><Briefcase size={32} /></div>
              <h3>Industry & Services</h3>
              <p>A "Next Wave City" for ICT and the center of education in Mindanao. The services sector contributes 75% to the local economy, supported by a skilled workforce.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><Sprout size={32} /></div>
              <h3>Agribusiness Center</h3>
              <p>Direct access to rich agricultural resources has attracted major companies like Del Monte and Nestlé. A key hub for food, livestock, and agro-processing.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><Palmtree size={32} /></div>
              <h3>Leisure & Living</h3>
              <p>A top MICE destination and adventure tourism hub, famous for whitewater rafting. It offers a diverse range of eco-tourism attractions and a dynamic arts culture.</p>
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
