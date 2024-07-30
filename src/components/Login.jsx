import React, { useState } from 'react';
import './Footer.css'; // Assuming this is your styling for other parts of the app
import './Auth.css'; // Assuming this is styling specific to authentication

function Auth({ setUser, setIsAuthenticated }) {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    const handleAuth = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await fetch(`http://localhost:5555/auth/${isRegistering ? 'register' : 'login'}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(isRegistering ? { username, email, password } : { email, password }),
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || 'Something went wrong');
                return;
            }

            const data = await response.json();
            console.log(`${isRegistering ? 'Registration' : 'Login'} successful:`, data);

            setSuccessMessage(isRegistering ? 'Registration successful!' : 'Login successful!');
            setErrorMessage('');

            // Handle success (e.g., store the token, redirect, etc.)
            if (!isRegistering) {
                localStorage.setItem('token', data.access_token);
                setUser({ email });
                setIsAuthenticated(true);
            }
        } catch (err) {
            setError('Network error: ' + err.message);
        }
    };

    const toggleAuthMode = () => {
        setIsRegistering(!isRegistering);
        setErrorMessage('');
        setSuccessMessage('');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <h2>{isRegistering ? 'Register' : 'Login'}</h2>
                <form onSubmit={handleAuth}>
                    {isRegistering && (
                        <div>
                            <label>Username:</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-button">{isRegistering ? 'Register' : 'Login'}</button>
                </form>
                {successMessage && <p className="success-message">{successMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <p>
                    {isRegistering ? (
                        <>
                            Already have an account?{' '}
                            <button className="auth-button" onClick={toggleAuthMode}>
                                Login here
                            </button>
                        </>
                    ) : (
                        <>
                            Don't have an account?{' '}
                            <button className="auth-button" onClick={toggleAuthMode}>
                                Sign Up here
                            </button>
                        </>
                    )}
                </p>
                {localStorage.getItem('token') && (
                    <button onClick={handleLogout} className="auth-button">Logout</button>
                )}
            </div>
        </div>
    );
}

export default Auth;
