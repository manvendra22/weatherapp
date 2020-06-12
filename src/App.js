import React, { useState, useEffect, useCallback } from 'react';
import _ from "lodash";

import './App.css';

import Days from './Days/Days'
import SearchBar from './SearchBar/SearchBar'
import WeatherCard from './WeatherCard/WeatherCard'

function App() {
  const [data, setData] = useState({})
  const [cityData, setCityData] = useState({})
  const [ipData, setIpData] = useState({})

  const [city, setCity] = useState('')
  const [selected, setSelected] = useState(0)
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
    setCity(`${cityData?.name}, ${cityData?.sys?.country}`)
    setCityData({})
  }

  function setCurrentLocation() {
    getLocation()
  }

  function getLocation() {
    ipLookUp(false)
    if ("geolocation" in navigator) {
      // check if geolocation is supported/enabled on current browser
      navigator.geolocation.getCurrentPosition(
        function (position) {
          fetchLocationData(position.coords.latitude, position.coords.longitude)
        },
        function (error) {
          ipLookUp(true)
          console.error('An error has occured while retrieving location', error)
        },
        { timeout: 2000 }
      )
    } else {
      // geolocation is not supported, using ipLookUp to get location by passing flag true
      ipLookUp(true)
    }
  }

  async function ipLookUp(flag) {
    let ip = {}

    if (Object.keys(ipData).length === 0) {
      const response = await fetch('https://ipapi.co/json');
      const data = await response.json();

      ip = data
      setIpData(data)
    } else {
      ip = ipData
    }

    if (flag) {
      fetchLocationData(ip.latitude, ip.latitude)
    } else {
      setCity(`${ip.city}, ${ip.country_code}`)
    }
  }

  async function fetchLocationData(latitude, longitude) {
    setisLoading(true)
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?exclude=minutely,current&units=metric&lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`)
    const data = await response.json()

    setData(data)
    setisLoading(false)
  }

  async function fetchCityData(cityName) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
    const data = await response.json()

    setCityData(data)
  }

  return (
    <div className="app">
      <SearchBar value={city} setValue={setCityValue} cityData={cityData} handleCityClick={handleCityClick} setCurrentLocation={setCurrentLocation} />
      <Days data={data.daily} selected={selected} setSelected={setSelected} isLoading={isLoading} />
      <WeatherCard data={data} selected={selected} isLoading={isLoading} />
    </div>
  );
}

export default App;
