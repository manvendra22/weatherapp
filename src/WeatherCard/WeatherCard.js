import React from 'react';

import './WeatherCard.css'
import MainChart from './MainChart'

import sun from '../icons/sun.svg'

function WeatherCard() {
    return (
        <div className="weatherCard">
            <div className="mainRow">
                <span className="bigText">26&deg;C</span>
                <img src={sun} alt="bigIcon" className="bigIcon" />
            </div>
            <div className="mainChart">
                <MainChart />
            </div>
            <div className="secondaryRow">
                <div className="blueBox">
                    <div className="boldText mb-2">Pressure</div>
                    <div className="">1013 hpa</div>
                </div>
                <div className="blueBox">
                    <div className="boldText mb-2">Humidity</div>
                    <div className="">93 %</div>
                </div>
            </div>
            <div className="subGraph"></div>
        </div>
    );
}

export default WeatherCard;
