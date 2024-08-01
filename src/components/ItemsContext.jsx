// ItemsContext.js
import React, { createContext, useState, useContext } from 'react';

const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    return (
        <ItemsContext.Provider value={{ items, setItems }}>
            {children}
        </ItemsContext.Provider>
    );
};

export const useItems = () => useContext(ItemsContext);
