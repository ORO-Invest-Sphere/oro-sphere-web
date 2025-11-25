import React from 'react';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { FileText, Download } from 'lucide-react';
import './ApplicationTracker.css'; // Reusing styles for consistency

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const DataVisualizer = ({ data, type, title }) => {

    const renderChart = () => {
        switch (type) {
            case 'population':
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="population" stroke="#003875" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                );
            case 'land-use':
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                );
            case 'disaster-risk':
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="area" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="riskLevel" fill="#d32f2f" name="Risk Level (1-10)" />
                        </BarChart>
                    </ResponsiveContainer>
                );
            default:
                return <p>No visualization available for this data type.</p>;
        }
    };

    return (
        <div className="visualizer-container">
            <div className="visualizer-header">
                <h3>{title} - Data Visualization</h3>
                <button className="download-btn">
                    <Download size={16} /> Download Report
                </button>
            </div>

            <div className="chart-section">
                <h4>Formatted Data</h4>
                <div className="chart-wrapper">
                    {renderChart()}
                </div>
            </div>

            <div className="raw-data-section">
                <h4>Original Data Source</h4>
                <div className="file-preview">
                    <FileText size={40} className="file-icon" />
                    <div className="file-details">
                        <span className="file-name">{title.replace(/\s+/g, '_')}_Raw_Data.pdf</span>
                        <span className="file-size">2.4 MB • PDF Document</span>
                    </div>
                    <button className="view-file-btn">View Original</button>
                </div>
            </div>
        </div>
    );
};

export default DataVisualizer;
