import React, { useState, useEffect } from 'react';
import './CostCalculator.css';

const CostCalculator = () => {
  const [inputs, setInputs] = useState({
    size: 100,
    employees: 10,
    power: 1500
  });

  const [estimates, setEstimates] = useState({
    rent: 0,
    labor: 0,
    utilities: 0,
    total: 0
  });

  // Rates based on image context
  const RATES = {
    rentPerSqm: 600,
    wagePerDay: 438,
    workingDays: 22,
    powerPerKwh: 12.00
  };

  useEffect(() => {
    calculateEstimates();
  }, [inputs]);

  const calculateEstimates = () => {
    const rent = inputs.size * RATES.rentPerSqm;
    const labor = inputs.employees * RATES.wagePerDay * RATES.workingDays;
    const utilities = inputs.power * RATES.powerPerKwh;
    const total = rent + labor + utilities;

    setEstimates({ rent, labor, utilities, total });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const formatCurrency = (val) => {
    return '₱' + val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  return (
    <div className="calculator-container">
      <div className="calculator-header">
        <h2>Cost of Doing Business Estimator</h2>
      </div>
      
      <div className="calculator-content">
        {/* Left Column: Inputs */}
        <div className="calc-inputs card-panel">
          <h3>Operational Parameters</h3>
          
          <div className="input-group">
            <label>Office/Facility Size (sqm)</label>
            <input 
              type="number" 
              name="size" 
              value={inputs.size} 
              onChange={handleInputChange}
            />
            <span className="input-hint">Avg Commercial Rent: ~₱{RATES.rentPerSqm}/sqm</span>
          </div>

          <div className="input-group">
            <label>Number of Employees (Staff)</label>
            <input 
              type="number" 
              name="employees" 
              value={inputs.employees} 
              onChange={handleInputChange}
            />
            <span className="input-hint">Min. Wage (Non-Agri): ~₱{RATES.wagePerDay}/day (Est.)</span>
          </div>

          <div className="input-group">
            <label>Est. Monthly Power Usage (kWh)</label>
            <input 
              type="number" 
              name="power" 
              value={inputs.power} 
              onChange={handleInputChange}
            />
            <span className="input-hint">Commercial Rate: ~₱{RATES.powerPerKwh.toFixed(2)}/kWh (Est.)</span>
          </div>

          <button className="calc-btn" onClick={calculateEstimates}>
            Calculate Monthly Estimate
          </button>
        </div>

        {/* Right Column: Results */}
        <div className="calc-results">
          <h3>Estimated Monthly Opex</h3>
          
          <div className="result-row">
            <span>Real Estate (Rent)</span>
            <span className="result-val">{formatCurrency(estimates.rent)}</span>
          </div>
          
          <div className="result-row">
            <span>Labor (Basic)</span>
            <span className="result-val">{formatCurrency(estimates.labor)}</span>
          </div>
          
          <div className="result-row">
            <span>Utilities (Power)</span>
            <span className="result-val">{formatCurrency(estimates.utilities)}</span>
          </div>

          <div className="result-divider"></div>

          <div className="result-row total">
            <span>Total Estimate</span>
            <span className="result-val total-val">{formatCurrency(estimates.total)}</span>
          </div>

          <p className="disclaimer">*Estimates only. Does not include taxes, benefits, or internet.</p>
        </div>
      </div>
    </div>
  );
};

export default CostCalculator;
