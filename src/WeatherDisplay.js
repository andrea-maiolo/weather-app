import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import fromUnixTime from "date-fns/fromUnixTime";
import format from "date-fns/format";

const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState(null);
  const weatherK = "20f7632ffc2c022654e4093c6947b4f4";
  const [location, setLocation] = useState("Bologna,IT");

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherK}&units=metric`,
        { mode: "cors" }
      );
      const data = await response.json();
      // console.log(data);
      setWeatherData(data);
      const secondeResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude={alerts}&appid=${weatherK}`
      );

      const secondData = await secondeResponse.json();
      console.log(secondData);
      setHourlyWeather(secondData);
    };
    fetchWeatherData();
  }, [weatherK]);

  const handleLocationChange = (event) => {
    let valueToCheck = event.target.value;
    console.log(valueToCheck);
    //  pattern="^[a-zA-Z]+(,[A-Z]{2})?"
    setLocation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // fetchWeatherData();
  };

  if (!weatherData || !hourlyWeather) {
    return (
      <div id="loadingPage">
        Loading, please wait
        <ReactLoading type="balls" color="#143549" height={100} width={150} />
      </div>
    );
  }

  const { name, main, weather } = weatherData;
  const { daily, hourly } = hourlyWeather;
  // console.log(hourlyWeather.daily[0].humidity);

  // const dateAtLocation = new Date(weatherData.dt * 1000 + weatherData.timezone);
  let dateAtLocation = fromUnixTime(weatherData.dt);
  dateAtLocation = format(dateAtLocation, "PPPP k:mm");

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Location:
          <input
            type="text"
            value={location}
            required
            minLength="3"
            maxLength="15"
            onChange={handleLocationChange}
          ></input>
        </label>
        <button type="submit">
          Search
          <img
            alt="search icon"
            width={15}
            height={15}
            src="https://www.pinclipart.com/picdir/middle/395-3952831_search-search-icon-vector-png-clipart.png"
          />
        </button>
      </form>
      <h2>{name}</h2>
      <p>{weather[0].main}</p>
      <p>{weather[0].description}</p>
      <p>Temperature: {main.temp}°C</p>
      <p>Feels like: {main.feels_like}°C</p>
      <p>Humidity:{main.humidity}%</p>
      <img
        src={`http://openweathermap.org/img/w/${weather[0].icon}.png`}
        alt={weather[0].description}
      />
      <p>Precipitations: {Math.floor(daily[0].pop * 100)}%</p>

      <h1>{dateAtLocation}</h1>
    </div>
  );
};

export default WeatherDisplay;
