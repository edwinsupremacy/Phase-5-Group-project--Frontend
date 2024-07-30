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

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleLoginClick = () => {
    setIsSignUp(false);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed.');
      }
      navigate('/home');
    } catch (error) {
      setError('Login failed.');
    }
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    if (!username || !email || !phoneNumber || !password || !confirmPassword || password !== confirmPassword) {
      setError('Please fill in all fields and ensure passwords match.');
      return;
    }
    setError('');

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, phoneNumber, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed.');
      }
      navigate('/login');
    } catch (error) {
      setError('Registration failed.');
    }
  };

  return (
    <div className={`container ${isSignUp ? 'active' : ''}`}>
      <div className="form-container sign-up">
        <form onSubmit={handleSignUpSubmit}>
          <h1>Create Account</h1>
          <span>Please fill in the fields to create an account</span>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
      <div className="form-container sign-in">
        <form onSubmit={handleLoginSubmit}>
          <h1>Log In</h1>
          <span>or use your email and password</span>
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
            <button className={`hidden ${isSignUp ? '' : 'active'}`} onClick={handleLoginClick}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello!</h1>
            <p>Register with your personal details to use all of the site's features</p>
            <button className={`hidden ${isSignUp ? 'active' : ''}`} onClick={handleSignUpClick}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
