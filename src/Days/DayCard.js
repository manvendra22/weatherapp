import React from 'react';
import moment from 'moment';

import './Days.css';

import sun from '../icons/sun.svg'
import rain from '../icons/rain.svg'
import cloudy from '../icons/cloudy.svg'

function DayCard(props) {
    const { data, active, onClick } = props
    const { dt, temp, weather } = data
    const { max, min } = temp
    const { id, main } = weather[0]

    const day = moment.unix(dt).format('ddd');

    return (
        <div className={`dayCard ${active ? 'dayActive' : ''}`} onClick={onClick}>
            <div className="mb-2">{day}</div>
            <div className="mb-4"><span>{Math.round(max)}&deg;</span> <span className="grayText">{Math.round(min)}&deg;</span></div>
            <div className="mb-4">
                <img src={getIcon(id)} alt="dayIcon" className="smallIcon" />
            </div>
            <div className="smallText grayText">{main}</div>
        </div>
    );
}

function getIcon(id) {
    // '800': sun,
    // '50x': rain,
    // '80x': cloudy,
    // '30x': 'drizzle',
    // '20x': 'thunder'

    switch (id) {
        case 800:
            return sun;
        case 801:
        case 802:
        case 803:
        case 804:
            return cloudy;
        default:
            return rain;
    }
}

export default DayCard;