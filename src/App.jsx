import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
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
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/profile', {
          // Assuming an endpoint that returns the currently logged-in user's details
        });
        setCurrentUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error fetching user', error);
      }
    };

    if (isAuthenticated) {
      fetchUser();
    }
  }, [isAuthenticated]);

  const determineNavbarVisibility = () => {
    return !(
      location.pathname.startsWith('/login') ||
      location.pathname.startsWith('/admin-dashboard') ||
      location.pathname.startsWith('/login/admin') ||
      location.pathname.startsWith('/login/seller') ||
      location.pathname.startsWith('/seller-dashboard') ||
      location.pathname.startsWith('/forgot-password') ||
      location.pathname.startsWith('/reset-password') ||
      !showNavbar
    );
  };

  return (
    <div className="App">
      {determineNavbarVisibility() && <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
      <div className="content">
        <Routes>
          {/* Unauthenticated Routes */}
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
              {/* Authenticated Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auction-items" element={<AuctionItems setShowNavbar={setShowNavbar} />} />
              <Route path="/seller-dashboard" element={<SellerDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/recent-bids" element={<RecentBids />} />
              <Route path="/checkout/:bidId" element={<Checkout />} />
              <Route path="/profile" element={<Profile user={currentUser} />} />
              <Route path="/edit-profile" element={<EditProfile user={currentUser} setUser={setCurrentUser} />} />
              <Route path="*" element={<Navigate to="/" replace />} /> {/* Redirect any unmatched routes */}
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
