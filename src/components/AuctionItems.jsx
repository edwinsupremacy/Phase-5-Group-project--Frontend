import React, { useState, useEffect } from 'react';
import './AuctionItems.css';
import { FaSearch } from 'react-icons/fa';

const AuctionItems = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [bidAmount, setBidAmount] = useState({});
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [categories] = useState(['All Categories', 'Vehicle', 'Jewelry', 'Electronic', 'Watch', 'House', 'Art']);

    useEffect(() => {
        fetchUserId();
        fetchItems();
    }, []);

    const fetchUserId = () => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(parseInt(storedUserId, 10));
        } else {
            console.error('User ID not found in local storage.');
        }
    };

    const fetchItems = async () => {
        try {
            const response = await fetch('http://localhost:5000/items');
            if (response.ok) {
                const data = await response.json();
                setItems(data);
                setFilteredItems(data);
            } else {
                console.error('Error fetching items:', response.statusText);
            }
        } catch (err) {
            console.error('Error fetching items:', err);
        }
    };

    const handleBidChange = (itemId, amount) => {
        setBidAmount(prevBidAmount => ({
            ...prevBidAmount,
            [itemId]: amount
        }));
    };

    const handleBidSubmit = async (itemId) => {
        const bid = parseFloat(bidAmount[itemId]);
        if (isNaN(bid) || bid <= 0) {
            setMessage('Please enter a valid bid amount.');
            return;
        }

        if (!userId) {
            setMessage('User is not logged in.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/bids', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount: bid, item_id: itemId, user_id: userId })
            });

            if (response.ok) {
                setMessage('Bid placed successfully!');
                fetchItems();
            } else {
                const errorData = await response.json();
                setMessage(`Failed to place bid: ${errorData.error}`);
            }
        } catch (err) {
            console.error('Error placing bid:', err);
            setMessage('Error placing bid. Please try again.');
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        if (category === 'All Categories') {
            setFilteredItems(items);
        } else {
            setFilteredItems(items.filter(item => item.category === category));
        }
    };

    return (
        <div className="auction-items-container">
            <h2>Available Auction Items</h2>

            <div className="category-filter">
                <FaSearch className="search-icon" />
                <div className="category-buttons">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="items-list">
                {filteredItems.length > 0 ? (
                    <ul>
                        {filteredItems.map(item => (
                            <li key={item.id} className="item-card">
                                <img src={item.image_url} alt={item.name} />
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <p>Starting Bid: ksh {item.starting_price.toFixed(2)}</p>
                                <p>Category: {item.category}</p>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleBidSubmit(item.id);
                                    }}
                                >
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={bidAmount[item.id] || ''}
                                        onChange={(e) => handleBidChange(item.id, e.target.value)}
                                        placeholder="Enter your bid"
                                    />
                                    <button type="submit">Place Bid</button>
                                </form>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No items available at the moment.</p>
                )}
            </div>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default AuctionItems;
