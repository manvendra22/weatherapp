import React from 'react';

import './WeatherCard.css'
import LineChart from './LineChart'
import AreaChart from './AreaChart'

import sun from '../icons/sun.svg'

function WeatherCard() {
    return (
        <div className="weatherCard">
            <div className="mainRow">
                <span className="bigText">26&deg;C</span>
                <img src={sun} alt="bigIcon" className="bigIcon" />
            </div>
            <div className="mainChart">
                <LineChart />
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
            <div className="areaChartRow">
                <div className="">
                    <div className="boldText mb-2">Sunrise</div>
                    <div className="grayText">7:22am</div>
                </div>
                <div className="">
                    <div className="boldText mb-2">Sunset</div>
                    <div className="grayText">6:12pm</div>
                </div>
            </div>
            <div className="subChart">
                <AreaChart />
            </div>
        </div>
    );
}

export default WeatherCard;
