import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SellerLogin.css';

function SellerLogin({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [username, setUsername] = useState(''); 
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [isRegister, setIsRegister] = useState(true); 
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password || !confirmPassword || !username || !phone) {
            setError('Please fill in all fields.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Invalid email format.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setError('');

        try {
            const response = await axios.post('http://localhost:5000/register/seller', {
                username,
                email,
                password,
                phone
            });

            if (response.status !== 201) {
                throw new Error('Registration failed.');
            }

            setIsRegister(false); 
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError('Email or username already exists.');
            } else {
                setError('Registration failed. Please try again later.');
            }
        }
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Invalid email format.');
            return;
        }

        setError('');

        try {
            const response = await axios.post('http://localhost:5000/login/seller', {
                email,
                password
            });

            if (response.status !== 200) {
                throw new Error('Login failed.');
            }

            setIsAuthenticated(true); 
            navigate('/seller-dashboard'); 
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Invalid credentials.');
            } else {
                setError('Login failed. Please try again later.');
            }
        }
    };

    return (
        <div className="seller-login-container">
            <div className="seller-login-form">
                {isRegister ? (
                    <form onSubmit={handleRegisterSubmit}>
                        <h1>Seller Registration</h1>
                        <span>Register as a seller to start listing your items</span>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button type="submit">Register</button>
                        <p>
                            Already have an account?{' '}
                            <span
                                onClick={() => setIsRegister(false)}
                                className="toggle-link"
                                style={{ cursor: 'pointer', color: '#A0937D' }}
                            >
                                Log In
                            </span>
                        </p>
                        {error && <p className="error">{error}</p>}
                    </form>
                ) : (
                    <form onSubmit={handleLoginSubmit}>
                        <h1>Seller Login</h1>
                        <span>Enter your email and password to access your dashboard</span>
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
                        <p>
                            Don't have an account?{' '}
                            <span
                                onClick={() => setIsRegister(true)}
                                className="toggle-link"
                                style={{ cursor: 'pointer', color: '#A0937D' }}
                            >
                                Register
                            </span>
                        </p>
                        {error && <p className="error">{error}</p>}
                    </form>
                )}
            </div>
        </div>
    );
}

export default SellerLogin;
