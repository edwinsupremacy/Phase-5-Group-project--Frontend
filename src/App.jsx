import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import AuctionItems from './components/AuctionItems';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Login from './components/Login';
import SellerLogin from './components/SellerLogin';
import SellerDashboard from './components/SellerDashboard';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import RecentBids from './components/RecentBids';
import Checkout from './components/Checkout';

const validateToken = async (token) => {
  if (token === "valid-token") {
    return { username: "User" };
  } else {
    throw new Error("Invalid token");
  }
};

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      validateToken(token)
        .then(user => {
          setUser(user);
          setIsAuthenticated(true);
        })
        .catch(() => {
          localStorage.removeItem('token');
        });
    }
  }, []);

  return (
    <Fragment>
      <Router>
        <div className="App">
          <Navbar user={user} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          <main>
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
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/auction-items" element={<AuctionItems />} />
                  <Route path="/recent-bids" element={<RecentBids />} />
                  <Route path="/seller-dashboard" element={<SellerDashboard />} />
                  <Route path="/checkout/:bidId" element={<Checkout />} />
                  <Route path="/admin-dashboard" element={<AdminDashboard setIsAuthenticated={setIsAuthenticated} />} />
                </>
              )}
            </Routes>
          </main>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
