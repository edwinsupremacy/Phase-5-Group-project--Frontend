import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault(); // Prevent the default link behavior
    localStorage.removeItem('token'); // Remove the token from localStorage
    localStorage.removeItem('userId'); // Remove the userId from localStorage
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      {isAuthenticated && (
        <>
          <Link to="/auction-items" className="nav-link">Auction Items</Link>
          <Link to="/recent-bids" className="nav-link">Recent Bids</Link>
        </>
      )}
      <Link to="/about" className="nav-link">About</Link>
      <Link to="/contact" className="nav-link">Contact</Link>
      {isAuthenticated ? (
        <Link to="/login" onClick={handleLogout} className="nav-link">Logout</Link>
      ) : (
        <Link to="/login" className="nav-link">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
