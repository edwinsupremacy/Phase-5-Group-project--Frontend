import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, confirmPassword, username, phoneNumber } = formData;

    if (isSignUp) {
      if (!username || !email || !phoneNumber || !password || password !== confirmPassword) {
        setError('Please fill in all fields and ensure passwords match.');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, phone_number: phoneNumber, password, confirm_password: confirmPassword }),
        });
        if (!response.ok) throw new Error('Registration failed.');
        navigate('/home');
      } catch (error) {
        setError('Registration failed.');
      }
    } else {
      if (!email || !password) {
        setError('Please fill in all fields.');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        if (!response.ok) throw new Error('Login failed.');
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        navigate('/home');
      } catch (error) {
        setError('Login failed.');
      }
    }
  };

  return (
    <div className={`container ${isSignUp ? 'active' : ''}`}>
      <div className="form-container sign-up">
        <form onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <span>Please fill in the fields to create an account</span>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            autocomplete="username"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            autocomplete="email"
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={handleChange}
            autocomplete="tel"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            autocomplete="new-password"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            autocomplete="new-password"
          />
          <button type="submit">Sign Up</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
      <div className="form-container sign-in">
        <form onSubmit={handleSubmit}>
          <h1>Log In</h1>
          <span>or use your email and password</span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            autocomplete="email"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            autocomplete="current-password"
          />
          <button type="submit">Log In</button>
          {error && <p className="error">{error}</p>}
          <p className="register-link">
            Don't have an account? <Link to="#" onClick={handleSignUpClick}>Sign Up</Link>
          </p>
          <div className="role-links">
            <p>Sign in as:</p>
            <Link to="/login/admin">Admin</Link>
            <Link to="/login/seller">Seller</Link>
          </div>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your details to log in if you already have an account. Thank you!</p>
            <button className={`hidden ${!isSignUp ? 'active' : ''}`} onClick={() => setIsSignUp(false)}>
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello!</h1>
            <p>Register with your personal details to use all of the site's features</p>
            <button className={`hidden ${isSignUp ? 'active' : ''}`} onClick={() => setIsSignUp(true)}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;