// AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AdminLogin.css'; 

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');

    try {
      const response = await fetch('/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed.');
      }
      navigate('/admin/home');
    } catch (error) {
      setError('Login failed.');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="form-container sign-in">
        <form onSubmit={handleLoginSubmit}>
          <h1>Admin Log In</h1>
          <span>Use your admin email and password</span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Log In</button>
          {error && <p className="error">{error}</p>}
          <p className="register-link">
            User? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
