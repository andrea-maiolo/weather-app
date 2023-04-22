function DailyDisplay(props) {
  // get days of the week
  let nameOfDay;

  const getDaysOfWeek = function (props) {
    let dateOfDay = new Date(props.dt * 1000);
    nameOfDay = dateOfDay.getDay();

    switch (nameOfDay) {
      case 0:
        nameOfDay = "Sun";
        break;
      case 1:
        nameOfDay = "Mon";
        break;
      case 2:
        nameOfDay = "Tue";
        break;
      case 3:
        nameOfDay = "Wed";
        break;
      case 4:
        nameOfDay = "Thu";
        break;
      case 5:
        nameOfDay = "Fri";
        break;
      case 6:
        nameOfDay = "Sat";
        break;
    }
    return nameOfDay;
  };
  getDaysOfWeek(props);
  return (
    <div className="weeklyWeather">
      <p id="nameOfDay">{nameOfDay}</p>
      <p id="temperatureOfDay">{Math.floor(props.temp - 273.15)}°C</p>
      <img
        id="iconOfDay"
        src={`http://openweathermap.org/img/w/${props.icon}.png`}
      />
    </div>
  );
}

export default DailyDisplay;
