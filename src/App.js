import React, { useState, useEffect, useRef, useCallback } from 'react';
import _ from "lodash";

import './App.css';

import Days from './Components/Days/Days'
import SearchBar from './Components/SearchBar/SearchBar'
import WeatherCard from './Components/WeatherCard/WeatherCard'

import { fetchData } from './utility/utility.js'

function App() {
  const [dailyWeatherData, setDailyWeatherData] = useState({})
  const [cityWeatherData, setCityWeatherData] = useState([])
  const [ipData, setIpData] = useState({})

  const [city, setCity] = useState('')
  const [selected, setSelected] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isCityLoading, setIsCityLoading] = useState(false)

  const isInputEmpty = useRef(true)

  useEffect(function () {
    getLocation()
    // eslint-disable-next-line 
  }, [])

  const delayedQuery = useCallback(_.debounce(value => fetchCityAutocompleteData(value), 1000), []);

  function setCityValue(value) {
    setCity(value)

    if (value.length) {
      setIsCityLoading(true)
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
    setSelected(0)
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
          ipLookUp()
          console.error('An error has occured while retrieving location', error)
        },
        { timeout: 1000 }
      )
    } else {
      // geolocation is not supported, using ipLookUp to get location
      ipLookUp()
    }
  }

  async function fetchLocationData(latitude, longitude) {
    setIsLoading(true)
    const url = `https://api.openweathermap.org/data/2.5/onecall?exclude=minutely,current&units=metric&lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`
    const data = await fetchData(url)
    setDailyWeatherData(data)
    setIsLoading(false)
  }

  async function fetchCityAutocompleteData(q) {
    const url = `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=${process.env.REACT_APP_HERE_MAP_KEY}&query=${q}&maxresults=4&country=IND&resultType=city`
    const data = await fetchData(url)
    fetchCityWeather(data.suggestions)
  }

  async function fetchCityWeather(cityWeatherData = []) {
    for (let i = 0; i < cityWeatherData.length; i++) {
      const postalCode = cityWeatherData[i].address.postalCode
      const url = `https://api.openweathermap.org/data/2.5/weather?zip=${postalCode},in&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      const data = await fetchData(url)
      cityWeatherData[i].weatherData = data
    }
    if (!isInputEmpty.current) {
      setCityWeatherData(cityWeatherData)
    }
    setIsCityLoading(false)
  }

  async function fetchCityNameFromLoc(lat, lon) {
    const data = await fetchData(`https://geocode.xyz/${lat},${lon}?json=1`)
    if (data.city) {
      setCity(`${data.city}, ${data.state}, ${data.country}`)
    }
  }

  async function ipLookUp() {
    let ip = {}
    if (Object.keys(ipData).length === 0) {
      const data = await fetchData('https://ipapi.co/json')
      if (!data.error) {
        ip = data
        setIpData(data)
      }
    } else {
      ip = ipData
    }
    if (ip.latitude) {
      fetchLocationData(ip.latitude, ip.longitude)
      setCity(`${ip.city}, ${ip.region}, ${ip.country_name}`)
    }
  }

  return (
    <div className="app">
      <SearchBar value={city} setValue={setCityValue} cityWeatherData={cityWeatherData} handleCityClick={handleCityClick} setCurrentLocation={getLocation} isLoading={isCityLoading} />
      <Days data={dailyWeatherData.daily} selected={selected} setSelected={setSelected} isLoading={isLoading} />
      <WeatherCard data={dailyWeatherData} selected={selected} isLoading={isLoading} />
    </div>
  );
}

export default App;
