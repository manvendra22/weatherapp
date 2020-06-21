import React from 'react';

import './Header.css'

import stars from '../../icons/stars.svg'
import clouds from '../../icons/clouds.svg'
import gitLogo from '../../icons/github.svg'

export default function Header({ toggleTheme, currentMode }) {

    return (
        <div className="header">
            <div className="darkModeToggle">
                <input type="checkbox" className="darkModeInput" id="toggleButton" onChange={toggleTheme} checked={currentMode === 'DARK'} />
                <label htmlFor="toggleButton" className="darkModeLabel">
                    <img src={clouds} alt="light-logo" />
                    <img src={stars} alt="dark-logo" />
                    <span className="blob"></span>
                </label>
            </div>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/manvendra22/weathercheck" className="gitLink">
                <img src={gitLogo} alt="github-logo" className="gitIcon" />
            </a>
        </div>
    );
}