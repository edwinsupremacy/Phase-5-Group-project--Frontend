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
import AuctionItems from './components/AuctionItems';
import Navbar from './components/Navbar';
import AdminDashboard from './components/AdminDashboard';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import RecentBids from './components/RecentBids';
import Checkout from './components/Checkout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  // Determine if Navbar should be shown
  const showNavbar = () => {
    // Show Navbar on all pages except login pages and admin dashboard
    return !(
      location.pathname.startsWith('/login') ||
      location.pathname.startsWith('/admin-dashboard') ||
      location.pathname.startsWith('/login/admin') ||
      location.pathname.startsWith('/login/seller') ||
      location.pathname.startsWith('/seller-dashboard') ||
      location.pathname.startsWith('/forgot-password') ||
      location.pathname.startsWith('/reset-password')
    );
  };

  return (
    <div className="App">
      {showNavbar() && <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
      <div className="content">
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/login/admin" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/login/seller" element={<SellerLogin setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/recent-bids" element={<RecentBids />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auction-items" element={<AuctionItems />} />
              <Route path="/seller-dashboard" element={<SellerDashboard />} />
              <Route path="/checkout/:bidId" element={<Checkout />} />
              <Route path="/admin-dashboard" element={<AdminDashboard setIsAuthenticated={setIsAuthenticated} />} />
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
