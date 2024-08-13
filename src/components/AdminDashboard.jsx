import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './AdminDashboard.css';
import axiosInstance from "./utils/axiosConfig";

const AdminDashboard = () => {
    const [items, setItems] = useState([]);
    const [users, setUsers] = useState([]);
    const [sellers, setSellers] = useState([]);
    const [bids, setBids] = useState({});
    const [reviews, setReviews] = useState([]);
    const [showItems, setShowItems] = useState(false);
    const [showUsers, setShowUsers] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    const [showSellers, setShowSellers] = useState(false);
    const [biddersVisibility, setBiddersVisibility] = useState({});
    const [shouldFetchData, setShouldFetchData] = useState(true);

    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        if (shouldFetchData) {
            fetchItems();
            fetchUsers();
            fetchReviews();
            fetchSellers(); // Fetch sellers data
            setShouldFetchData(false); 
        }
    }, [shouldFetchData]);

    const fetchItems = async () => {
        try {
            const response = await axiosInstance.get('http://localhost:5000/items');
            setItems(response.data);
        } catch (err) {
            console.error('Error fetching items:', err);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get('http://localhost:5000/users');
            setUsers(response.data);
        } catch (err) {
            console.error('Error fetching users:', err);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await axiosInstance.get('http://localhost:5000/reviews');
            setReviews(response.data);
        } catch (err) {
            console.error('Error fetching reviews:', err);
        }
    };

    const fetchSellers = async () => {
        try {
            const response = await axiosInstance.get('http://localhost:5000/sellers');
            setSellers(response.data);
        } catch (err) {
            console.error('Error fetching sellers:', err);
        }
    };

    const fetchBids = async (itemId) => {
        try {
            const response = await axiosInstance.get(`http://localhost:5000/items/${itemId}/bids`);
            setBids(prev => ({
                ...prev,
                [itemId]: response.data.bids
            }));
        } catch (err) {
            console.error('Error fetching bids:', err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login'); // Navigate to login page
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axiosInstance.delete(`http://localhost:5000/users/delete/${userId}`);
            fetchUsers(); // Refresh the user list after deletion
        } catch (err) {
            console.error('Error deleting user:', err);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            await axiosInstance.delete(`http://localhost:5000/reviews/${reviewId}`);
            fetchReviews(); // Refresh the review list after deletion
        } catch (err) {
            console.error('Error deleting review:', err);
        }
    };

    const handleDeleteSeller = async (sellerId) => {
        try {
            await axiosInstance.delete(`http://localhost:5000/sellers/${sellerId}`);
            fetchSellers(); // Refresh the seller list after deletion
        } catch (err) {
            console.error('Error deleting seller:', err);
        }
    };

    const toggleItemsVisibility = () => {
        setShowItems(!showItems);
    };

    const toggleUsersVisibility = () => {
        setShowUsers(!showUsers);
    };

    const toggleReviewsVisibility = () => {
        setShowReviews(!showReviews);
    };

    const toggleSellersVisibility = () => {
        setShowSellers(!showSellers);
    };

    const toggleBiddersVisibility = (index) => {
        const itemId = items[index].id;
        if (!biddersVisibility[index]) {
            fetchBids(itemId);
        }
        setBiddersVisibility(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div className="admin-dashboard-container">
            <h1 className="admin-dashboard-title">Admin Dashboard</h1>

            <div className="admin-section">
                <button onClick={toggleItemsVisibility} className="admin-list-toggle-button">
                    {showItems ? 'Hide Items' : 'Show Items'}
                </button>
                {showItems && (
                    <div className="admin-items-container">
                        {items.length > 0 ? (
                            items.map((item, index) => (
                                <div key={item.id} className="admin-item-card">
                                    <img src={item.image_url} alt={item.name} className="admin-item-image" />
                                    <div className="admin-item-details">
                                        <h3 className="admin-item-name">{item.name}</h3>
                                        <p className="admin-item-description">{item.description}</p>
                                        <p className="admin-item-price">Starting Price: ksh {new Intl.NumberFormat().format(item.starting_price.toFixed(2))}</p>
                                        <p className="admin-item-category">Category: {item.category}</p>
                                    </div>
                                    <div className="admin-item-actions">
                                        <button onClick={() => toggleBiddersVisibility(index)} className="admin-item-button">
                                            {biddersVisibility[index] ? 'Hide Bidders' : 'View Bidders'}
                                        </button>
                                    </div>
                                    {biddersVisibility[index] && (
                                        <div className="admin-item-bids">
                                            <h4>Bids:</h4>
                                            {bids[item.id] && bids[item.id].length > 0 ? (
                                                <ul>
                                                    {bids[item.id].map(bid => (
                                                        <li key={bid.id}>{bid.username} - ksh {bid.amount.toFixed(2)}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p>No bids yet</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No items found.</p>
                        )}
                    </div>
                )}
            </div>

            <div className="admin-section">
                <button onClick={toggleUsersVisibility} className="admin-list-toggle-button">
                    {showUsers ? 'Hide Users' : 'Show Users'}
                </button>
                {showUsers && (
                    <div className="admin-users-container">
                        {users.length > 0 ? (
                            users.map((user) => (
                                <div key={user.id} className="admin-user-card">
                                    <div className="admin-user-details">
                                        <h3 className="admin-user-name">{user.username}</h3>
                                        <p className="admin-user-email">{user.email}</p>
                                        <p className="admin-user-phone">{user.phone_number}</p>
                                    </div>
                                    <div className="admin-user-actions">
                                        <button onClick={() => handleDeleteUser(user.id)} className="admin-user-button">Delete User</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No users found.</p>
                        )}
                    </div>
                )}
            </div>

            <div className="admin-section">
                <button onClick={toggleReviewsVisibility} className="admin-list-toggle-button">
                    {showReviews ? 'Hide Reviews' : 'Show Reviews'}
                </button>
                {showReviews && (
                    <div className="admin-reviews-container">
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <div key={review.id} className="admin-review-card">
                                    <div className="admin-review-details">
                                        <h3 className="admin-review-name">{review.reviewName}</h3>
                                        <p className="admin-review-rating">Rating: {review.rating}</p>
                                        <p className="admin-review-message">{review.reviewMessage}</p>
                                    </div>
                                    <div className="admin-review-actions">
                                        <button onClick={() => handleDeleteReview(review.id)} className="admin-review-button">Delete Review</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No reviews found.</p>
                        )}
                    </div>
                )}
            </div>

            <div className="admin-section">
                <button onClick={toggleSellersVisibility} className="admin-list-toggle-button">
                    {showSellers ? 'Hide Sellers' : 'Show Sellers'}
                </button>
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
                {showSellers && (
                    <div className="admin-sellers-container">
                        {sellers.length > 0 ? (
                            sellers.map((seller) => (
                                <div key={seller.id} className="admin-seller-card">
                                    <div className="admin-seller-details">
                                        <h3 className="admin-seller-name">{seller.name}</h3>
                                        <p className="admin-seller-email">{seller.email}</p>
                                        <p className="admin-seller-phone">{seller.phone}</p>
                                    </div>
                                    <div className="admin-seller-actions">
                                        <button onClick={() => handleDeleteSeller(seller.id)} className="admin-seller-button">Delete Seller</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No sellers found.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
