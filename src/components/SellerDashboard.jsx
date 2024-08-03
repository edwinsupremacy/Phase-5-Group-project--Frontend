import React, { useState, useEffect } from 'react';
import './SellerDashboard.css';

const SellerDashboard = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        fetchItems();
        fetchCategories(); // Fetch categories when component mounts
    }, []);

    // Function to fetch items from the server
    const fetchItems = async () => {
        try {
            const response = await fetch('http://localhost:5000/items');
            if (response.ok) {
                const data = await response.json();
                setItems(data);
                setFilteredItems(data); // Set initial filtered items
            } else {
                console.error('Error fetching items:', response.statusText);
            }
        } catch (err) {
            console.error('Error fetching items:', err);
        }
    };

    // Function to fetch categories from the server
    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:5000/categories');
            if (response.ok) {
                const data = await response.json();
                setCategories(['All', ...data]); // Prepend 'All' to category list
            } else {
                console.error('Error fetching categories:', response.statusText);
            }
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    };

    // Filter items based on selected category
    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
        if (category === 'All') {
            setFilteredItems(items);
        } else {
            setFilteredItems(items.filter(item => item.category === category));
        }
    };

    return (
        <div className="seller-dashboard-container">
            <h2>Seller Dashboard</h2>

            {/* Category Filter Dropdown */}
            <div className="category-filter">
                <label htmlFor="category">Filter by Category:</label>
                <select
                    id="category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="items-list">
                {filteredItems.length > 0 ? (
                    <ul>
                        {filteredItems.map(item => (
                            <li key={item.id} className="item-card">
                                <img src={item.image_url} alt={item.name} />
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <p>Starting Bid: ksh {item.starting_price.toFixed(2)}</p>
                                <p>Category: {item.category}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No items available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default SellerDashboard;
