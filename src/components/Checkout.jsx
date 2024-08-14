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
            // Send payment data to the backend
            const paymentResponse = await axios.post('https://phase-5-group-project-backend-1.onrender.com/pay', {
                phone_number: phoneNumber,
                amount: amount,
                user_id: location.state?.userId // Assuming userId is passed in location.state
            });

            // Check if payment was successfully initiated
            if (paymentResponse.status === 200 && paymentResponse.data.CheckoutRequestID) {
                alert(`Payment initiated successfully with CheckoutRequestID: ${paymentResponse.data.CheckoutRequestID}`);

                // Update the bid status to 'Paid Successfully' if bidId is available
                const bidId = location.state?.bidId;
                if (bidId) {
                    await axios.patch(`https://phase-5-group-project-backend-1.onrender.com/bids/${bidId}`, { status: 'Paid Successfully' });
                }

                // Redirect to the home page
                alert('Payment successful. Redirecting to the home page...');
                navigate('/');
            } else {
                throw new Error('Failed to initiate payment.');
            }
        } catch (error) {
            console.error('Payment or update failed:', error);
            alert('check your phone to complete the payments');
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
