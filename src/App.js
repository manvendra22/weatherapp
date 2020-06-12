import React, { useState, useEffect, useCallback } from 'react';
import _ from "lodash";

import './App.css';

import Days from './Days/Days'
import SearchBar from './SearchBar/SearchBar'
import WeatherCard from './WeatherCard/WeatherCard'

import cityJsonData from './utility/city.list.json'

function App() {
  const [weatherData, setWeatherData] = useState({})
  const [cityData, setCityData] = useState([])
  const [ipData, setIpData] = useState({})
  const [citiesIDData, setCitiesIdData] = useState([])

  const [city, setCity] = useState('')
  const [selected, setSelected] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isCityLoading, setIsCityLoading] = useState(false)

  useEffect(function () {
    getLocation()
    getCitiesJSON()
  }, [])

  function getCitiesJSON() {
    const indiaData = cityJsonData.filter(data => data.country === 'IN')
    const requiredIndiaData = indiaData.map(data => {
      return {
        id: data.id,
        name: data.name.toLowerCase()
      }
    })
    setCitiesIdData(requiredIndiaData)
  }

  const delayedQuery = useCallback(_.debounce((ids, name) => fetchCityData(ids, name), 1000), []);

  function setCityValue(value) {
    setCity(value)

    if (value.length) {
      setIsCityLoading(true)
      const filterIds = citiesIDData.filter(data => data.name.includes(value.toLowerCase()))
      const fistFiveIds = filterIds.slice(0, 5)
      const requiredData = fistFiveIds.map(data => {
        return data.id
      })
      const filterString = requiredData.join(',')

      delayedQuery(filterString, value)
    } else {
      setCityData([])
    }
  }

  function handleCityClick(index) {
    fetchLocationData(cityData[index]?.coord?.lat, cityData[index]?.coord?.lon)
    setCity(`${cityData[index]?.name}, ${cityData[index]?.sys?.country}`)
    setCityData([])
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
    setIsLoading(true)
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?exclude=minutely,current&units=metric&lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`)
    const data = await response.json()

    setWeatherData(data)
    // setIsLoading(false)
  }

  async function fetchCityData(cityIds, cityName) {
    let query = `group?id=${cityIds}`
    if (!cityIds.length) {
      query = `weather?q=${cityName}`
    }

    const response = await fetch(`https://api.openweathermap.org/data/2.5/${query}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
    const data = await response.json()

    let finalData = []

    if (data?.list) {
      finalData = data?.list
    } else if (data?.cod === 200) {
      finalData.push(data)
    }

    setCityData(finalData)
    setIsCityLoading(false)
  }

  return (
    <div className="app">
      <SearchBar value={city} setValue={setCityValue} cityData={cityData} handleCityClick={handleCityClick} setCurrentLocation={setCurrentLocation} isLoading={isCityLoading} />
      <Days data={weatherData.daily} selected={selected} setSelected={setSelected} isLoading={isLoading} />
      <WeatherCard data={weatherData} selected={selected} isLoading={isLoading} />
    </div>
  );
}

export default App;
