import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import SellerLogin from './components/SellerLogin';
import SellerDashboard from './components/SellerDashboard';
import About from './components/About';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import AdminDashboard from './components/AdminDashboard';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import AuctionItems from './components/AuctionItems';
import RecentBids from './components/RecentBids';
import Checkout from './components/Checkout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Check if there's a token in localStorage to set authentication status
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  // Determine whether to show the Navbar based on the current route
  const determineNavbarVisibility = () => {
    const hideRoutes = [
      '/login',
      '/admin-dashboard',
      '/login/admin',
      '/login/seller',
      '/seller-dashboard',
      '/forgot-password',
      '/reset-password',
    ];
    return !hideRoutes.some(path => location.pathname.startsWith(path)) && showNavbar;
  };

  return (
    <div className="App">
      {determineNavbarVisibility() && (
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      )}
      <div className="content">
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setCurrentUser={setCurrentUser} />} />
              <Route path="/login/admin" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/login/seller" element={<SellerLogin setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/auction-items" element={<AuctionItems />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/recent-bids" element={<RecentBids />} />
              <Route path="/checkout/:bidId" element={<Checkout />} />
              <Route path="*" element={<Navigate to="/" replace />} /> {/* Redirect unmatched routes */}
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
