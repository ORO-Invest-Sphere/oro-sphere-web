import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { supabase } from '../../lib/supabaseClient';
import './EconomicData.css';

const EconomicData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: indicators, error } = await supabase
        .from('economic_indicators')
        .select('*')
        .order('period_year', { ascending: true });

      if (error) throw error;

      if (indicators && indicators.length > 0) {
        setData(indicators);
      } else {
        // Fallback dummy data for MVP demonstration
        setData([
          { metric_name: 'GDP Growth', period_year: 2021, value: 5.2 },
          { metric_name: 'GDP Growth', period_year: 2022, value: 6.8 },
          { metric_name: 'GDP Growth', period_year: 2023, value: 7.1 },
          { metric_name: 'GDP Growth', period_year: 2024, value: 7.5 },
        ]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Fallback on error too
      setData([
        { metric_name: 'GDP Growth', period_year: 2021, value: 5.2 },
        { metric_name: 'GDP Growth', period_year: 2022, value: 6.8 },
        { metric_name: 'GDP Growth', period_year: 2023, value: 7.1 },
        { metric_name: 'GDP Growth', period_year: 2024, value: 7.5 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="economic-dashboard">
      <div className="dashboard-header">
        <h3>Economic Performance Indicators</h3>
        <p>Real-time data on Cagayan de Oro's economic health.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Inflation Rate</h4>
          <div className="stat-value">4.1%</div>
          <div className="stat-trend down">↓ 0.2% vs last month</div>
        </div>
        <div className="stat-card">
          <h4>Employment Rate</h4>
          <div className="stat-value">94.5%</div>
          <div className="stat-trend up">↑ 1.2% vs last year</div>
        </div>
        <div className="stat-card">
          <h4>New Businesses</h4>
          <div className="stat-value">1,240</div>
          <div className="stat-trend up">↑ 5% vs last quarter</div>
        </div>
      </div>

      <div className="chart-container">
        <h4>GDP Growth Trend (%)</h4>
        {loading ? (
          <div className="loading">Loading data...</div>
        ) : (
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period_year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="GDP Growth" fill="var(--primary-color)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default EconomicData;
