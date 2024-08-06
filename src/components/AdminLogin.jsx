import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

function AdminLogin({ setIsAuthenticated }) {  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        if (!username || !password) {
            setError('Please fill in all fields.');
            return;
        }
        setError('');

        try {
            const response = await fetch('http://localhost:5000/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const { access_token, refresh_token } = await response.json();
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);
                setIsAuthenticated(true);  
                navigate('/admin-dashboard');
            } else {
                if (response.status === 401) {
                    setError('You are not permitted to access this page.');
                } else {
                    setError('Login failed. Please try again.');
                }
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div className="admin-login-container">
            <form onSubmit={handleLoginSubmit} className="admin-login-form">
                <h1>Admin Login</h1>
                <span>Enter your username and password to access the admin dashboard</span>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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

export default AdminLogin;
