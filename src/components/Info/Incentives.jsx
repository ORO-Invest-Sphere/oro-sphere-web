import React from 'react';
import { Building2, FileText, Home, Flag, Calendar, Percent } from 'lucide-react';
import './Incentives.css';

const Incentives = () => {
  return (
    <div className="incentives-container">
      <div className="incentives-header">
        <h2>Investment Incentives</h2>
        <p>Maximize your ROI with our comprehensive fiscal and non-fiscal support packages.</p>
      </div>

      <div className="incentives-grid">
        {/* Local Incentives */}
        <div className="incentive-card local">
          <div className="card-header">
            <span className="header-icon"><Building2 size={24} /></span>
            <h3>Local Government Incentives</h3>
          </div>
          <div className="card-body">
            <div className="incentive-item">
              <div className="item-icon blue-bg"><FileText size={20} /></div>
              <div className="item-content">
                <h4>Business Tax Exemption</h4>
                <p>Graduated exemption from Local Business Tax for up to 5 years for Pioneer Enterprises.</p>
              </div>
            </div>
            <div className="incentive-item">
              <div className="item-icon blue-bg"><Home size={20} /></div>
              <div className="item-content">
                <h4>Real Property Tax Relief</h4>
                <p>Exemption on improvements and machineries for qualified new investments.</p>
              </div>
            </div>
          </div>
        </div>

        {/* National Incentives */}
        <div className="incentive-card national">
          <div className="card-header">
            <span className="header-icon"><Flag size={24} /></span>
            <h3>National Incentives (CREATE Law)</h3>
          </div>
          <div className="card-body">
            <div className="incentive-item">
              <div className="item-icon purple-bg"><Calendar size={20} /></div>
              <div className="item-content">
                <h4>Income Tax Holiday (ITH)</h4>
                <p>4 to 7 years of ITH for registered projects, depending on industry tier and location.</p>
              </div>
            </div>
            <div className="incentive-item">
              <div className="item-icon purple-bg"><Percent size={20} /></div>
              <div className="item-content">
                <h4>Special Corporate Income Tax</h4>
                <p>5% SCIT rate for 10 years after ITH expiration for export enterprises.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Incentives;
