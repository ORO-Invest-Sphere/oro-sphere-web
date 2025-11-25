import React, { useState } from 'react';
import { CheckCircle2, Circle, Clock, FileText, ChevronRight, ArrowLeft, Database, BarChart } from 'lucide-react';
import DataVisualizer from './DataVisualizer';
import './ApplicationTracker.css';

const ApplicationTracker = () => {
  // Trigger HMR update
  const [selectedApp, setSelectedApp] = useState(null);
  const [showVisualizer, setShowVisualizer] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [newRequest, setNewRequest] = useState({
    office: '',
    dataType: '',
    purpose: ''
  });

  // Mock Data
  const [applications, setApplications] = useState([
    {
      id: 'APP-2025-001',
      type: 'Business Permit Renewal',
      category: 'permit',
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
      id: 'APP-2025-002',
      type: 'Building Permit',
      category: 'permit',
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
    },
    {
      id: 'REQ-2025-001',
      type: 'Population Data Request',
      category: 'data',
      businessName: 'Urban Research Inst.',
      submittedDate: 'Nov 22, 2025',
      status: 'Completed', // Changed for demo
      currentStep: 3,
      steps: [
        { title: 'Request Submitted', date: 'Nov 22, 2025', status: 'completed' },
        { title: 'Data Extraction', date: 'Nov 24, 2025', status: 'completed' },
        { title: 'Quality Check', date: 'Nov 25, 2025', status: 'completed' },
        { title: 'Data Delivery', date: 'Nov 26, 2025', status: 'completed' }
      ],
      graphData: {
        type: 'population',
        data: [
          { year: '2020', population: 720000 },
          { year: '2021', population: 735000 },
          { year: '2022', population: 752000 },
          { year: '2023', population: 770000 },
          { year: '2024', population: 795000 },
          { year: '2025', population: 820000 }
        ]
      }
    },
    {
      id: 'REQ-2025-002',
      type: 'Land Use Map Request',
      category: 'data',
      businessName: 'Green Heights Construction',
      submittedDate: 'Nov 10, 2025',
      status: 'Completed',
      currentStep: 3,
      steps: [
        { title: 'Request Submitted', date: 'Nov 10, 2025', status: 'completed' },
        { title: 'Map Generation', date: 'Nov 11, 2025', status: 'completed' },
        { title: 'Approval', date: 'Nov 12, 2025', status: 'completed' },
        { title: 'Released', date: 'Nov 12, 2025', status: 'completed' }
      ],
      graphData: {
        type: 'land-use',
        data: [
          { name: 'Residential', value: 45 },
          { name: 'Commercial', value: 25 },
          { name: 'Industrial', value: 15 },
          { name: 'Agricultural', value: 10 },
          { name: 'Institutional', value: 5 }
        ]
      }
    },
    {
      id: 'REQ-2025-003',
      type: 'Disaster Risk Assessment',
      category: 'data',
      businessName: 'SafeCity Planners',
      submittedDate: 'Nov 23, 2025',
      status: 'Completed', // Changed for demo
      currentStep: 3,
      steps: [
        { title: 'Request Submitted', date: 'Nov 23, 2025', status: 'completed' },
        { title: 'Risk Analysis', date: 'Nov 26, 2025', status: 'completed' },
        { title: 'Report Generation', date: 'Nov 28, 2025', status: 'completed' },
        { title: 'Final Review', date: 'Nov 30, 2025', status: 'completed' }
      ],
      graphData: {
        type: 'disaster-risk',
        data: [
          { area: 'Downtown', riskLevel: 3 },
          { area: 'Riverside', riskLevel: 8 },
          { area: 'Uptown', riskLevel: 2 },
          { area: 'Industrial Zone', riskLevel: 5 },
          { area: 'Coastal', riskLevel: 7 }
        ]
      }
    }
  ]);

  const offices = [
    { id: 'planning', name: 'City Planning Office' },
    { id: 'engineering', name: 'City Engineering Office' },
    { id: 'health', name: 'City Health Office' },
    { id: 'disaster', name: 'Disaster Risk Reduction Office' }
  ];

  const dataTypes = {
    planning: ['Zoning Map', 'Land Use Plan', 'Population Data'],
    engineering: ['Road Network Map', 'Drainage System Map', 'Building Permit Statistics'],
    health: ['Health Statistics', 'Sanitation Records', 'Disease Surveillance Data'],
    disaster: ['Flood Hazard Map', 'Landslide Risk Assessment', 'Evacuation Center Locations']
  };

  const handleAppClick = (app) => {
    setSelectedApp(app);
  };

  const handleBack = () => {
    if (showVisualizer) {
      setShowVisualizer(false);
    } else if (selectedApp) {
      setSelectedApp(null);
    } else if (isRequesting) {
      setIsRequesting(false);
      setNewRequest({ office: '', dataType: '', purpose: '' });
    }
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    const newId = `REQ-2025-${String(applications.length + 1).padStart(3, '0')}`;
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const newApp = {
      id: newId,
      type: newRequest.dataType,
      category: 'data',
      businessName: 'My Organization', // Default for now
      submittedDate: date,
      status: 'Pending',
      currentStep: 0,
      steps: [
        { title: 'Request Submitted', date: date, status: 'completed' },
        { title: 'Data Extraction', date: 'Pending', status: 'pending' },
        { title: 'Quality Check', date: 'Pending', status: 'pending' },
        { title: 'Data Delivery', date: 'Pending', status: 'pending' }
      ]
    };

    setApplications([newApp, ...applications]);
    setIsRequesting(false);
    setNewRequest({ office: '', dataType: '', purpose: '' });
  };

  return (
    <div className="tracker-container">
      <div className="tracker-header">
        {(selectedApp || isRequesting) && (
          <button className="back-btn" onClick={handleBack}>
            <ArrowLeft size={20} />
          </button>
        )}
        <div>
          <h2>Application Tracker</h2>
          <p className="tracker-subtitle">Track the real-time status of your permits and data requests.</p>
        </div>
        {!isRequesting && !selectedApp && (
          <button className="new-request-btn" onClick={() => setIsRequesting(true)}>
            + New Request
          </button>
        )}
      </div>

      {isRequesting ? (
        <div className="request-form-container">
          <h3>Request Data</h3>
          <form onSubmit={handleRequestSubmit} className="request-form">
            <div className="form-group">
              <label>Select Office</label>
              <select
                value={newRequest.office}
                onChange={(e) => setNewRequest({ ...newRequest, office: e.target.value, dataType: '' })}
                required
              >
                <option value="">-- Select Office --</option>
                {offices.map(office => (
                  <option key={office.id} value={office.id}>{office.name}</option>
                ))}
              </select>
            </div>

            {newRequest.office && (
              <div className="form-group">
                <label>Select Data Type</label>
                <select
                  value={newRequest.dataType}
                  onChange={(e) => setNewRequest({ ...newRequest, dataType: e.target.value })}
                  required
                >
                  <option value="">-- Select Data Type --</option>
                  {dataTypes[newRequest.office].map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="form-group">
              <label>Purpose of Request</label>
              <textarea
                value={newRequest.purpose}
                onChange={(e) => setNewRequest({ ...newRequest, purpose: e.target.value })}
                placeholder="Describe why you need this data..."
                required
              />
            </div>

            <button type="submit" className="submit-btn">Submit Request</button>
          </form>
        </div>
      ) : !selectedApp ? (
        <div className="applications-list">
          {applications.map((app) => (
            <div key={app.id} className="app-card" onClick={() => handleAppClick(app)}>
              <div className="app-icon">
                {app.category === 'data' ? <Database size={24} /> : <FileText size={24} />}
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
      ) : showVisualizer ? (
        <DataVisualizer
          data={selectedApp.graphData.data}
          type={selectedApp.graphData.type}
          title={selectedApp.type}
        />
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

            {selectedApp.category === 'data' && selectedApp.status === 'Completed' && selectedApp.graphData && (
              <button className="view-data-btn" onClick={() => setShowVisualizer(true)}>
                <BarChart size={18} /> View Formatted Data
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationTracker;
