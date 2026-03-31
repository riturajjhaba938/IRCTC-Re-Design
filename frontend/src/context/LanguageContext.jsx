import React, { createContext, useState, useContext } from 'react';
import translations from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    
    // Translation helper that accepts a component key and returns its dictionary
    const t = (componentKey) => {
        return translations[language]?.[componentKey] || translations['en']?.[componentKey] || {};
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
