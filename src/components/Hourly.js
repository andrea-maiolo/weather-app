import { minutesInHour } from "date-fns";

function DisplayHourly(props) {
  //get hour
  let hourOfArray;

  const getHourFromProps = function (props) {
    let dateOfHour = new Date(props.dt * 1000);
    hourOfArray = dateOfHour.getHours().toString();
    hourOfArray = `${hourOfArray}:00`;
    return hourOfArray;
  };
  getHourFromProps(props);
  return (
    <div className="hourlyWeather">
      <p id="hour">{hourOfArray}</p>
      <p id="temperatureOfHour">{Math.floor(props.temp - 273.15)}°C</p>
      <img
        id="iconOfHour"
        src={`http://openweathermap.org/img/w/${props.icon}.png`}
      />
    </div>
  );
}

export default DisplayHourly;
