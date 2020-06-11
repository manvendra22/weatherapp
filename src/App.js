import React from 'react';
import './App.css';

import SearchBar from './SearchBar/SearchBar'
import DayCard from './DayCard/DayCard'
import WeatherCard from './WeatherCard/WeatherCard'

function App() {
  return (
    <div className="app">
      <SearchBar />
      <div className="days">
        <DayCard />
        <DayCard />
        <DayCard />
        <DayCard />
        <DayCard />
        <DayCard />
        <DayCard />
      </div>
      <WeatherCard />
    </div>
  );
}

export default App;
