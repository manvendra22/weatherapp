import React from 'react';
import './DayCard.css';

import sun from './icons/sun.svg'

function DayCard() {
    return (
        <div className="dayCard">
            <div className="mb-2">Fri</div>
            <div className="mb-4"><span>28&deg;</span> <span className="grayText">19&deg;</span></div>
            <div className="mb-4">
                <img src={sun} alt="dayIcon" className="dayIcon" />
            </div>
            <div className="smallText grayText">Sunny</div>
        </div>

    );
}

export default DayCard;