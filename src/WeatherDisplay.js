import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import fromUnixTime from "date-fns/fromUnixTime";
import Daily from "./Daily";

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

  function DailyComponent(dailyArray) {
    return (
      <div>
        {dailyArray.map((day) => (
          <Daily key={dailyArray[day]} day={day} />
        ))}
      </div>
    );
  }

  let dailyArray = [];
  const getDaysOfWeek = function (daily) {
    let d1;
    d1 = new Date(daily[1].dt * 1000);
    dailyArray[0] = d1.getDay();

    switch (dailyArray[0]) {
      case 0:
        dailyArray[0] = "Sunday";
        dailyArray[1] = "Monday";
        dailyArray[2] = "Tuesday";
        dailyArray[3] = "Wednesday";
        dailyArray[4] = "Thursday";
        dailyArray[5] = "Friday";
        dailyArray[6] = "Saturday";
        break;
      case 1:
        dailyArray[0] = "Monday";
        dailyArray[1] = "Tuesday";
        dailyArray[2] = "Wednesday";
        dailyArray[3] = "Thursday";
        dailyArray[4] = "Friday";
        dailyArray[5] = "Saturday";
        dailyArray[6] = "Sunday";
        break;
      case 2:
        dailyArray[0] = "Tuesday";
        dailyArray[1] = "Wednesday";
        dailyArray[2] = "Thursday";
        dailyArray[3] = "Friday";
        dailyArray[4] = "Saturday";
        dailyArray[5] = "Sunday";
        dailyArray[6] = "Monday";
        break;
      case 3:
        dailyArray[0] = "Wednesday";
        dailyArray[1] = "Thursday";
        dailyArray[2] = "Friday";
        dailyArray[3] = "Saturday";
        dailyArray[4] = "Sunday";
        dailyArray[5] = "Monday";
        dailyArray[6] = "Tuesday";
        break;
      case 4:
        dailyArray[0] = "Thursday";
        dailyArray[1] = "Friday";
        dailyArray[2] = "Saturday";
        dailyArray[3] = "Sunday";
        dailyArray[4] = "Monday";
        dailyArray[5] = "Tuesday";
        dailyArray[6] = "Wednesday";
        break;
      case 5:
        dailyArray[0] = "Friday";
        dailyArray[1] = "Saturday";
        dailyArray[2] = "Sunday";
        dailyArray[3] = "Monday";
        dailyArray[4] = "Tuesday";
        dailyArray[5] = "Wednesday";
        dailyArray[6] = "Thursday";
        break;
      case 6:
        dailyArray[0] = "Saturday";
        dailyArray[1] = "Sunday";
        dailyArray[2] = "Monday";
        dailyArray[3] = "Tuesday";
        dailyArray[4] = "Wednesday";
        dailyArray[5] = "Thursday";
        dailyArray[6] = "Friday";
        break;
    }
    return DailyComponent(dailyArray);
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
        {/* <p>{d1day}</p> */}
        <p>{Math.floor(daily[0].temp.day - 273.15)}°C</p>
        <img
          src={`http://openweathermap.org/img/w/${daily[0].weather[0].icon}.png`}
        />
        {DailyComponent}
      </div>
    </div>
  );
};

export default WeatherDisplay;
