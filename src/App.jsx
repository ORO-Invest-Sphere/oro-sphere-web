import { useState, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './components/Layout/DashboardLayout'
import EconomicOverview from './components/Dashboard/EconomicOverview'
import LandingPage from './components/Landing/LandingPage'
import ApplicationTracker from './components/Tools/ApplicationTracker'
import Login from './components/Auth/Login'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import './App.css'

// Lazy load heavy components
const MapComponent = lazy(() => import('./components/Map/MapComponent'))
const CostCalculator = lazy(() => import('./components/Tools/CostCalculator'))
const Incentives = lazy(() => import('./components/Info/Incentives'))

// Loading fallback component
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100%',
    fontSize: '1.2rem',
    color: '#64748b'
  }}>
    Loading...
  </div>
)

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
              <Suspense fallback={<LoadingFallback />}>
                {activeTab === 'overview' && <EconomicOverview />}
                {activeTab === 'map' && <MapComponent />}
                {activeTab === 'calculator' && <CostCalculator />}
                {activeTab === 'incentives' && <Incentives />}
                {activeTab === 'tracker' && <ApplicationTracker />}
              </Suspense>
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
