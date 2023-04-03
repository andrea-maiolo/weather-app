function DailyDisplay(props) {
  // get days of the week
  let nameOfDay;

  const getDaysOfWeek = function (props) {
    let dateOfDay = new Date(props.dt * 1000);
    nameOfDay = dateOfDay.getDay();

    switch (nameOfDay) {
      case 0:
        nameOfDay = "Sunday";
        break;
      case 1:
        nameOfDay = "Monday";
        break;
      case 2:
        nameOfDay = "Tuesday";
        break;
      case 3:
        nameOfDay = "Wednesday";
        break;
      case 4:
        nameOfDay = "Thursday";
        break;
      case 5:
        nameOfDay = "Friday";
        break;
      case 6:
        nameOfDay = "Saturday";
        break;
    }
    return nameOfDay;
  };
  getDaysOfWeek(props);
  return (
    <div className="weeklyWeather">
      <p>{nameOfDay}</p>
      <p>{Math.floor(props.temp - 273.15)}°C</p>
      <img src={`http://openweathermap.org/img/w/${props.icon}.png`} />
    </div>
  );
}

export default DailyDisplay;
