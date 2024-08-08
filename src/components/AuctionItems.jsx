import React, { useState, useEffect } from 'react';
import './AuctionItems.css';
import { FaSearch } from 'react-icons/fa';
import ImageModal from './ImageModal'; // Import the modal component

const AuctionItems = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [bidAmount, setBidAmount] = useState({});
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [categories] = useState(['All Categories', 'Vehicle', 'Jewelry', 'Electronic', 'Watch', 'House', 'Art']);
    const [subCategories, setSubCategories] = useState([]);
    const [placedBids, setPlacedBids] = useState({});
    const [selectedImage, setSelectedImage] = useState(null); // State for modal

    const categoryData = {
        Vehicle: ["Car", "Motorcycle", "Truck"],
        Jewelry: ["Ring", "Necklace", "Bracelet"],
        Electronic: ["Phone", "Laptop", "Tablet"],
        Watch: ["Analog", "Digital", "Smart"],
        House: ["Apartment", "Villa", "Cottage"],
        Art: ["Painting", "Sculpture", "Photography"]
    };

    useEffect(() => {
        fetchUserId();
        fetchItems();
    }, []);

    useEffect(() => {
        filterItems();
    }, [items, selectedCategory, selectedSubCategory]);

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
                const bidData = await response.json();
                setPlacedBids(prevBids => ({
                    ...prevBids,
                    [itemId]: bidData.bid.id  
                }));
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

    const handleBidCancel = async (itemId) => {
        const bidId = placedBids[itemId];
        if (!bidId) {
            setMessage('No bid to cancel.');
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:5000/bids/${bidId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                setPlacedBids(prevBids => {
                    const newBids = { ...prevBids };
                    delete newBids[itemId];
                    return newBids;
                });
    
                setBidAmount(prevBidAmount => {
                    const newBidAmount = { ...prevBidAmount };
                    delete newBidAmount[itemId];
                    return newBidAmount;
                });
    
                setMessage('Bid canceled successfully!');
                fetchItems();
            } else {
                const errorData = await response.json();
                setMessage(`Failed to cancel bid: ${errorData.error}`);
            }
        } catch (err) {
            console.error('Error canceling bid:', err);
            setMessage('Error canceling bid. Please try again.');
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setSubCategories(categoryData[category] || []);
        setSelectedSubCategory('');
    };

    const handleSubCategoryChange = (subCategory) => {
        setSelectedSubCategory(subCategory);
    };

    const filterItems = () => {
        setFilteredItems(items.filter(item => 
            (selectedCategory === 'All Categories' || item.category === selectedCategory) &&
            (selectedSubCategory === '' || item.subCategory === selectedSubCategory)
        ));
    };

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
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
                {selectedCategory !== 'All Categories' && (
                    <div className="subcategory-buttons">
                        {subCategories.map(subCategory => (
                            <button
                                key={subCategory}
                                className={`subcategory-button ${selectedSubCategory === subCategory ? 'active' : ''}`}
                                onClick={() => handleSubCategoryChange(subCategory)}
                            >
                                {subCategory}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="items-list">
                {filteredItems.length > 0 ? (
                    <ul>
                        {filteredItems.map(item => (
                            <li key={item.id} className="item-card">
                                <img 
                                    src={item.image_url} 
                                    alt={item.name} 
                                    onClick={() => handleImageClick(item.image_url)} 
                                />
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <p>Starting Bid: ksh {item.starting_price.toFixed(2)}</p>
                                <p>Category: {item.category}</p>
                                <p>Subcategory: {item.subCategory}</p>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if (placedBids[item.id]) {
                                            handleBidCancel(item.id);
                                        } else {
                                            handleBidSubmit(item.id);
                                        }
                                    }}
                                >
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={bidAmount[item.id] || ''}
                                        onChange={(e) => handleBidChange(item.id, e.target.value)}
                                        placeholder="Enter your bid"
                                    />
                                    <button type="submit">
                                        {placedBids[item.id] ? 'Cancel Bid' : 'Place Bid'}
                                    </button>
                                </form>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No items available at the moment.</p>
                )}
            </div>
            {message && <p className="message">{message}</p>}
            <ImageModal imageUrl={selectedImage} onClose={handleCloseModal} />
        </div>
    );
};

export default AuctionItems;
