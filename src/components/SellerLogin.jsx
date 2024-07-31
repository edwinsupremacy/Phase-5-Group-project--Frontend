import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SellerLogin.css';

function SellerLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // For registration
    const [username, setUsername] = useState(''); // For registration
    const [phone, setPhone] = useState(''); // For registration
    const [error, setError] = useState('');
    const [isRegister, setIsRegister] = useState(true); // Toggle between register and login
    const navigate = useNavigate();

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        if (!email || !password || !confirmPassword || !username || !phone) {
            setError('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setError('');

        try {
            const response = await fetch('/register/seller', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password, phone }),
            });

            if (!response.ok) {
                throw new Error('Registration failed.');
            }

            setIsRegister(false); // Switch to login after successful registration
        } catch (error) {
            setError('Registration failed.');
        }
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }
        setError('');

        try {
            const response = await fetch('/login/seller', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed.');
            }
            navigate('/seller-dashboard');
        } catch (error) {
            setError('Login failed.');
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
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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
