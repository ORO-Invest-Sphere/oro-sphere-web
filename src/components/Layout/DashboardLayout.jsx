import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Map, Calculator, Star, TrendingUp, ClipboardList } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import './DashboardLayout.css';

const DashboardLayout = ({ children, activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-box">OT</div>
          <div className="logo-text">
            <h1>Oro-TIPC</h1>
            <p>Investment Intelligence Dashboard</p>
          </div>
        </div>

        <div className="sidebar-section-label">MODULES</div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <BarChart3 size={20} className="nav-icon" /> Economic Overview
          </button>
          <button
            className={`nav-item ${activeTab === 'map' ? 'active' : ''}`}
            onClick={() => setActiveTab('map')}
          >
            <Map size={20} className="nav-icon" /> Investment Map
          </button>
          <button
            className={`nav-item ${activeTab === 'calculator' ? 'active' : ''}`}
            onClick={() => setActiveTab('calculator')}
          >
            <Calculator size={20} className="nav-icon" /> Cost Calculator
          </button>
          <button
            className={`nav-item ${activeTab === 'incentives' ? 'active' : ''}`}
            onClick={() => setActiveTab('incentives')}
          >
            <Star size={20} className="nav-icon" /> Incentives
          </button>
          <button
            className={`nav-item ${activeTab === 'tracker' ? 'active' : ''}`}
            onClick={() => setActiveTab('tracker')}
          >
            <ClipboardList size={20} className="nav-icon" /> App Tracker
          </button>
        </nav>

        <div className="sidebar-widget">
          <div className="widget-card">
            <span className="widget-label">CDO GDP Growth (2024)</span>
            <div className="widget-value">
              6.8% <span className="widget-trend"><TrendingUp size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> YoY</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-wrapper">
        <header className="top-bar">
          <div className="top-bar-left">
            <div className="mobile-logo">OT</div>
            <span className="page-title">Oro-TIPC <span className="subtitle">Investment Intelligence Dashboard</span></span>
          </div>
          <div className="top-bar-right">
            <div className="user-menu">
              <span className="user-greeting">Welcome, Investor</span>
              <button className="logout-btn" onClick={handleLogout}>Sign Out</button>
            </div>
          </div>
        </header>

        <main className="content-area">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
