import React, { useState, useEffect } from 'react';

import ThemeContext from './ThemeContext';
import Header from '../Components/Header/Header'

import { lightTheme, darkTheme } from './theme'

export default function Layout({ children }) {
    const [currentMode, setCurrentMode] = useState('LIGHT');

    useEffect(() => {
        if (localStorage.getItem('mode') === 'DARK') {
            setCurrentMode('DARK');
        }
    }, []);

    useEffect(() => {
        const theme = currentMode === 'LIGHT' ? lightTheme : darkTheme;
        Object.keys(theme).forEach(key => {
            const value = theme[key];
            document.documentElement.style.setProperty(key, value);
        });
    }, [currentMode]);


    const toggleTheme = () => {
        const newMode = currentMode === 'LIGHT' ? 'DARK' : 'LIGHT';
        setCurrentMode(newMode);
        localStorage.setItem('mode', newMode);
    };

    return (
        <ThemeContext.Provider value={{ toggleTheme, currentMode }}>
            <Header
                toggleTheme={toggleTheme}
                currentMode={currentMode}
            />
            {children}
        </ThemeContext.Provider>
    );
}