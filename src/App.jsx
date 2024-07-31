import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import SellerLogin from './components/SellerLogin';
import About from './components/About';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  return (
    <div className="App">
      {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}
      <div className="content">
        <Routes>
          {!isAuthenticated ? (
            <Route path="*" element={<Navigate to="/login" replace />} />
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </>
          )}
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/login/seller" element={<SellerLogin />} />
        </Routes>
      </div>
     
      {location.pathname !== '/login' && location.pathname !== '/login/admin' && location.pathname !== '/login/seller' && <Footer />}
      <Routes>
        {!isAuthenticated ? (
          <Route path="*" element={<Navigate to="/login" replace />} />
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </>
        )}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/login/seller" element={<SellerLogin />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {isAuthenticated && location.pathname === '/' && <Footer />}
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
