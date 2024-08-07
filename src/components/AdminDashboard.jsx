import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import axiosInstance from "./utils/axiosConfig";

const AdminDashboard = () => {
    const [items, setItems] = useState([]);
    const [users, setUsers] = useState([]);
    const [bids, setBids] = useState({});
    const [shouldFetchData, setShouldFetchData] = useState(true);
    const [showItems, setShowItems] = useState(false);
    const [showUsers, setShowUsers] = useState(false);
    const [biddersVisibility, setBiddersVisibility] = useState({});

    useEffect(() => {
        if (shouldFetchData) {
            fetchItems();
            fetchUsers();
            setShouldFetchData(false); // Ensure we do not refetch unnecessarily
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

    const handleDeleteUser = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/users/delete/${userId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result.message);

           
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        } catch (err) {
            console.error('Error deleting user:', err);
        }
    };

    
    const toggleItemsVisibility = () => {
        setShowItems(!showItems);
    };

    const toggleUsersVisibility = () => {
        setShowUsers(!showUsers);
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
                                                        <li key={bid.id}>{bid.bidder_name} - ksh {bid.amount.toFixed(2)}</li>
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
        </div>
    );
};

export default AdminDashboard;
