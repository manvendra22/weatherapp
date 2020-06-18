import React from 'react';
import DarkModeToggle from "react-dark-mode-toggle";

import gitLogo from '../icons/github.svg'

export default function Header({ toggleTheme, currentMode }) {
    return (
        <>
            <div className="toggleIcon">
                <DarkModeToggle
                    onChange={toggleTheme}
                    checked={currentMode === 'DARK'}
                    size={80}
                />
            </div>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/manvendra22/weathercheck" className="gitLink">
                <img src={gitLogo} alt="github-logo" className="gitIcon" />
            </a>
        </>
    );
}