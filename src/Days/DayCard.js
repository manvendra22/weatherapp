import React from 'react';
import moment from 'moment';

import './Days.css';

import { getIcon } from '../utility'

function DayCard(props) {
    const { data, active, onClick } = props
    const { dt, temp, weather } = data
    const { max, min } = temp
    const { id, main } = weather[0]

    const day = moment.unix(dt).format('ddd');

    return (
        <div className={`dayCard ${active ? 'dayActive' : ''}`} onClick={onClick}>
            <div className="mb-3">{day}</div>
            <div className="mb-5"><span>{Math.round(max)}&deg;</span> <span className="grayText">{Math.round(min)}&deg;</span></div>
            <div className="mb-5">
                <img src={getIcon(id)} alt="dayIcon" className="smallIcon" />
            </div>
            <div className="smallText grayText">{main}</div>
        </div>
    );
}

export default DayCard;