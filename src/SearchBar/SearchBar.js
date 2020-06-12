import React from 'react';
import './SearchBar.css';

import pin from '../icons/pin.svg'
import search from '../icons/search.svg'

import { getWeather } from '../utility'

function SearchBar(props) {
    const { value, setValue, cityData, handleCityClick, setCurrentLocation } = props
    const weatherDetails = getWeather(cityData?.weather?.[0]?.id)

    return (
        <div className="search">
            <div className="searchContainer">
                <img src={pin} alt="dayIcon" className="inputIcon" onClick={setCurrentLocation} />
                <input type="text" className="searchbar" value={value} onChange={e => setValue(e.target.value)} />
                <img src={search} alt="dayIcon" className="inputIcon" />
            </div>
            {cityData?.cod === 200 ?
                <div className="cityContainer">
                    <div className="cityData" onClick={handleCityClick}>
                        <div className="grayText">{`${cityData.name}, ${cityData.sys.country}`}</div>
                        <div className="cityWeather">
                            <div className="mr-10">
                                <div className="boldText">{Math.round(cityData.main.temp)}&deg; C</div>
                                <div className="smallText grayText">{weatherDetails.label}</div>
                            </div>
                            <img src={weatherDetails.icon} alt="dayIcon" className="smallIcon" />
                        </div>
                    </div>
                </div> : null}
        </div>
    );
}

export default SearchBar;
