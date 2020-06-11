import React, { useState, useEffect, useCallback } from 'react';
import _ from "lodash";

import './App.css';

import Days from './Days/Days'
import SearchBar from './SearchBar/SearchBar'
import WeatherCard from './WeatherCard/WeatherCard'

function App() {
  const [data, setData] = useState({})
  const [selected, setSelected] = useState(0)
  const [cityData, setCityData] = useState({})
  const [city, setCity] = useState('')
  const [isLoading, setisLoading] = useState(true)

  useEffect(function () {
    getLocation()
  }, [])

  const delayedQuery = useCallback(_.debounce(q => fetchCityData(q), 500), []);

  function setCityValue(value) {
    setCity(value)
    delayedQuery(value)
  }

  function handleCityClick() {
    fetchLocationData(cityData?.coord?.lat, cityData?.coord?.lon)
    setCityValue('')
  }

  function getLocation() {
    if ("geolocation" in navigator) {
      // check if geolocation is supported/enabled on current browser
      navigator.geolocation.getCurrentPosition(
        function success(position) {
          fetchLocationData(position.coords.latitude, position.coords.longitude)
        },
        function fail(error) {
          console.error('An error has occured while retrieving location', error)
        })
    } else {
      // geolocation is not supported, using ipLookUp to get location
      ipLookUp()
    }
  }

  function ipLookUp() {
    fetch('http://ip-api.com/json')
      .then(response => response.json())
      .then(data => {
        fetchLocationData(data.lat, data.lon)
      });
  }

  function fetchLocationData(latitude, longitude) {
    setisLoading(true)
    fetch(`https://api.openweathermap.org/data/2.5/onecall?exclude=minutely,current&units=metric&lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setData(data)
        setisLoading(false)
      });
  }

  function fetchCityData(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setCityData(data)
      });
  }

  return (
    <div className="app">
      <SearchBar value={city} setValue={setCityValue} cityData={cityData} handleCityClick={handleCityClick} />
      <Days data={data.daily} selected={selected} setSelected={setSelected} isLoading={isLoading} />
      <WeatherCard data={data} selected={selected} isLoading={isLoading} />
    </div>
  );
}

export default App;
