import React, { useState } from 'react';
import './SellerDashboard.css';

function SellerDashboard() {
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [error, setError] = useState('');

    const handleAddItem = (event) => {
        event.preventDefault();
        if (!itemName || !itemDescription || !itemPrice) {
            setError('Please fill in all fields.');
            return;
        }
        setError('');

        const newItem = { name: itemName, description: itemDescription, price: itemPrice };
        setItems([...items, newItem]);

        // Clear form
        setItemName('');
        setItemDescription('');
        setItemPrice('');
    };

    return (
        <div className="dashboard-container">
            <h1>Seller Dashboard</h1>
            <div className="add-item-section">
                <h2>Add New Item</h2>
                <form onSubmit={handleAddItem}>
                    <input
                        type="text"
                        placeholder="Item Name"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Item Description"
                        value={itemDescription}
                        onChange={(e) => setItemDescription(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Item Price"
                        value={itemPrice}
                        onChange={(e) => setItemPrice(e.target.value)}
                    />
                    <button type="submit">Add Item</button>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
            <div className="items-list-section">
                <h2>Items for Auction</h2>
                <ul>
                    {items.length === 0 ? (
                        <p>No items added yet.</p>
                    ) : (
                        items.map((item, index) => (
                            <li key={index}>
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <p>Price: ${item.price}</p>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}

export default SellerDashboard;
