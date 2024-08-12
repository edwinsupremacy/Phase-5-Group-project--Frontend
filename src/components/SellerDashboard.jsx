import React, { useState, useEffect } from 'react';
import './SellerDashboard.css';
import axiosInstance from "./utils/axiosConfig";

const SellerDashboard = ({ sellerId }) => {
    const [items, setItems] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startingPrice: '',
        category: '',
        subCategory: '',
        imageUrl: '',
        sellerId: sellerId || ''  // Add sellerId to formData
    });
    const [error, setError] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [showItems, setShowItems] = useState(false);
    const [biddersVisibility, setBiddersVisibility] = useState({});
    const [bids, setBids] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');  // State for category filter

    const categoryData = {
        Vehicle: ["Car", "Motorcycle", "Truck"],
        Jewelry: ["Ring", "Necklace", "Bracelet"],
        Electronic: ["Phone", "Laptop", "Tablet"],
        Watch: ["Analog", "Digital", "Smart"],
        House: ["Apartment", "Villa", "Cottage"],
        Art: ["Painting", "Sculpture", "Photography"]
    };

    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        filterItems();
    }, [items, selectedCategory, formData.subCategory, categoryFilter]);  // Add categoryFilter to dependencies

    const fetchItems = async () => {
        try {
            const response = await axiosInstance.get('http://localhost:5000/items');
            setItems(response.data);
        } catch (err) {
            console.error('Error fetching items:', err.response ? err.response.data : err.message);
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
        setFilteredItems(items.filter(item =>
            (!categoryFilter || item.category === categoryFilter) &&
            (!selectedCategory || item.category === selectedCategory) &&
            (!formData.subCategory || item.sub_category === formData.subCategory)
        ));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setSelectedCategory(selectedCategory);
        setSubCategories(categoryData[selectedCategory] || []);
        setFormData(prev => ({
            ...prev,
            category: selectedCategory,
            subCategory: ''
        }));
    };

    const handleCategoryFilterChange = (e) => {
        setCategoryFilter(e.target.value);  // Update category filter
    };

    const handleCategoryFilter = (category) => {
        setCategoryFilter(category);
        setSelectedCategory(category);
        setSubCategories(categoryData[category] || []);
        setFormData(prev => ({
            ...prev,
            category,
            subCategory: ''
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, description, startingPrice, category, subCategory, imageUrl, sellerId } = formData;

        if (!name || !description || !startingPrice || !category || !subCategory || !imageUrl || !sellerId) {
            setError('Please fill in all fields.');
            return;
        }

        setError('');

        const newItem = {
            name,
            description,
            starting_price: parseFloat(startingPrice),
            category,
            sub_category: subCategory,
            image_url: imageUrl,
            seller_id: sellerId  // Include sellerId in new item
        };

        console.log('Submitting Item:', newItem);

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

            setFormData({ name: '', description: '', startingPrice: '', category: '', subCategory: '', imageUrl: '', sellerId: sellerId || '' });
            setEditIndex(null);
            fetchItems();  // Re-fetch items after submission
        } catch (err) {
            setError('Error adding/updating item');
            console.error(err);
        }
    };
    const handleBidAction = async (bidId, action) => {
        try {
            await axiosInstance.put(`http://localhost:5000/bids/${bidId}/action`, { status: action });

            fetchItems(); // Re-fetch items after bid action
        } catch (err) {
            console.error('Error updating bid status:', err);
            setError('Failed to update bid status');
        }
    };

    const handleDelete = async (index) => {
        const itemId = items[index].id;
        try {
            await axiosInstance.delete(`http://localhost:5000/items/${itemId}`);
            fetchItems();  // Re-fetch items after deletion
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
            subCategory: itemToEdit.sub_category || '',
            imageUrl: itemToEdit.image_url,
            sellerId: itemToEdit.seller_id || ''  // Set sellerId for editing
        });
        setEditIndex(index);
    };

    const toggleItemsVisibility = () => {
        setShowItems(prev => !prev);
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
                    <input
                        type="text"
                        name="sellerId"
                        placeholder="Seller ID"
                        value={formData.sellerId}
                        onChange={handleChange}
                        className="seller-input"
                        autoComplete="off"
                    />
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleCategoryChange}
                        className="seller-input"
                    >
                        <option value="">Select Category</option>
                        {Object.keys(categoryData).map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    <select
                        name="subCategory"
                        value={formData.subCategory}
                        onChange={handleChange}
                        className="seller-input"
                        disabled={!selectedCategory}
                    >
                        <option value="">Select Sub-Category</option>
                        {subCategories.map(sub => (
                            <option key={sub} value={sub}>{sub}</option>
                        ))}
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
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>

            <div className="seller-items-section">
                <div className="seller-filter-section">
                    {Object.keys(categoryData).map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryFilter(category)}
                            className={`seller-filter-button ${selectedCategory === category ? 'active' : ''}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <button onClick={toggleItemsVisibility} className="seller-list-toggle-button">
                    {showItems ? 'Hide Items' : 'Show Items'}
                </button>

                {showItems && (
                    <div className="items-list">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item, index) => (
                                <div key={item.id} className="item-card">
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <p>Starting Price: ksh {item.starting_price}</p>
                                    <p>Category: {item.category}</p>
                                    <p>Sub-Category: {item.sub_category}</p>
                                    <img src={item.image_url} alt={item.name} className="item-image" />
                                    <button onClick={() => handleEdit(index)} className="edit-button">Edit</button>
                                    <button onClick={() => handleDelete(index)} className="delete-button">Delete</button>
                                    <button onClick={() => toggleBiddersVisibility(index)} className="toggle-bidders-button">
                                        {biddersVisibility[index] ? 'Hide Bidders' : 'Show Bidders'}
                                    </button>
                                    {biddersVisibility[index] && bids[item.id] && (
                                        <div className="seller-bidders-list">
                                            {bids[item.id].map(bid => (
                                                <div key={bid.id} className="seller-bid">
                                                    <p className="seller-bid-amount">Bided Amount: ksh {bid.amount.toLocaleString()}</p>
                                                    <p className="seller-bid-user">bidder: {bid.username}</p>
                                                    <button onClick={() => handleBidAction(bid.id, 'Accepted')}>Accept</button>
                                                    <button onClick={() => handleBidAction(bid.id, 'Rejected')}>Reject</button>
                                                </div>
                                            ))}
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
        </div>

    );
};

export default SellerDashboard;
