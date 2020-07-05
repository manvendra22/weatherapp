import React, { useState, useEffect } from 'react';

import ThemeContext from './ThemeContext';
import Header from '../Components/Header/Header'

import { LIGHT, DARK } from './theme'

function changeTheme(currentMode) {
    const theme = currentMode === 'LIGHT' ? LIGHT : DARK
    Object.keys(theme).forEach(key => {
        const value = theme[key];
        document.documentElement.style.setProperty(key, value)
    });
    localStorage.setItem('mode', currentMode)
}

export default function Layout({ children }) {
    const [currentMode, setCurrentMode] = useState('LIGHT')

    useEffect(() => {
        if (localStorage.getItem('mode') === 'DARK') {
            setCurrentMode('DARK');
        }
    }, [])

    useEffect(() => {
        changeTheme(currentMode)
    }, [currentMode]);

    const toggleTheme = () => {
        const newMode = currentMode === 'LIGHT' ? 'DARK' : 'LIGHT'
        setCurrentMode(newMode);
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