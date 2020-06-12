import React from 'react';

import Loader from './Loader'

import './SearchBar.css';

import pin from '../icons/pin.svg'
import search from '../icons/search.svg'

import { getWeather } from '../utility/utility'

function SearchBar(props) {
    const { value, setValue, cityData, handleCityClick, setCurrentLocation, isLoading } = props

    return (
        <div className="search">
            <div className="searchContainer">
                <img src={pin} alt="dayIcon" className="inputIcon" onClick={setCurrentLocation} />
                <input type="text" className="searchbar" value={value} onChange={e => setValue(e.target.value)} />
                <img src={search} alt="dayIcon" className="inputIcon" />
            </div>
            <div className="cityContainer">
                {isLoading ?
                    <Loader /> :
                    cityData.map((data, index) =>
                        <div className="cityData" onClick={() => handleCityClick(index)} key={data.id}>
                            <div className="">{`${data.name}, ${data.sys.country}`}</div>
                            <div className="cityWeather">
                                <div className="mr-10">
                                    <div className="boldText">{Math.round(data.main.temp)}&deg; C</div>
                                    <div className="smallText grayText">{getWeather(data.weather[0].id).label}</div>
                                </div>
                                <img src={getWeather(data.weather[0].id).icon} alt="dayIcon" className="smallIcon" />
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}

export default SearchBar;
