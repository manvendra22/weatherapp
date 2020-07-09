import React from 'react';

import './WeatherDetails.css'

import Pressure from '../../icons/Pressure.js'
import Humidity from '../../icons/Humidity.js'
import Wind from '../../icons/Wind.js'
import UVprotection from '../../icons/UVprotection.js'

export default function WeatherDetails(props) {
    const { data } = props
    const { pressure, humidity, wind_speed, uvi } = data

    return (
        <div className="mb-30">
            <div className="secondaryRow mb">
                <div className="infoBox mr">
                    <div>
                        <div className="boldText mb-2">Pressure</div>
                        <div>{pressure} hpa</div>
                    </div>
                    <Pressure height="30" />
                </div>
                <div className="infoBox">
                    <div>
                        <div className="boldText mb-2">Humidity</div>
                        <div>{humidity} %</div>
                    </div>
                    <Humidity height="30" />
                </div>
            </div>
            <div className="secondaryRow">
                <div className="infoBox mr">
                    <div>
                        <div className="boldText mb-2">Wind Speed</div>
                        <div>{wind_speed} m/s</div>
                    </div>
                    <Wind height="30" />
                </div>
                <div className="infoBox">
                    <div>
                        <div className="boldText mb-2">UV Index</div>
                        <div>{uvi}</div>
                    </div>
                    <UVprotection height="30" />
                </div>
            </div>
        </div>
    )
}