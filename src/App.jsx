import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ProductSearch from './pages/ProductSearch';
import CustomerReviews from './pages/CustomerReviews';
import AISentimentAnalyzer from './pages/AISentimentAnalyzer';
import ProductDetails from './pages/ProductDetails';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        {/* Marketing Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Dashboard Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<ProductSearch />} />
        <Route path="/reviews" element={<CustomerReviews />} />
        <Route path="/analyzer" element={<AISentimentAnalyzer />} />
        <Route path="/product" element={<ProductDetails />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />

        {/* Fallback to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
