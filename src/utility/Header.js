import React from 'react';
// import DarkModeToggle from "react-dark-mode-toggle";

import './Header.css'

import moon from '../icons/moon.svg'
import sun from '../icons/sun_dot.svg'
import gitLogo from '../icons/github.svg'

export default function Header({ toggleTheme, currentMode }) {

    return (
        <div className="header">
            {/* <div className="toggleIcon"> */}
            {/* <DarkModeToggle
                    onChange={toggleTheme}
                    checked={currentMode === 'DARK'}
                    size={80}
                /> */}
            {/* </div> */}
            <img src={currentMode === 'DARK' ? moon : sun} className="toggleIcon" alt="toggle-logo" onClick={toggleTheme} />
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/manvendra22/weathercheck" className="gitLink">
                <img src={gitLogo} alt="github-logo" className="gitIcon" />
            </a>
        </div>
    );
}