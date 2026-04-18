import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [activeBlueprint, setActiveBlueprint] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

    return (
        <AppContext.Provider value={{ activeBlueprint, setActiveBlueprint, isGenerating, setIsGenerating }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
