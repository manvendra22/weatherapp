import React from 'react';

import moon from '../icons/moon.svg'
import sun from '../icons/sun_dot.svg'

export default function Header({ toggleTheme, currentMode }) {
    return (
        <div className="toggleIcon" onClick={toggleTheme}>
            <img src={currentMode === 'light' ? moon : sun} className="bigIcon" alt="" />
        </div>
    );
}