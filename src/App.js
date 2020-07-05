import React, { useState, useEffect } from 'react';

import './App.css';
import './utility/utility.css'
import Layout from './utility/Layout'

import Days from './Components/Days/Days'
import SearchBar from './Components/SearchBar/SearchBar'
import WeatherCard from './Components/WeatherCard/WeatherCard'

import { fetchData } from './utility/utility'

function App() {
  const [city, setCity] = useState('')
  const [selected, setSelected] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [dailyWeatherData, setDailyWeatherData] = useState({})

  useEffect(function () {
    getLocation()
    // eslint-disable-next-line 
  }, [])

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

  async function fetchCityNameFromLoc(lat, lon) {
    const data = await fetchData(`https://geocode.xyz/${lat},${lon}?json=1`)
    if (data.city) {
      setCity(`${data.city}, ${data.state}, ${data.country}`)
    }
  }

  async function ipLookUp() {
    const data = await fetchData('https://ipapi.co/json')
    if (!data.error) {
      fetchLocationData(data.latitude, data.longitude)
      setCity(`${data.city}, ${data.region}, ${data.country_name}`)
    }
  }

  return (
    <Layout>
      <div className="app">
        <SearchBar city={city} setCity={setCity} fetchLocationData={fetchLocationData} setSelected={setSelected} setCurrentLocation={getLocation} />
        <Days data={dailyWeatherData.daily} selected={selected} setSelected={setSelected} isLoading={isLoading} />
        <WeatherCard data={dailyWeatherData} selected={selected} isLoading={isLoading} />
      </div>
    </Layout>
  );
}

export default App;
