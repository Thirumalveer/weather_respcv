import React, { useState } from 'react';

import axios from 'axios';

function    Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // API Key from OpenWeatherMap
  const apiKey = 'YOUR_API_KEY';  // Replace with your OpenWeatherMap API key

  // Function to fetch weather data
  const fetchWeather = async () => {
    if (!city) {
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      console.log(response)
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setWeather(null);
      setError('City not found or invalid!');
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {error && <p>{error}</p>}

      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
