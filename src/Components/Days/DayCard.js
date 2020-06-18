import React from 'react';
import moment from 'moment';

import './Days.css';

import { getWeather } from '../../utility/utility'

function DayCard(props) {
    const { data, active, notClickable, onClick } = props
    const { dt, temp, weather } = data

    const weatherDetails = getWeather(weather?.[0].id)
    const day = moment.unix(dt).format('ddd');

    return (
        <div className={`dayCard ${active ? 'dayActive' : ''} ${notClickable ? 'notClickable' : ''}`} onClick={!notClickable && onClick}>
            <div className="mb-3">{day}</div>
            <div className="mb-5"><span>{Math.round(temp?.max)}&deg;</span> <span className="secondaryTextColor">{Math.round(temp?.min)}&deg;</span></div>
            <div className="mb-5">
                <img src={weatherDetails.icon} alt="dayIcon" className="smallIcon" />
            </div>
            <div className="smallText secondaryTextColor">{weatherDetails.label}</div>
        </div>
    );
}

export default DayCard;