import React from 'react';
import moment from 'moment';

import './WeatherCard.css'
import LineChart from './LineChart'
import AreaChart from './AreaChart'

import sun from '../icons/sun.svg'

function WeatherCard(props) {
    const { data, selected } = props
    const { daily = [], hourly } = data
    const current = daily[selected]
    const { pressure, humidity, sunrise, sunset } = current || {}

    const sunriseTime = moment.unix(sunrise).format('h:mma')
    const sunsetTime = moment.unix(sunset).format('h:mma')

    return (
        <div className="weatherCard">
            <div className="mainRow">
                <span className="bigText">26&deg;C</span>
                <img src={sun} alt="bigIcon" className="bigIcon" />
            </div>
            <div className="mainChart">
                <LineChart data={hourly} />
            </div>
            <div className="secondaryRow">
                <div className="blueBox">
                    <div className="boldText mb-2">Pressure</div>
                    <div>{pressure} hpa</div>
                </div>
                <div className="blueBox">
                    <div className="boldText mb-2">Humidity</div>
                    <div>{humidity} %</div>
                </div>
            </div>
            <div className="areaChartRow">
                <div>
                    <div className="boldText mb-2">Sunrise</div>
                    <div className="grayText">{sunriseTime}</div>
                </div>
                <div>
                    <div className="boldText mb-2">Sunset</div>
                    <div className="grayText">{sunsetTime}</div>
                </div>
            </div>
            <div className="subChart">
                <AreaChart data={hourly} />
            </div>
        </div>
    );
}

export default WeatherCard;
