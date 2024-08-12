import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication details
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    // Update authentication state
    setIsAuthenticated(false);

    // Redirect to login page
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      {isAuthenticated && <Link to="/auction-items" className="nav-link">Auction Items</Link>}
      <Link to="/about" className="nav-link">About</Link>
      <Link to="/contact" className="nav-link">Contact</Link>
      {isAuthenticated ? (
        <>
          <Link to="/profile" className="nav-link">Profile</Link>
          <button onClick={handleLogout} className="nav-link logout-button">Logout</button>
        </>
      ) : (
        <Link to="/login" className="nav-link">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
