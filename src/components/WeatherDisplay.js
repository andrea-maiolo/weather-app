import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import fromUnixTime from "date-fns/fromUnixTime";
import Daily from "./Daily";
import Hourly from "./Hourly";

const WeatherDisplay = () => {
  const weatherK = "20f7632ffc2c022654e4093c6947b4f4";
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyDailyWeather, setHourlyDailyWeather] = useState(null);
  const [location, setLocation] = useState("Bologna,IT");
  const [timezoneFromData, setTimezoneFromData] = useState("");
  const [unixtimestampFromData, setUnixtimestampFromData] = useState("");
  const [myDate, setMyDate] = useState("");
  const [error, setError] = useState(null);

  const fetchWeatherData = async (where) => {
    //check if non letter char are been typed
    if (
      /\d/g.test(where) ||
      /[\/`¬!"£$%^&*()_+=\-\/|\\<>\~}{@:{\[\];'#.\/]/g.test(where)
    ) {
      setError("City name cannot contain numbers or special characters");
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${where}&APPID=${weatherK}&units=metric`,
        { mode: "cors" }
      );
      const data = await response.json();
      //check for error 404
      if (data.cod === "404") {
        setError("city not found, please try again");
        setWeatherData(null);
      } else {
        setError(null);
        setWeatherData(data);
        setTimezoneFromData(data.timezone);
        setUnixtimestampFromData(data.dt);
      }

      const secondeResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude={alerts}&appid=${weatherK}`
      );
      const secondData = await secondeResponse.json();
      setHourlyDailyWeather(secondData);
    } catch (err) {
      setError("An error occured, please try again");
      setWeatherData(null);
    }
  };

  useEffect(() => {
    fetchWeatherData(location);
  }, [weatherK]);

  //this part set the time and date
  const settingClockToTime = function (timeZone, unixTimestamp) {
    let timeOfZone = fromUnixTime(unixTimestamp + timeZone).toUTCString();
    setMyDate(timeOfZone);
  };

  useEffect(() => {
    settingClockToTime(timezoneFromData, unixtimestampFromData);
  }, [weatherData]);

  //if there is no secondData this means that the page is still loading
  if (!hourlyDailyWeather) {
    return (
      <div id="loadingPage">
        Loading, please wait
        <ReactLoading type="balls" color="#143549" height={100} width={150} />
      </div>
    );
  }

  //this handle the user input
  const handleLocationChange = (event) => {
    let valueToCheck = event.target.value;
    valueToCheck =
      valueToCheck.charAt(0).toUpperCase() +
      valueToCheck.slice(1).toLowerCase();
    setLocation(valueToCheck);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData(location);
  };

  //check for errors
  if (error) {
    console.log(error);
    return (
      <div className="formAndAll">
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
            for enter ",COUNTRY" ex. `Rome,IT`
          </p>
        </form>
        <h1>{error}</h1>
      </div>
    );
  }

  //if no error is found deconstruct weatherData and show info
  const { name, main, weather } = weatherData;
  const { daily, hourly } = hourlyDailyWeather;
  const dailyArrayWithId = daily.map((obj, index) => ({ ...obj, id: index }));
  dailyArrayWithId.shift();

  const dailyDom = dailyArrayWithId.map((day) => {
    if (day.message) {
      return;
    }
    return (
      <Daily
        key={day.id}
        dt={day.dt}
        temp={day.temp.day}
        icon={weather[0].icon}
      />
    );
  });

  const hourlyArrayWithId = hourly.map((obj, index) => ({ ...obj, id: index }));
  hourlyArrayWithId.shift();

  const hourlyDom = hourlyArrayWithId.map((hour) => {
    if (hour.message) {
      return;
    }
    return (
      <Hourly
        key={hour.id}
        dt={hour.dt}
        temp={hour.temp}
        icon={hour.weather[0].icon}
      />
    );
  });

  return (
    <div className="main">
      <div className="formAndAll">
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
            for enter ",COUNTRY" ex. `Rome,IT`
          </p>
        </form>
      </div>
      <div className="info">
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

        <div>{myDate ? <h1>{myDate}</h1> : <p>loading time</p>}</div>
        <p>{dailyDom}</p>
        <p>{hourlyDom}</p>
      </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
