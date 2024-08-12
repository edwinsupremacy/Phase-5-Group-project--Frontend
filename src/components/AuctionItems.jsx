import React, { useState, useEffect } from 'react';
import './AuctionItems.css';
import { FaSearch, FaClock, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import ImageModal from './ImageModal';
import { useNavigate } from 'react-router-dom';

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
    const [recentBids, setRecentBids] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showRecentBids, setShowRecentBids] = useState(true); // State to control collapsible section

    const navigate = useNavigate();

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
        fetchRecentBids();
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

    const fetchRecentBids = async () => {
        if (!userId) return;
        try {
            const response = await fetch(`http://localhost:5000/users/${userId}/recent-bids`);
            if (response.ok) {
                const data = await response.json();
                setRecentBids(data);
            } else {
                console.error('Error fetching recent bids:', response.statusText);
            }
        } catch (err) {
            console.error('Error fetching recent bids:', err);
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
                fetchRecentBids();
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
                fetchRecentBids();
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
            (selectedSubCategory === '' || item.sub_category === selectedSubCategory)
        ));
    };

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    const toggleRecentBids = () => {
        navigate('/recent-bids');
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

            {selectedCategory !== 'All Categories' && subCategories.length > 0 && (
                <div className="subcategory-container">
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
            <div className="recent-bids-section">
                <h3 onClick={toggleRecentBids} className="recent-bids-title">
                    <FaClock /> Recent Bids {showRecentBids ? <FaChevronUp /> : <FaChevronDown />}
                </h3>
                <div className="items-grid">
                    {filteredItems.map(item => (
                        <div key={item.id} className="item-card">
                            <img
                                src={item.image_url}
                                alt={item.name}
                                className="item-image"
                                onClick={() => handleImageClick(item.image_url)}
                            />
                            <h3 className="item-title">{item.name}</h3>
                            <p className="item-description">{item.description}</p>
                            <p className="item-price">Starting Price: ksh {item.starting_price.toLocaleString()}</p>
                            {placedBids[item.id] ? (
                                <button
                                    className="cancel-bid-button"
                                    onClick={() => handleBidCancel(item.id)}
                                >
                                    Cancel Bid
                                </button>
                            ) : (
                                <>
                                    <input
                                        type="number"
                                        value={bidAmount[item.id] || ''}
                                        onChange={(e) => handleBidChange(item.id, e.target.value)}
                                        placeholder="Enter bid amount"
                                    />
                                    <button
                                        className="place-bid-button"
                                        onClick={() => handleBidSubmit(item.id)}
                                    >
                                        Place Bid
                                    </button>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {selectedImage && (
                    <ImageModal
                        imageUrl={selectedImage}
                        onClose={handleCloseModal}
                    />
                )}


                {showRecentBids && recentBids.length > 0 && (
                    <ul className="recent-bids-list">
                        {recentBids.map(bid => (
                            <li key={bid.id} className="recent-bid-card">
                                <p><strong>Item:</strong> {bid.item.name}</p>
                                <p><strong>Bid Amount:</strong> ksh {parseFloat(bid.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                <p><strong>Status:</strong> <span className={`bid-status ${bid.status.toLowerCase()}`}>{bid.status}</span></p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default AuctionItems;
