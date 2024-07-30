import React, { useState } from 'react';import { useNavigate } from 'react-router-dom';
import './SellerLogin.css';

function SellerLogin() {
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
            <form onSubmit={handleLoginSubmit} className="seller-login-form">
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
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}

export default SellerLogin;
