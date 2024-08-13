import React, { useState } from "react";
import WeatherInformation from "./WeatherInformation";
import axios from "axios";
import "./Weather.css";
import WeatherForecast from "./WeatherForecast";


export default function Weather(props) {
  const [currentWeather, setCurrentWeather] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  function handleResponse(response) {
    setCurrentWeather({
      ready: true,
      coordinates: response.data.coord,
      temp: response.data.main.temp,
      humid: response.data.main.humidity,
      icon: response.data.weather[0].icon,
      wind: response.data.wind.speed,
      city: response.data.name,
      date: new Date(response.data.dt * 1000),
      description: response.data.weather[0].description,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    collectData();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function collectData() {
    const apiKey = "9eca7aac0b071aa16e3cb063adba0785";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  if (currentWeather.ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Search for a city..."
                className="form-control"
                autoFocus="on"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Locate"
                className="btn btn-light"
              />
            </div>
          </div>
        </form>
        <WeatherInformation data={currentWeather} />
        <WeatherForecast coordinates={currentWeather.coordinates} />
      </div>
    );
  } else {
    collectData();
    return "One moment please...";
  }
}
