import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResetPassword.css';

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const userId = query.get('user_id');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId, new_password: newPassword, confirm_password: confirmPassword, verification_code: verificationCode }),
            });

            if (response.ok) {
                navigate('/login');
            } else {
                const data = await response.json();
                setError(data.message);
            }
        } catch (error) {
            setError('Server is currently unavailable. Please try again later.');
        }
    };

    return (
        <div className="reset-password-container">
            <form onSubmit={handleSubmit} className="reset-password-form">
                <h1>Reset Password</h1>
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Verification Code sent on your email"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                    className="input-field"
                />
                <button type="submit" className="reset-password-button">Reset Password</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
}

export default ResetPassword;
