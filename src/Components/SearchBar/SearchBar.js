import React, { useState, useRef, useCallback } from 'react';
import _ from "lodash";

import Loader from './Loader'

import './SearchBar.css';

import Pin from '../../icons/Pin'
import Search from '../../icons/Search'

import { getWeather } from '../../utility/utility'
import { fetchData } from '../../utility/utility'

function SearchBar(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [cityWeatherData, setCityWeatherData] = useState([])

    const { city, setCity, fetchLocationData, setCurrentLocation } = props

    const isInputEmpty = useRef(true)
    const delayedQuery = useCallback(_.debounce(value => fetchCityAutocompleteData(value), 1000), []);

    function setCityValue(value) {
        setCity(value)
        if (value.length) {
            setIsLoading(true)
            isInputEmpty.current = false
            delayedQuery(value)
        } else {
            setCityWeatherData([])
            isInputEmpty.current = true
        }
    }

    function handleCityClick(index) {
        let weatherData = cityWeatherData[index]?.weatherData
        let cityName = `${cityWeatherData[index].address.city}, ${cityWeatherData[index].address.state}, ${cityWeatherData[index].address.country}`

        fetchLocationData(weatherData?.coord?.lat, weatherData?.coord?.lon)
        setCity(cityName)
        setCityWeatherData([])
    }

    async function fetchCityAutocompleteData(q) {
        const url = `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=${process.env.REACT_APP_HERE_MAP_KEY}&query=${q}&maxresults=5&country=IND&resultType=city`
        const data = await fetchData(url)
        fetchCityWeather(data.suggestions)
    }

    async function fetchCityWeather(cityWeatherData = []) {
        const URLs = []

        cityWeatherData.forEach(data => {
            const postalCode = data.address.postalCode
            const url = `https://api.openweathermap.org/data/2.5/weather?zip=${postalCode},in&units=metric&appid=${process.env.REACT_APP_API_KEY}`
            URLs.push(url)
        })

        const results = await Promise.allSettled(URLs.map(url => fetchData(url)))

        results.forEach((result, i) => {
            if (result.status === "fulfilled") {
                cityWeatherData[i].weatherData = result.value
            }
        })

        if (!isInputEmpty.current) {
            setCityWeatherData(cityWeatherData)
        }
        setIsLoading(false)
    }

    return (
        <div className="search">
            <div className="searchContainer">
                <Pin height="22px" onClick={setCurrentLocation} />
                <input type="text" className="searchbar" placeholder="Search Indian Cities" value={city} onChange={e => setCityValue(e.target.value)} />
                <Search height="22px" />
            </div>
            <div className="cityContainer">
                {isLoading ?
                    <Loader /> :
                    cityWeatherData.map((data, index) =>
                        <div className="cityData" onClick={() => handleCityClick(index)} key={data?.locationId}>
                            <div>{data?.address.city}, {data?.address.state}, {data?.address.country}</div>
                            <div className="cityWeather">
                                <div className="mr-10">
                                    <div className="boldText mb-2">{Math.round(data?.weatherData?.main.temp)}&deg; C</div>
                                    <div className="smallText secondaryTextColor">{getWeather(data?.weatherData?.weather[0].id).label}</div>
                                </div>
                                <img src={getWeather(data?.weatherData?.weather[0].id).icon} alt="dayIcon" className="smallIcon" />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default SearchBar;
