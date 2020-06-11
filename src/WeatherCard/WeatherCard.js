import React from 'react';
import moment from 'moment';

import './WeatherCard.css'
import LineChart from './LineChart'
import AreaChart from './AreaChart'
import Loader from './Loader'

import { getIcon } from '../utility'

function WeatherCard(props) {
    const { data, selected } = props
    const { daily = [], hourly = [] } = data
    const current = daily[selected]
    const { pressure, humidity, sunrise, sunset } = current || {}

    const sunriseTime = moment.unix(sunrise).format('h:mma')
    const sunsetTime = moment.unix(sunset).format('h:mma')

    const currentTime = moment().format('h')
    const currentData = hourly.find(value => currentTime === moment.unix(value.dt).format('h'))
    const currentTemp = Math.round(currentData?.temp)
    const id = currentData?.weather[0]?.id

    return (
        <div className="weatherCard">
            {
                Object.keys(data).length === 0 ?
                    <Loader />
                    :
                    <>
                        <div className="mainRow">
                            <span className="bigText">{currentTemp}&deg;C</span>
                            <img src={getIcon(id)} alt="bigIcon" className="bigIcon" />
                        </div>
                        <div className="mainChart">
                            <LineChart data={hourly} selected={selected} />
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
                            <AreaChart data={hourly} selected={selected} sunriseTime={sunriseTime} sunsetTime={sunsetTime} />
                        </div>
                    </>
            }
        </div>
    );
}

export default WeatherCard;
