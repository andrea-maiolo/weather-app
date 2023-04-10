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
        <p>{dailyDom}</p>
        <p>{hourlyDom}</p>
      </div>
    ) : (
      <div className="errorPage">
        <h2>
          Input is incorrect, check if it contains numbers or special characters
        </h2>
      </div>
    )}
  </div>
);
