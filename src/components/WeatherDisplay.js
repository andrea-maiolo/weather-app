import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import fromUnixTime from "date-fns/fromUnixTime";
import Daily from "./Daily";
import Hourly from "./Hourly";

const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyDailyWeather, setHourlyDailyWeather] = useState(null);
  const weatherK = "20f7632ffc2c022654e4093c6947b4f4";
  const [location, setLocation] = useState("Bologna,IT");
  const [timeZone, setTimeZone] = useState("");
  const [unixTimestamp, setUnixTimeStamp] = useState("");
  const [myDate, setMyDate] = useState("");
  const [isInputCorrect, setIsInputCorrect] = useState(true);

  const fetchWeatherData = async (where) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${where}&APPID=${weatherK}&units=metric`,
      { mode: "cors" }
    );
    const data = await response.json();
    setWeatherData(data);
    setTimeZone(data.timezone);
    setUnixTimeStamp(data.dt);
    const secondeResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude={alerts}&appid=${weatherK}`
    );

    const secondData = await secondeResponse.json();
    setHourlyDailyWeather(secondData);
  };

  useEffect(() => {
    fetchWeatherData(location);
  }, [weatherK]);

  const handleLocationChange = (event) => {
    let valueToCheck = event.target.value;
    valueToCheck =
      valueToCheck.charAt(0).toUpperCase() +
      valueToCheck.slice(1).toLowerCase();

    //check if non letter char are been typed
    console.log(valueToCheck);
    let res = /[0-9]/.test(valueToCheck);
    let res2 = /[\/`¬!"£$%^&*()_+=\-\/|\\<>\~}{@:{\[\];'#.\/]/g.test(
      valueToCheck
    );
    console.log(res);
    console.log(res2, "res2");
    console.log(isInputCorrect);
    //remove spaces
    let stringWithNoSpaces = valueToCheck.replace(/\s+/g, "");

    if (res || res2) {
      return setIsInputCorrect(false);
    } else {
      setIsInputCorrect(true);
    }

    setLocation(stringWithNoSpaces);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData(location);
  };

  const settingClockToTime = function (timeZone, unixTimestamp) {
    let timeOfZone = fromUnixTime(unixTimestamp + timeZone).toUTCString();
    setMyDate(timeOfZone);
  };

  useEffect(() => {
    settingClockToTime(timeZone, unixTimestamp);
  }, [weatherData]);

  if (!weatherData || !hourlyDailyWeather) {
    return (
      <div id="loadingPage">
        Loading, please wait
        <ReactLoading type="balls" color="#143549" height={100} width={150} />
      </div>
    );
  }

  const { name, main, weather } = weatherData;
  const { daily, hourly } = hourlyDailyWeather;
  const dailyArrayWithId = daily.map((obj, index) => ({ ...obj, id: index }));
  dailyArrayWithId.shift();

  const dailyDom = dailyArrayWithId.map((day) => {
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
          for enter ",COUNTRY" ex. `Rome,IT`
        </p>
      </form>

      <div>
        {isInputCorrect ? (
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
            {/* <p>{dailyDom}</p> */}
            {/* <p>{hourlyDom}</p> */}
          </div>
        ) : (
          <div>
            <h2>
              Input is incorrect, check if it contains numbers or special
              characters
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDisplay;
