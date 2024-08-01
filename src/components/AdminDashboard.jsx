// src/components/AdminDashboard.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
    navigate('/login/admin');
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminDashboard;
