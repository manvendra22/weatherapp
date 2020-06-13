import React from 'react';
import moment from 'moment';

import './WeatherCard.css'
import LineChart from './LineChart'
import AreaChart from './AreaChart'
import Loader from './Loader'

import { getWeather } from '../utility/utility'

function WeatherCard(props) {
    const { data, selected, isLoading } = props
    const { daily = [], hourly = [], lat, lon } = data
    const current = daily[selected]
    const { pressure, humidity, sunrise, sunset } = current || {}

    const sunriseTime = moment.unix(sunrise).format('h:mma')
    const sunsetTime = moment.unix(sunset).format('h:mma')

    const currentTime = moment().format('h')
    const currentData = hourly.find(value => currentTime === moment.unix(value.dt).format('h'))
    const currentTemp = Math.round(currentData?.temp)

    const weatherDetails = getWeather(currentData?.weather?.[0]?.id)

    return (
        <div className="weatherCard">
            {
                isLoading ?
                    <Loader />
                    :
                    <>
                        <div className="mainRow">
                            <span className="bigText">{currentTemp}&deg;C</span>
                            <img src={weatherDetails.icon} alt="bigIcon" className="bigIcon" />
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
                            <AreaChart lat={lat} lon={lon} selected={selected} sunrise={sunrise} sunset={sunset} />
                        </div>
                    </>
            }
        </div>
    );
}

export default WeatherCard;
