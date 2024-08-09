import React, { useState, useEffect } from 'react';
import './SellerDashboard.css';
import axiosInstance from "./utils/axiosConfig";

const SellerDashboard = () => {
    const [items, setItems] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startingPrice: '',
        category: '',
        subCategory: '',
        imageUrl: ''
    });
    const [error, setError] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [shouldFetchItems, setShouldFetchItems] = useState(true);
    const [showItems, setShowItems] = useState(false);
    const [biddersVisibility, setBiddersVisibility] = useState({});
    const [bids, setBids] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('');

    const categoryData = {
        Vehicle: ["Car", "Motorcycle", "Truck"],
        Jewelry: ["Ring", "Necklace", "Bracelet"],
        Electronic: ["Phone", "Laptop", "Tablet"],
        Watch: ["Analog", "Digital", "Smart"],
        House: ["Apartment", "Villa", "Cottage"],
        Art: ["Painting", "Sculpture", "Photography"]
    };

    useEffect(() => {
        if (shouldFetchItems) {
            fetchItems();
        }
    }, [shouldFetchItems]);

    useEffect(() => {
        filterItems();
    }, [items, selectedCategory, formData.subCategory]);

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
            setFilteredItems(items.filter(item => 
                item.category === selectedCategory &&
                (!formData.subCategory || item.subCategory === formData.subCategory)
            ));
        } else {
            setFilteredItems(items);
        }
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

    const handleCategoryFilter = (category) => {
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
        const { name, description, startingPrice, category, subCategory, imageUrl } = formData;

        if (!name || !description || !startingPrice || !category || !subCategory || !imageUrl) {
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
            image_url: imageUrl
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

            setFormData({ name: '', description: '', startingPrice: '', category: '', subCategory: '', imageUrl: '' });
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
            subCategory: itemToEdit.sub_category || '',
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
                        <option value="">Select Subcategory</option>
                        {subCategories.map((subCategory, index) => (
                            <option key={index} value={subCategory}>{subCategory}</option>
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
                    {error && <p className="seller-error">{error}</p>}
                </form>
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
                    <div className="seller-items-list">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item, index) => (
                                <div key={item.id} className="seller-item-card">

                                    <h3 className="seller-item-title">{item.name}</h3>
                                    <img src={item.image_url} alt={item.name} className="seller-item-image" />
                                    <p className="seller-item-description">{item.description}</p>
                                    <p className="seller-item-price">Starting Price: ksh {item.starting_price.toLocaleString()}</p>
                                    <p className="seller-item-category">Category: {item.category}</p>
                                    <p className="seller-item-subcategory">Subcategory: {item.subCategory}</p>
                                    <div className="seller-item-actions">
                                        <button onClick={() => handleEdit(index)} className="seller-edit-button">Edit</button>
                                        <button onClick={() => handleDelete(index)} className="seller-delete-button">Delete</button>
                                        <button onClick={() => handleLiveBidding(index)} className="seller-bid-button">Start Live</button>
                                        <button onClick={() => handleEndBidding(index)} className="seller-end-button">End Live</button>
                                        <button onClick={() => toggleBiddersVisibility(index)} className="seller-bids-button">
                                            {biddersVisibility[index] ? 'Hide Bidders' : 'View Bidders'}
                                        </button>
                                    </div>
                                    {biddersVisibility[index] && bids[item.id] && (
                                        <div className="seller-bidders-list">
                                            {bids[item.id].map(bid => (
                                                <div key={bid.id} className="seller-bid">
                                                   <p className="seller-bid-amount">Bid Amount: ksh {bid.amount.toLocaleString()}</p>
                                                    <p className="seller-bid-user">bidder: {bid.username}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No items available.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SellerDashboard;
