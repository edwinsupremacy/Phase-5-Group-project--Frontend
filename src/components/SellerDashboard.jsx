import React, { useState, useEffect } from 'react';
import './SellerDashboard.css';

function SellerDashboard() {
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [startingPrice, setStartingPrice] = useState('');
    const [category, setCategory] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch('http://localhost:5000/items');
            const data = await response.json();
            setItems(data);
        } catch (err) {
            console.error('Error fetching items:', err);
        }
    };

    const handleAddItem = async (event) => {
        event.preventDefault();
        if (!itemName || !itemDescription || !startingPrice || !category || !imageUrl) {
            setError('Please fill in all fields.');
            return;
        }
        setError('');

        const newItem = {
            name: itemName,
            description: itemDescription,
            starting_price: parseFloat(startingPrice),
            category: category,
            image_url: imageUrl
        };

        try {
            const response = editIndex !== null
                ? await fetch(`http://localhost:5000/items/${items[editIndex].id}`, {
                      method: 'PUT',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(newItem),
                  })
                : await fetch('http://localhost:5000/items', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(newItem),
                  });

            if (!response.ok) {
                throw new Error('Failed to save item');
            }
            fetchItems();
            setItemName('');
            setItemDescription('');
            setStartingPrice('');
            setCategory('');
            setImageUrl('');
            setEditIndex(null);
        } catch (err) {
            setError('Error adding/updating item');
            console.error(err);
        }
    };

    const handleDeleteItem = async (index) => {
        const itemId = items[index].id;
        try {
            const response = await fetch(`http://localhost:5000/items/${itemId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete item');
            }
            fetchItems();
        } catch (err) {
            setError('Error deleting item');
            console.error(err);
        }
    };

    const handleEditItem = (index) => {
        const itemToEdit = items[index];
        setItemName(itemToEdit.name);
        setItemDescription(itemToEdit.description);
        setStartingPrice(itemToEdit.starting_price);
        setCategory(itemToEdit.category);
        setImageUrl(itemToEdit.image_url);
        setEditIndex(index);
    };

    return (
        <div className="dashboard-container">
            <h1>Seller Dashboard</h1>
            <div className="add-item-section">
                <h2>{editIndex !== null ? 'Update Item' : 'Add New Item'}</h2>
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
                        placeholder="Starting Price"
                        value={startingPrice}
                        onChange={(e) => setStartingPrice(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <button type="submit">{editIndex !== null ? 'Update Item' : 'Add Item'}</button>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
            <div className="items-section">
                <h2>Your Items</h2>
                {items.length > 0 ? (
                    <div className="items-container">
                        {items.map((item, index) => (
                            <div className="item-card" key={item.id}>
                                <img src={item.image_url} alt={item.name} className="item-image" />
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <p>Starting Price: ${item.starting_price}</p>
                                    <p>Category: {item.category}</p>
                                    <div className="item-actions">
                                        <button onClick={() => handleEditItem(index)}>Update</button>
                                        <button onClick={() => handleDeleteItem(index)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No items added yet.</p>
                )}
            </div>
        </div>
    );
}

export default SellerDashboard;
