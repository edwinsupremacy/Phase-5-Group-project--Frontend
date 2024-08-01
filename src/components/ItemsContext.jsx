import React, { createContext, useState, useContext } from 'react';

const ItemsContext = createContext();

export const useItems = () => {
    return useContext(ItemsContext);
};

export const ItemsProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [sellerName, setSellerName] = useState('');

    const addItem = (item) => {
        setItems([...items, { ...item, seller: sellerName }]); // Add seller info to the item
    };

    const setSeller = (name) => {
        setSellerName(name);
    };

    return (
        <ItemsContext.Provider value={{ items, addItem, setSeller }}>
            {children}
        </ItemsContext.Provider>
    );
};
