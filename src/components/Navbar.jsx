import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault(); // Prevent the default link behavior
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);

    // Redirect to login page
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      {localStorage.getItem('token') && (
        <>
          <Link to="/auction-items" className="nav-link">Auction Items</Link>
          <Link to="/recent-bids" className="nav-link">Recent Bids</Link>
        </>
      )}
      <Link to="/about" className="nav-link">About</Link>
      <Link to="/contact" className="nav-link">Contact</Link>
      {localStorage.getItem('token') ? (
        <Link to="/login" onClick={handleLogout} className="nav-link">Logout</Link>
      ) : (
        <Link to="/login" className="nav-link">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;