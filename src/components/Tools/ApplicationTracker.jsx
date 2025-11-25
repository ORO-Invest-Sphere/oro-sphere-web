import React, { useState } from 'react';
import { CheckCircle2, Circle, Clock, FileText, ChevronRight, ArrowLeft } from 'lucide-react';
import './ApplicationTracker.css';

const ApplicationTracker = () => {
  const [selectedApp, setSelectedApp] = useState(null);

  // Mock Data
  const applications = [
    {
      id: 'APP-2024-001',
      type: 'Business Permit Renewal',
      businessName: 'Tech Solutions Inc.',
      submittedDate: 'Nov 20, 2025',
      status: 'In Progress',
      currentStep: 2, // 0-indexed
      steps: [
        { title: 'Application Submitted', date: 'Nov 20, 2025', status: 'completed' },
        { title: 'Document Verification', date: 'Nov 21, 2025', status: 'completed' },
        { title: 'Zoning Review', date: 'Est. Nov 25, 2025', status: 'current', description: 'Currently under review by the City Planning Office.' },
        { title: 'Fire Safety Inspection', date: 'Est. Nov 28, 2025', status: 'pending' },
        { title: 'Permit Issuance', date: 'Est. Dec 01, 2025', status: 'pending' }
      ]
    },
    {
      id: 'APP-2024-002',
      type: 'Building Permit',
      businessName: 'Green Heights Construction',
      submittedDate: 'Nov 15, 2025',
      status: 'Approved',
      currentStep: 4,
      steps: [
        { title: 'Application Submitted', date: 'Nov 15, 2025', status: 'completed' },
        { title: 'Engineering Review', date: 'Nov 16, 2025', status: 'completed' },
        { title: 'Zoning Compliance', date: 'Nov 18, 2025', status: 'completed' },
        { title: 'Final Assessment', date: 'Nov 19, 2025', status: 'completed' },
        { title: 'Permit Released', date: 'Nov 20, 2025', status: 'completed' }
      ]
    }
  ];

  const handleAppClick = (app) => {
    setSelectedApp(app);
  };

  const handleBack = () => {
    setSelectedApp(null);
  };

  return (
    <div className="tracker-container">
      <div className="tracker-header">
        {selectedApp && (
          <button className="back-btn" onClick={handleBack}>
            <ArrowLeft size={20} />
          </button>
        )}
        <div>
          <h2>Application Tracker</h2>
          <p className="tracker-subtitle">Track the real-time status of your permits.</p>
        </div>
      </div>

      {!selectedApp ? (
        <div className="applications-list">
          {applications.map((app) => (
            <div key={app.id} className="app-card" onClick={() => handleAppClick(app)}>
              <div className="app-icon">
                <FileText size={24} />
              </div>
              <div className="app-info">
                <h3>{app.type}</h3>
                <p>{app.businessName}</p>
                <span className="app-id">{app.id}</span>
              </div>
              <div className="app-status">
                <span className={`status-badge ${app.status.toLowerCase().replace(' ', '-')}`}>
                  {app.status}
                </span>
                <ChevronRight size={20} className="arrow-icon" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="timeline-view">
          <div className="timeline-card">
            {selectedApp.steps.map((step, index) => (
              <div key={index} className={`timeline-item ${step.status}`}>
                <div className="timeline-marker">
                  {step.status === 'completed' ? (
                    <CheckCircle2 size={24} className="icon-completed" />
                  ) : step.status === 'current' ? (
                    <div className="icon-current">
                      <div className="inner-dot"></div>
                    </div>
                  ) : (
                    <Circle size={24} className="icon-pending" />
                  )}
                  {index < selectedApp.steps.length - 1 && <div className="timeline-line"></div>}
                </div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h4>{step.title}</h4>
                    <span className="timeline-date">{step.date}</span>
                  </div>
                  {step.description && <p className="timeline-desc">{step.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationTracker;
