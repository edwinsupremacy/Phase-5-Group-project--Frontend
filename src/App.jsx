import React, { useState } from 'react';
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
      location.pathname.startsWith('/login/seller')
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
              <Route path="/auction-items" element={<AuctionItems />} />
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/login/admin" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/login/seller" element={<SellerLogin setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auction-items" element={<AuctionItems />} />
              <Route path="/seller-dashboard" element={<SellerDashboard />} />
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
