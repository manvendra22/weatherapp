import React from 'react';

import moon from '../icons/moon.svg'

export default function Header({ handleToggle }) {
    return (
        <div className="toggleIcon" onClick={handleToggle}>
            <img src={moon} className="bigIcon" alt="" />
        </div>
    );
}