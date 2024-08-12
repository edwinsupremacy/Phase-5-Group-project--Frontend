// src/components/RecentBids.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RecentBids.css';

const RecentBids = () => {
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBids = async () => {
            try {
                const response = await axios.get('http://localhost:5000/user-bids', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setBids(response.data.bids);
            } catch (err) {
                setError('Failed to fetch bids');
            } finally {
                setLoading(false);
            }
        };

        fetchBids();
    }, []);

    const handleCheckout = (bidId, bidAmount) => {
        // Redirect to the checkout page with the bid amount as state
        navigate(`/checkout/${bidId}`, { state: { amount: bidAmount, bidId: bidId } });
    };

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="recent-bids">
            <h2 className="recent-bids-title">Recent Bids</h2>
            {bids.length === 0 ? (
                <p className="no-bids">No recent bids available</p>
            ) : (
                <table className="bids-table">
                    <thead>
                        <tr>
                            <th>Bid ID</th>
                            <th>Item</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bids.map(bid => (
                            <tr key={bid.id}>
                                <td>{bid.id}</td>
                                <td>{bid.item}</td>
                                <td>{bid.amount.toLocaleString()}</td>
                                <td className={`status ${bid.status.toLowerCase().replace(' ', '-')}`}>{bid.status}</td>
                                <td>
                                    {bid.status.toLowerCase() === 'accepted' && (
                                        <button
                                            className="checkout-button"
                                            onClick={() => handleCheckout(bid.id, bid.amount)}
                                        >
                                            Checkout
                                        </button>
                                    )}
                                    {bid.status.toLowerCase() === 'paid successfully' && (
                                        <span className="paid-status">Paid Successfully</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default RecentBids;
