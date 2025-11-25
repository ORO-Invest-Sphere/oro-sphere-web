import React from 'react';
import { TrendingUp, ExternalLink } from 'lucide-react';
import './EconomicOverview.css';

const EconomicOverview = () => {
  return (
    <div className="economic-overview">
      {/* Hero Section */}
      <div className="hero-banner">
        <div className="hero-content">
          <h1>Invest in Cagayan de Oro</h1>
          <p>The 4th Most Competitive City in the Philippines and the Gateway to Northern Mindanao.</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon product-icon"></div>
          <div className="metric-info">
            <span className="metric-label">GROSS PRODUCT</span>
            <h3 className="metric-value">₱295.6 B</h3>
            <span className="metric-trend positive"><TrendingUp size={14} style={{marginRight: '4px'}} /> 6.8% Growth (2024)</span>
            <a href="#" className="metric-source"><ExternalLink size={12} style={{marginRight: '4px'}} /> Source</a>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon population-icon"></div>
          <div className="metric-info">
            <span className="metric-label">POPULATION</span>
            <h3 className="metric-value">760,000+</h3>
            <span className="metric-sub">Regional Hub of Region X</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon services-icon"></div>
          <div className="metric-info">
            <span className="metric-label">SERVICES SECTOR</span>
            <h3 className="metric-value">76.5%</h3>
            <span className="metric-sub">Share of Economy</span>
            <a href="#" className="metric-source"><ExternalLink size={12} style={{marginRight: '4px'}} /> Source</a>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon competitive-icon"></div>
          <div className="metric-info">
            <span className="metric-label">COMPETITIVENESS</span>
            <h3 className="metric-value">Top 10</h3>
            <span className="metric-sub">DTI Cities Index 2024</span>
            <a href="#" className="metric-source"><ExternalLink size={12} style={{marginRight: '4px'}} /> Source</a>
          </div>
        </div>
      </div>

      <div className="lower-section-grid">
        {/* Economy by Sector */}
        <div className="sector-section card-panel">
          <h3>Economy by Sector (2024)</h3>
          
          <div className="sector-bar-group">
            <div className="sector-header">
              <span>Services</span>
              <span className="sector-percent">76.5%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill services" style={{width: '76.5%'}}></div>
            </div>
            <div className="sector-desc">Trade, Finance, Tourism, BPO</div>
          </div>

          <div className="sector-bar-group">
            <div className="sector-header">
              <span>Industry</span>
              <span className="sector-percent">22.9%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill industry" style={{width: '22.9%'}}></div>
            </div>
            <div className="sector-desc">Manufacturing, Construction, Utilities</div>
          </div>

          <div className="sector-bar-group">
            <div className="sector-header">
              <span>Agriculture</span>
              <span className="sector-percent">0.7%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill agriculture" style={{width: '0.7%'}}></div>
            </div>
          </div>
        </div>

        {/* Investment Hubs */}
        <div className="hubs-section card-panel">
          <h3>Investment Hubs</h3>
          <div className="hubs-grid">
            <div className="hub-card" style={{backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=500&q=60)'}}>
              <span>Phividec Industrial</span>
            </div>
            <div className="hub-card" style={{backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=500&q=60)'}}>
              <span>Int'l Seaport</span>
            </div>
            <div className="hub-card" style={{backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=60)'}}>
              <span>Downtown District</span>
            </div>
            <div className="hub-card" style={{backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=500&q=60)'}}>
              <span>Uptown IT Park</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EconomicOverview;
