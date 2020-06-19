import React from 'react';

import './Header.css'

import moon from '../../icons/moon.svg'
import sun from '../../icons/sun_dot.svg'
import gitLogo from '../../icons/github.svg'

export default function Header({ toggleTheme, currentMode }) {

    return (
        <div className="header">
            <div className="darkModeToggle">
                <input type="checkbox" className="darkModeInput" id="toggleButton" onChange={toggleTheme} checked={currentMode === 'DARK'} />
                <label for="toggleButton" className="darkModeLabel">
                    <img src={sun} alt="light-logo" />
                    <img src={moon} alt="dark-logo" />
                    <span class="blob"></span>
                </label>
            </div>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/manvendra22/weathercheck" className="gitLink">
                <img src={gitLogo} alt="github-logo" className="gitIcon" />
            </a>
        </div>
    );
}