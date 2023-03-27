import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import fromUnixTime from "date-fns/fromUnixTime";

const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyDailyWeather, setHourlyDailyWeather] = useState(null);
  const weatherK = "20f7632ffc2c022654e4093c6947b4f4";
  const [location, setLocation] = useState("Bologna,IT");
  const [timeZone, setTimeZone] = useState("");
  const [unixTimestamp, setUnixTimeStamp] = useState("");
  const [myDate, setMyDate] = useState("");

  const fetchWeatherData = async (where) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${where}&APPID=${weatherK}&units=metric`,
      { mode: "cors" }
    );
    const data = await response.json();
    // console.log(data);
    setWeatherData(data);
    setTimeZone(data.timezone);
    setUnixTimeStamp(data.dt);
    const secondeResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude={alerts}&appid=${weatherK}`
    );

    const secondData = await secondeResponse.json();
    // console.log(secondData);
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
    setLocation(event.target.value);
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

  // get days of the week
  let d1day, d2day, d3day, d4day, d5day, d6day, d7day;

  const getDaysOfWeek = function (daily) {
    let d1;
    d1 = new Date(daily[1].dt * 1000);
    d1day = d1.getDay();

    switch (d1day) {
      case 0:
        d1day = "Sunday";
        d2day = "Monday";
        d3day = "Tuesday";
        d4day = "Wednesday";
        d5day = "Thursday";
        d6day = "Friday";
        d7day = "Saturday";
        break;
      case 1:
        d1day = "Monday";
        d2day = "Tuesday";
        d3day = "Wednesday";
        d4day = "Thursday";
        d5day = "Friday";
        d6day = "Saturday";
        d7day = "Sunday";
        break;
      case 2:
        d1day = "Tuesday";
        d2day = "Wednesday";
        d3day = "Thursday";
        d4day = "Friday";
        d5day = "Saturday";
        d6day = "Sunday";
        d7day = "Monday";
        break;
      case 3:
        d1day = "Wednesday";
        d2day = "Thursday";
        d3day = "Friday";
        d4day = "Saturday";
        d5day = "Sunday";
        d6day = "Monday";
        d7day = "Tuesday";
        break;
      case 4:
        d1day = "Thursday";
        d2day = "Friday";
        d3day = "Saturday";
        d4day = "Sunday";
        d5day = "Monday";
        d6day = "Tuesday";
        d7day = "Wednesday";
        break;
      case 5:
        d1day = "Friday";
        d2day = "Saturday";
        d3day = "Sunday";
        d4day = "Monday";
        d5day = "Tuesday";
        d6day = "Wednesday";
        d7day = "Thursday";
        break;
      case 6:
        d1day = "Saturday";
        d2day = "Sunday";
        d3day = "Monday";
        d4day = "Tuesday";
        d5day = "Wednesday";
        d6day = "Thursday";
        d7day = "Friday";
        break;
    }
    return [d1day, d2day, d3day, d4day, d5day, d6day, d7day];
  };
  getDaysOfWeek(daily);

  //console.log(hourlyDailyWeather.hourly, "horly");

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
      <div className="nextDaysWeather">
        <p>{d1day}</p>
        <p>{Math.floor(daily[0].temp.day - 273.15)}°C</p>
        <img
          src={`http://openweathermap.org/img/w/${daily[0].weather[0].icon}.png`}
        />
      </div>
    </div>
  );
};

export default WeatherDisplay;
