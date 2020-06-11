import React from 'react';
import './SearchBar.css';

import pin from '../icons/pin.svg'
import search from '../icons/search.svg'

import { getIcon } from '../utility'

function SearchBar(props) {
    const { value, setValue, cityData, handleCityClick } = props

    return (
        <div className="search">
            <div className="searchContainer">
                <img src={pin} alt="dayIcon" className="inputIcon" />
                <input type="text" className="searchbar" value={value} onChange={e => setValue(e.target.value)} />
                <img src={search} alt="dayIcon" className="inputIcon" />
            </div>
            {Object.keys(cityData).length && cityData.cod === 200 ?
                <div className="cityData" onClick={handleCityClick}>
                    <div className="grayText">{`${cityData.name}, ${cityData.sys.country}`}</div>
                    <div className="cityWeather">
                        <div className="mr-10">
                            <div className="boldText">{Math.round(cityData.main.temp)}&deg; C</div>
                            <div className="smallText grayText">Rain</div>
                        </div>
                        <img src={getIcon(cityData.weather[0].id)} alt="dayIcon" className="smallIcon" />
                    </div>
                </div> : null}
        </div>
    );
}

export default SearchBar;
