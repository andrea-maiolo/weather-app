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
      <p>{hourOfArray}</p>
      <p>{Math.floor(props.temp - 273.15)}°C</p>
      <img src={`http://openweathermap.org/img/w/${props.icon}.png`} />
    </div>
  );
}

export default DisplayHourly;
