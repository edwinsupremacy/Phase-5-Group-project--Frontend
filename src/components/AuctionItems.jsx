// AuctionItems.js
import React from 'react';
import './AuctionItems.css';
import { useItems } from './ItemsContext';

const AuctionItems = () => {
    const { items } = useItems(); // Get items from context

    return (
        <div className="auction-items-container">
            <h2>Available Auction Items</h2>
            <div className="items-list">
                {items.length > 0 ? (
                    <ul>
                        {items.map((item, index) => (
                            <li key={index} className="item-card">
                                <img src={item.image_url} alt={item.name} />
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <p>Starting Bid: ksh {item.starting_price}</p>
                                <p>Category: {item.category}</p>
                                {/* Add more details as necessary */}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No items available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default AuctionItems;
