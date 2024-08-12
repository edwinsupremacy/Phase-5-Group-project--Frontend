import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login({ setIsAuthenticated }) {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        phoneNumber: '',
    });
    const [error, setError] = useState('');
    const [serverError, setServerError] = useState('');
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
                if (response.status === 409) {
                    setError('Username already exists.');
                } else if (!response.ok) {
                    setError('Registration failed.');
                } else {
                    setIsAuthenticated(true); // Ensure this is a valid function
                    navigate('/');
                }
            } catch (error) {
                setServerError('Server is currently unavailable. Please try again later.');
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
                if (response.status === 401) {
                    setError('Invalid email or password.');
                } else if (!response.ok) {
                    setError('Login failed.');
                } else {
                    const data = await response.json();
                    localStorage.setItem('token', data.access_token);
                    localStorage.setItem('userId', data.user_id);
                    setIsAuthenticated(true); // Ensure this is a valid function
                    navigate('/');
                }
            } catch (error) {
                setServerError('Server is currently unavailable. Please try again later.');
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
                        autoComplete="username"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        autoComplete="email"
                    />
                    <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        onChange={handleChange}
                        autoComplete="tel"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        autoComplete="new-password"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        autoComplete="new-password"
                    />
                    <button type="submit">Sign Up</button>
                    {error && <p className="error">{error}</p>}
                    {serverError && <p className="error">{serverError}</p>}
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
                        autoComplete="email"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        autoComplete="current-password"
                    />
                    <button type="submit">Log In</button>
                    {error && <p className="error">{error}</p>}
                    {serverError && <p className="error">{serverError}</p>}
                    <p className="register-link">
                        Don't have an account?{' '}
                        <Link to="#" onClick={() => setIsSignUp(true)}>Sign Up</Link>
                    </p>
                    <p className="forgot-password-link">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </p>
                    <p className="admin-seller-link">
                        Are you an admin?{' '}
                        <Link to="/login/admin">Login here</Link>
                    </p>
                    <p className="admin-seller-link">
                        Are you a seller?{' '}
                        <Link to="/login/seller">Register & Login here</Link>
                    </p>
                </form>
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className={`toggle-panel toggle-left ${!isSignUp ? 'active' : ''}`}>
                        <h1>Welcome Back!</h1>
                        <p>Enter your details to log in if you already have an account. Thank you!</p>
                        <button
                            className={`hidden ${!isSignUp ? 'active' : ''}`}
                            onClick={() => setIsSignUp(false)}
                        >
                            Sign In
                        </button>
                    </div>
                    <div className={`toggle-panel toggle-right ${isSignUp ? 'active' : ''}`}>
                        <h1>Hello!</h1>
                        <p>Register with your personal details to use all of the site's features</p>
                        <button
                            className={`hidden ${isSignUp ? 'active' : ''}`}
                            onClick={() => setIsSignUp(true)}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
