import React, { useState, useEffect } from 'react';

import Header from './Header'
import ThemeContext from './ThemeContext';

import { lightTheme, darkTheme } from './theme'

export default function Layout({ children }) {
    const [currentMode, setCurrentMode] = useState('light');

    useEffect(() => {
        if (localStorage.getItem('mode') === 'dark') {
            setCurrentMode('dark');
        }
    }, []);

    useEffect(() => {
        const theme = currentMode === 'light' ? lightTheme : darkTheme;
        Object.keys(theme).forEach(key => {
            const value = theme[key];
            document.documentElement.style.setProperty(key, value);
        });
    }, [currentMode]);


    const toggleTheme = () => {
        const newMode = currentMode === 'light' ? 'dark' : 'light';
        setCurrentMode(newMode);
        localStorage.setItem('mode', newMode);
    };

    return (
        <ThemeContext.Provider value={{ toggleTheme, currentMode }}>
            <Header
                toggleTheme={toggleTheme}
                currentMode={currentMode}
            />
            <main>{children}</main>
        </ThemeContext.Provider>
    );
}