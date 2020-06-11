import React, { useState, useEffect } from 'react';
import './App.css';

import Days from './Days/Days'
import SearchBar from './SearchBar/SearchBar'
import WeatherCard from './WeatherCard/WeatherCard'

function App() {
  const [data, setData] = useState({})
  const [selected, setSelected] = useState(0)

  useEffect(function () {
    getLocation()
  }, [])

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
    fetch(`https://api.openweathermap.org/data/2.5/onecall?exclude=minutely,current&units=metric&lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => response.json())
      .then(data => setData(data));
  }

  console.log({ data })

  return (
    <div className="app">
      <SearchBar />
      <Days data={data.daily} selected={selected} setSelected={setSelected} />
      <WeatherCard data={data} selected={selected} />
    </div>
  );
}

export default App;
