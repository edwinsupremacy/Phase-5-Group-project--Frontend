import React, { useState, useEffect } from 'react';
import './SellerDashboard.css';
import axiosInstance from "./utils/axiosConfig";
import io from 'socket.io-client';

const SellerDashboard = () => {
    const [items, setItems] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startingPrice: '',
        category: '',
        subCategory: '', // Ensure this is properly initialized
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
            subCategory: '' // Reset subCategory when category changes
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
            sub_category: subCategory, // Ensure this is correctly included
            image_url: imageUrl
        };

        console.log('Submitting Item:', newItem); // Debugging log

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
            subCategory: itemToEdit.sub_category || '', // Handle potential undefined value
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

<<<<<<< HEAD
    const handleStartLiveBidSession = async (itemId) => {
        try {
           await axiosInstance.post(`http://localhost:5000/auctions/${itemId}/start`);

            alert('Live bidding session started successfully.');
        } catch (error) {
            console.error('Error starting live bid session:', error);
            alert('Failed to start live bid session.');
        }
    };

    const handleEndLiveBidSession = async (itemId) => {
        try {
           await axiosInstance.delete(`http://localhost:5000/auctions/${itemId}/end`);
            alert('Live bidding session ended successfully.');
        } catch (error) {
            console.error('Error ending live bid session:', error);
            alert('Failed to end live bid session.');
        }
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

=======
>>>>>>> 822d48ce2c4e7b49a1dbd3564960ba370f0e4e67
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
                        value={formData.subCategory} // Ensure value is correctly set
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
                <button onClick={toggleItemsVisibility} className="seller-list-toggle-button">
                    {showItems ? 'Hide Items' : 'Show Items'}
                </button>
                {showItems && (
<<<<<<< HEAD
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
                                            <button onClick={() => handleEdit(index)} className="seller-item-edit-button">Edit</button>
                                            <button onClick={() => handleDelete(index)} className="seller-item-delete-button">Delete</button>
                                            <button onClick={() => handleStartLiveBidSession(item.id)} className="seller-item-live-bid-start-button">Start Live Bidding</button>
                                            <button onClick={() => handleEndLiveBidSession(item.id)} className="seller-item-live-bid-end-button">End Live Bidding</button>
                                            <button onClick={() => toggleBiddersVisibility(index)} className="seller-item-bidders-toggle-button">
                                                {biddersVisibility[index] ? 'Hide Bidders' : 'Show Bidders'}
                                            </button>
                                            {biddersVisibility[index] && (
                                                <div className="seller-item-bidders-list">
                                                    {bids[item.id] ? (
                                                        bids[item.id].map((bid, bidIndex) => (
                                                            <div key={bidIndex} className="seller-bid">
                                                                <p>Bidder: {bid.bidder}</p>
                                                                <p>Amount: ksh {new Intl.NumberFormat().format(bid.amount.toFixed(2))}</p>
                                                                <p>Time: {new Date(bid.timestamp).toLocaleString()}</p>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p>No bids available</p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No items available</p>
                            )}
                        </div>
                    </>
=======
                    <div className="seller-items-list">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item, index) => (
                                <div key={item.id} className="seller-item-card">
                                    <h3 className="seller-item-title">{item.name}</h3>
                                    <p className="seller-item-description">{item.description}</p>
                                    <p className="seller-item-price">Starting Price: ${item.starting_price}</p>
                                    <p className="seller-item-category">Category: {item.category}</p>
                                    <p className="seller-item-subcategory">Subcategory: {item.sub_category}</p>
                                    <img src={item.image_url} alt={item.name} className="seller-item-image" />
                                    <button onClick={() => handleEdit(index)} className="seller-item-edit-button">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(index)} className="seller-item-delete-button">
                                        Delete
                                    </button>
                                    <button onClick={() => toggleBiddersVisibility(index)} className="seller-item-bidders-button">
                                        {biddersVisibility[index] ? 'Hide Bidders' : 'Show Bidders'}
                                    </button>
                                    {biddersVisibility[index] && bids[item.id] && (
                                        <div className="seller-bidders-list">
                                            {bids[item.id].map(bid => (
                                                <div key={bid.id} className="seller-bid">
                                                    <p className="seller-bid-amount">Bid Amount: ${bid.amount}</p>
                                                    <p className="seller-bid-user">User: {bid.username}</p>
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
>>>>>>> 822d48ce2c4e7b49a1dbd3564960ba370f0e4e67
                )}
            </div>
        </div>
    );
};

export default SellerDashboard;
