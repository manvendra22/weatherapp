import React from 'react';

import moon from '../icons/moon.svg'
import sun from '../icons/sun_dot.svg'
import gitLogo from '../icons/github.svg'

export default function Header({ toggleTheme, currentMode }) {
    return (
        <>
            <div className="toggleIcon">
                <img src={currentMode === 'light' ? moon : sun} className="toggleIcon" alt="toggle-logo" onClick={toggleTheme} />
            </div>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/manvendra22/weathercheck" className="gitLink">
                <img src={gitLogo} alt="github-logo" className="gitIcon" />
            </a>
        </>
    );
}