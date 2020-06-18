import React from 'react';
import moment from 'moment';

import './WeatherCard.css'

import WeatherChart from './WeatherChart'
import SunChart from './SunChart'
import Loader from './Loader'

import { getWeather } from '../../utility/utility'

function WeatherCard(props) {
    const { data, selected, isLoading } = props
    const { daily = [], hourly = [] } = data
    const current = daily[selected]
    const { pressure, humidity } = current || {}

    const currentTime = moment()
    const currentHour = currentTime.format('h')
    const currentDay = currentTime.format('dddd, h:mma')

    const currentData = hourly.find(value => currentHour === moment.unix(value.dt).format('h'))
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
                            <div className="mainTime">
                                <span className="bigText boldText">{currentTemp}&deg;C</span>
                                <img src={weatherDetails.icon} alt="bigIcon" className="bigIcon" />
                            </div>
                            <div className="smallText secondaryTextColor ml-3">{currentDay}</div>
                        </div>
                        <div className="mainChart">
                            <WeatherChart data={hourly} selected={selected} />
                        </div>
                        <div className="secondaryRow">
                            <div className="infoBox">
                                <div className="boldText mb-2">Pressure</div>
                                <div>{pressure} hpa</div>
                            </div>
                            <div className="infoBox">
                                <div className="boldText mb-2">Humidity</div>
                                <div>{humidity} %</div>
                            </div>
                        </div>
                        <SunChart data={data} />
                    </>
            }
        </div>
    );
}

export default WeatherCard;
