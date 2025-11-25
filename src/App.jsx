import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './components/Layout/DashboardLayout'
import MapComponent from './components/Map/MapComponent'
import EconomicOverview from './components/Dashboard/EconomicOverview'
import CostCalculator from './components/Tools/CostCalculator'
import Incentives from './components/Info/Incentives'
import LandingPage from './components/Landing/LandingPage'
import ApplicationTracker from './components/Tools/ApplicationTracker'
import Login from './components/Auth/Login'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
              {activeTab === 'overview' && <EconomicOverview />}
              {activeTab === 'map' && <MapComponent />}
              {activeTab === 'calculator' && <CostCalculator />}
              {activeTab === 'incentives' && <Incentives />}
              {activeTab === 'tracker' && <ApplicationTracker />}
            </DashboardLayout>
          </ProtectedRoute>
        } />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
