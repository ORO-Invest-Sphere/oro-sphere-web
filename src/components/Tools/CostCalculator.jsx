import React, { useState, useEffect } from 'react';
import './CostCalculator.css';

const CostCalculator = () => {
  const [inputs, setInputs] = useState({
    size: 100,
    employees: 10,
    power: 1500,
    internetPlan: 'basic'
  });

  const [customExpenses, setCustomExpenses] = useState([]);
  const [newCustomExpense, setNewCustomExpense] = useState({ name: '', amount: '' });

  const [estimates, setEstimates] = useState({
    rent: 0,
    labor: 0,
    utilities: 0,
    internet: 0,
    custom: 0,
    total: 0
  });

  // Rates based on image context
  const RATES = {
    rentPerSqm: 600,
    wagePerDay: 438,
    workingDays: 22,
    powerPerKwh: 12.00,
    internet: {
      none: 0,
      basic: 1500,    // up to 50 Mbps
      business: 3500, // up to 200 Mbps
      enterprise: 8000 // Dedicated Fiber
    }
  };

  useEffect(() => {
    calculateEstimates();
  }, [inputs, customExpenses]);

  const calculateEstimates = () => {
    const rent = inputs.size * RATES.rentPerSqm;
    const labor = inputs.employees * RATES.wagePerDay * RATES.workingDays;
    const utilities = inputs.power * RATES.powerPerKwh;
    const internet = RATES.internet[inputs.internetPlan];
    const custom = customExpenses.reduce((sum, item) => sum + item.amount, 0);
    const total = rent + labor + utilities + internet + custom;

    setEstimates({ rent, labor, utilities, internet, custom, total });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: name === 'internetPlan' ? value : (parseFloat(value) || 0)
    }));
  };

  const handleAddCustomExpense = (e) => {
    e.preventDefault();
    if (newCustomExpense.name && newCustomExpense.amount) {
      setCustomExpenses([
        ...customExpenses,
        { ...newCustomExpense, id: Date.now(), amount: parseFloat(newCustomExpense.amount) }
      ]);
      setNewCustomExpense({ name: '', amount: '' });
    }
  };

  const removeCustomExpense = (id) => {
    setCustomExpenses(customExpenses.filter(item => item.id !== id));
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

          <div className="input-group">
            <label>Internet Connectivity</label>
            <select
              name="internetPlan"
              value={inputs.internetPlan}
              onChange={handleInputChange}
            >
              <option value="none">None</option>
              <option value="basic">Basic (up to 50 Mbps) - ₱1,500</option>
              <option value="business">Business (up to 200 Mbps) - ₱3,500</option>
              <option value="enterprise">Enterprise (Dedicated) - ₱8,000</option>
            </select>
          </div>

          <div className="custom-expenses-section">
            <h4>Custom Expenses</h4>
            <div className="custom-input-row">
              <input
                type="text"
                placeholder="Expense Name"
                value={newCustomExpense.name}
                onChange={(e) => setNewCustomExpense({ ...newCustomExpense, name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Amount"
                value={newCustomExpense.amount}
                onChange={(e) => setNewCustomExpense({ ...newCustomExpense, amount: e.target.value })}
              />
              <button className="add-btn" onClick={handleAddCustomExpense}>+</button>
            </div>
            <div className="custom-list">
              {customExpenses.map(item => (
                <div key={item.id} className="custom-item">
                  <span>{item.name}</span>
                  <span>{formatCurrency(item.amount)}</span>
                  <button className="remove-btn" onClick={() => removeCustomExpense(item.id)}>×</button>
                </div>
              ))}
            </div>
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

          <div className="result-row">
            <span>Internet Connectivity</span>
            <span className="result-val">{formatCurrency(estimates.internet)}</span>
          </div>

          {estimates.custom > 0 && (
            <div className="result-row">
              <span>Custom Expenses</span>
              <span className="result-val">{formatCurrency(estimates.custom)}</span>
            </div>
          )}

          <div className="result-divider"></div>

          <div className="result-row total">
            <span>Total Estimate</span>
            <span className="result-val total-val">{formatCurrency(estimates.total)}</span>
          </div>

          <p className="disclaimer">*Estimates only. Does not include taxes or benefits.</p>
        </div>
      </div>
    </div>
  );
};

export default CostCalculator;
