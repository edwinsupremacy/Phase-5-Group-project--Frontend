// src/components/Checkout.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Checkout.css';

function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [amount, setAmount] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        if (location.state && location.state.amount) {
            setAmount(location.state.amount);
        }
    }, [location.state]);

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Simulate M-Pesa payment processing
            alert(`Processing M-Pesa payment of ${amount}.\nPhone Number: ${phoneNumber}`);

            // Assuming payment was successful, update the bid status to 'Paid Successfully'
            const bidId = location.state?.bidId; // Assuming the bid ID is passed in location.state
            if (bidId) {
                await axios.patch(`http://localhost:5000/bids/${bidId}`, { status: 'Paid Successfully' });
            }

            // Display success message and navigate to home page
            alert('Payment successful. Redirecting to the home page...');
            navigate('/');
        } catch (error) {
            console.error('Payment or update failed:', error);
            alert('Payment or update failed. Please try again.');
        }
    };

    return (
        <div className="checkout-container">
            <h1 className="checkout-title">Checkout</h1>

            {/* Display the suggested amount to pay at the top */}
            <div className="amount-display">
                <p>Suggested Amount to Pay: <strong>{location.state?.amount?.toLocaleString()} KES</strong></p>
            </div>

            <form className="checkout-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="amount" className="form-label">Enter Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        className="form-input"
                        value={amount}
                        onChange={handleAmountChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone-number" className="form-label">Phone Number:</label>
                    <input
                        type="tel"
                        id="phone-number"
                        className="form-input"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        required
                    />
                </div>

                <button type="submit" className="submit-button">Submit Payment</button>
            </form>
        </div>
    );
}

export default Checkout;
