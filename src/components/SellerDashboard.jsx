import React, { useState, useEffect } from 'react';
import './SellerDashboard.css';
import axiosInstance from "./utils/axiosConfig";

const SellerDashboard = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startingPrice: '',
        category: '',
        imageUrl: ''
    });
    const [error, setError] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [shouldFetchItems, setShouldFetchItems] = useState(true);
    const [showItems, setShowItems] = useState(false);
    const [biddersVisibility, setBiddersVisibility] = useState({});
    const [bids, setBids] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        if (shouldFetchItems) {
            fetchItems();
        }
    }, [shouldFetchItems]);

    useEffect(() => {
        filterItems();
    }, [items, selectedCategory]);

    const fetchItems = async () => {
        try {
            const response = await axiosInstance.get('http://localhost:5000/items');
            setItems(response.data);
            setShouldFetchItems(false);
        } catch (err) {
            console.error('Error fetching items:', err);
            setError('Failed to fetch items');
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
            setError('Failed to fetch bids');
        }
    };

    const filterItems = () => {
        if (selectedCategory) {
            setFilteredItems(items.filter(item => item.category === selectedCategory));
        } else {
            setFilteredItems(items);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, description, startingPrice, category, imageUrl } = formData;

        if (!name || !description || !startingPrice || !category || !imageUrl) {
            setError('Please fill in all fields.');
            return;
        }
        setError('');

        const newItem = {
            name,
            description,
            starting_price: parseFloat(startingPrice),
            category,
            image_url: imageUrl
        };

        try {
            const url = editIndex !== null
                ? `http://localhost:5000/items/${items[editIndex].id}`
                : 'http://localhost:5000/items';

            const method = editIndex !== null ? 'PUT' : 'POST';
            await axiosInstance.request({
                url,
                method,
                data: newItem
            });

            setFormData({ name: '', description: '', startingPrice: '', category: '', imageUrl: '' });
            setEditIndex(null);
            setShouldFetchItems(true);
        } catch (err) {
            setError('Error adding/updating item');
            console.error(err);
        }
    };

    const handleDelete = async (index) => {
        const itemId = items[index].id;
        try {
            await axiosInstance.delete(`http://localhost:5000/items/${itemId}`);
            setShouldFetchItems(true);
        } catch (err) {
            setError('Error deleting item');
            console.error(err);
        }
    };

    const handleEdit = (index) => {
        const itemToEdit = items[index];
        setFormData({
            name: itemToEdit.name,
            description: itemToEdit.description,
            startingPrice: itemToEdit.starting_price,
            category: itemToEdit.category,
            imageUrl: itemToEdit.image_url
        });
        setEditIndex(index);
    };

    const toggleItemsVisibility = () => {
        setShowItems(!showItems);
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

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    return (
        <div className="seller-dashboard-container">
            <div className="seller-add-item-section">
                <h1 className="seller-dashboard-title">Seller Dashboard</h1>
                <h2 className="seller-add-item-title">{editIndex !== null ? 'Update Item' : 'Add New Item'}</h2>
                <form onSubmit={handleSubmit} className="seller-add-item-form">
                    <input
                        type="text"
                        name="name"
                        placeholder="Item Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="seller-input"
                        autoComplete="off"
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Item Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="seller-input"
                        autoComplete="off"
                    />
                    <input
                        type="number"
                        name="startingPrice"
                        placeholder="Starting Price"
                        value={formData.startingPrice}
                        onChange={handleChange}
                        className="seller-input"
                        autoComplete="off"
                    />
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="seller-input"
                    >
                        <option value="">Select Category</option>
                        <option value="Vehicle">Vehicle</option>
                        <option value="Jewelry">Jewelry</option>
                        <option value="Electronic">Electronic</option>
                        <option value="Watch">Watch</option>
                        <option value="House">House</option>
                        <option value="Art">Art</option>
                    </select>
                    <input
                        type="text"
                        name="imageUrl"
                        placeholder="Image URL"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="seller-input"
                        autoComplete="off"
                    />
                    <button type="submit" className="seller-submit-button">
                        {editIndex !== null ? 'Update Item' : 'Add Item'}
                    </button>
                    {error && <p className="seller-error">{error}</p>}
                </form>
            </div>

            <div className="seller-items-section">
                <button onClick={toggleItemsVisibility} className="seller-list-toggle-button">
                    {showItems ? 'Hide Items' : 'Show Items'}
                </button>
                {showItems && (
                    <>
                        <div className="seller-category-filter">
                            <select value={selectedCategory} onChange={handleCategoryChange} className="seller-input">
                                <option value="">All Categories</option>
                                <option value="Vehicle">Vehicle</option>
                                <option value="Jewelry">Jewelry</option>
                                <option value="Electronic">Electronic</option>
                                <option value="Watch">Watch</option>
                                <option value="House">House</option>
                                <option value="Art">Art</option>
                            </select>
                        </div>
                          <div className="seller-items-container">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                        <div key={item.id} className="seller-item-card">
                            <img src={item.image_url} alt={item.name} className="seller-item-image" />
                            <div className="seller-item-details">
                                <h3 className="seller-item-name">{item.name}</h3>
                                <p className="seller-item-description">{item.description}</p>
                                <p className="seller-item-price">Starting Price: ksh {new Intl.NumberFormat().format(item.starting_price.toFixed(2))}</p>
                                <p className="seller-item-category">Category: {item.category}</p>
                            </div>
                            <div className="seller-item-actions">
                                <button onClick={() => handleEdit(index)} className="seller-item-button">Edit</button>
                                <button onClick={() => handleDelete(index)} className="seller-item-button">Delete</button>
                                <button onClick={() => toggleBiddersVisibility(index)} className="seller-item-button">
                                    {biddersVisibility[index] ? 'Hide Bidders' : 'View Bidders'}
                                </button>
                            </div>
                            {biddersVisibility[index] && (
                                <div className="seller-item-bids">
                                    <h4>Bids:</h4>
                                    {bids[item.id] && bids[item.id].length > 0 ? (
                                        <ul>
                                            {bids[item.id].map(bid => (
                                                <li key={bid.id}>
                                                    {bid.bidder_name} ({bid.username}) - ksh {bid.amount.toFixed(2)}
                                                </li>
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
                    <p>No items found in this category.</p>
                )}
            </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SellerDashboard;