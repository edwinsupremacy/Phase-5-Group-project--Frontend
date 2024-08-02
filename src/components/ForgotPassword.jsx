import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css'; // Make sure to create this CSS file

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/verify-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone_number: phoneNumber }),
      });

      if (response.ok) {
        const data = await response.json();
        navigate(`/reset-password?user_id=${data.user_id}`);
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      setError('Server is currently unavailable. Please try again later.');
    }
  };

  return (
    <div className="forgot-password-container">
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <h1>Forgot Password</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          className="input-field"
        />
        <button type="submit" className="forgot-password-button">Submit</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default ForgotPassword;
