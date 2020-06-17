import React, { useState, useEffect, useRef, useCallback } from 'react';
import _ from "lodash";

import './App.css';

import Days from './Days/Days'
import SearchBar from './SearchBar/SearchBar'
import WeatherCard from './WeatherCard/WeatherCard'

function App() {
  const [weatherData, setWeatherData] = useState({})
  const [cityData, setCityData] = useState([])
  const [cityWeatherData, setCityWeatherData] = useState([])
  const [ipData, setIpData] = useState({})

  const [city, setCity] = useState('')
  const [selected, setSelected] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isCityLoading, setIsCityLoading] = useState(false)

  const isInputEmpty = useRef(true)

  useEffect(function () {
    getLocation()
  }, [])

  const delayedQuery = useCallback(_.debounce(value => fetchCityAutocompleteData(value), 1000), []);

  function setCityValue(value) {
    setCity(value)

    if (value.length) {
      setIsCityLoading(true)
      isInputEmpty.current = false
      delayedQuery(value)
    } else {
      setCityData([])
      isInputEmpty.current = true
    }
  }

  function handleCityClick(index) {
    fetchLocationData(cityData[index]?.coord?.lat, cityData[index]?.coord?.lon)
    setCity(`${cityData[index]?.name}, ${cityData[index]?.sys?.country}`)
    setCityData([])
    setSelected(0)
  }

  function handleCityData(cityData) {
    setCityData(cityData)
  }

  function getLocation() {
    if ("geolocation" in navigator) {
      // check if geolocation is supported/enabled on current browser
      navigator.geolocation.getCurrentPosition(
        function (position) {
          fetchLocationData(position.coords.latitude, position.coords.longitude)
          fetchCityNameFromLoc(position.coords.latitude, position.coords.longitude)
        },
        function (error) {
          ipLookUp(true)
          console.error('An error has occured while retrieving location', error)
        },
        { timeout: 1000 }
      )
    } else {
      // geolocation is not supported, using ipLookUp to get location by passing flag true
      ipLookUp(true)
    }
  }

  async function fetchLocationData(latitude, longitude) {
    setIsLoading(true)
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?exclude=minutely,current&units=metric&lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`)
    const data = await response.json()

    setWeatherData(data)
    setIsLoading(false)
  }

  async function fetchCityAutocompleteData(q) {
    const url = `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=${process.env.REACT_APP_HERE_MAP_KEY}&query=${q}&beginHighlight=<b>&endHighlight=</b>&maxresults=4&country=IND&resultType=city`
    const response = await fetch(url);
    const data = await response.json();

    if (!isInputEmpty.current) {
      handleCityData(data.suggestions)
      fetchCityWeather(data.suggestions)
    }
    setIsCityLoading(false)
  }

  async function fetchCityWeather(cityData) {
    let cityWeatherData = []
    for (let i = 0; i < cityData.length; i++) {
      const postalCode = cityData[i].address.postalCode
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${postalCode},in&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
      const data = await response.json()
      cityWeatherData[i] = data
    }
    setCityWeatherData(cityWeatherData)
  }

  async function fetchCityNameFromLoc(lat, lon) {
    const response = await fetch(`https://geocode.xyz/${lat},${lon}?json=1`);
    const data = await response.json();
    setCity(`${data.city}, ${data.prov}`)
  }

  async function ipLookUp() {
    let ip = {}

    if (Object.keys(ipData).length === 0) {
      const response = await fetch('https://ipapi.co/json');
      const data = await response.json();
      ip = data
      setIpData(data)
    } else {
      ip = ipData
    }
    fetchLocationData(ip.latitude, ip.latitude)
    setCity(`${ip.city}, ${ip.country_code}`)
  }

  return (
    <div className="app">
      <SearchBar value={city} setValue={setCityValue} cityData={cityData} cityWeatherData={cityWeatherData} handleCityClick={handleCityClick} setCurrentLocation={getLocation} isLoading={isCityLoading} />
      <Days data={weatherData.daily} selected={selected} setSelected={setSelected} isLoading={isLoading} />
      <WeatherCard data={weatherData} selected={selected} isLoading={isLoading} />
    </div>
  );
}

export default App;
