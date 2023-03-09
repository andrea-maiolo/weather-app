import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import Clock from "react-live-clock";

const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState(null);
  const weatherK = "20f7632ffc2c022654e4093c6947b4f4";
  const [location, setLocation] = useState("Bologna");

  const fetchWeatherData = async (where) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${where}&APPID=${weatherK}&units=metric`,
      { mode: "cors" }
    );
    const data = await response.json();
    // console.log(data);
    setWeatherData(data);
    const secondeResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude={alerts}&appid=${weatherK}`
    );

    const secondData = await secondeResponse.json();
    // console.log(secondData);
    setHourlyWeather(secondData);
  };

  useEffect(() => {
    fetchWeatherData(location);
  }, [weatherK]);

  const handleLocationChange = (event) => {
    let valueToCheck = event.target.value;
    valueToCheck =
      valueToCheck.charAt(0).toUpperCase() +
      valueToCheck.slice(1).toLowerCase();
    setLocation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData(location);
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

  console.log(weatherData.dt);
  console.log(weatherData.timezone);

  let timeStamp = weatherData.dt;
  let timeZone = weatherData.timezone;

  const timeZonesWorldWide = {
    PST: -28800,
    MST: -25200,
    CST: -21600,
    EST: -18000,
    AST: -14400,
    NST: -12600,
    GMT: 0,
    CET: 3600,
    EET: 7200,
    MSK: 10800,
    GST: 14400,
    IST: 19800,
    ICT: 25200,
    CST: 28800,
    JST: 32400,
    AEST: 36000,
    NZST: 43200,
  };

  //here is a list of conversion from timezone offset to uct
  //   Pacific Standard Time (PST): -28800
  // Mountain Standard Time (MST): -25200
  // Central Standard Time (CST): -21600
  // Eastern Standard Time (EST): -18000
  // Atlantic Standard Time (AST): -14400
  // Newfoundland Standard Time (NST): -12600
  // Greenwich Mean Time (GMT): 0
  // Central European Time (CET): 3600
  // Eastern European Time (EET): 7200
  // Moscow Standard Time (MSK): 10800
  // Gulf Standard Time (GST): 14400
  // Indian Standard Time (IST): 19800
  // Indochina Time (ICT): 25200
  // China Standard Time (CST): 28800
  // Japan Standard Time (JST): 32400
  // Australian Eastern Standard Time (AEST): 36000
  // New Zealand Standard Time (NZST): 43200

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
        <p>
          for a more precise location or if you don't find what you're looking
          for enter ",COUNTRY" ex. `Rome,it`
        </p>
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

      {/* <h1>{dateAtLocation}</h1> */}
      <Clock format={"HH:mm:ss"} ticking={true} timezone={"EST"} />
    </div>
  );
};

export default WeatherDisplay;
