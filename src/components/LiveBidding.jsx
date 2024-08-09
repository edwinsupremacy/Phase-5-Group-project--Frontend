import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const LiveBidding = () => {
    const [bids, setBids] = useState([]);

    useEffect(() => {
        socket.on('new_bid', (data) => {
            setBids((prevBids) => [...prevBids, data]);
        });
        return () => socket.off('new_bid');
    }, []);

    const placeBid = (amount) => {
        socket.emit('place_bid', { auction_id: 1, amount, user_id: 1 }); // Replace with actual auction_id and user_id
    };

    return (
        <div>
            <button onClick={() => placeBid(100)}>Place $100 Bid</button>
            <ul>
                {bids.map((bid, index) => (
                    <li key={index}>{bid.amount} by User {bid.user_id} at {bid.timestamp}</li>
                ))}
            </ul>
        </div>
    );
};

export default LiveBidding;
