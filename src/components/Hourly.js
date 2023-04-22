import { fromUnixTime } from "date-fns";

function DisplayHourly(props) {
  //get hour

  let hourOfArray;
  const getHourFromProps = function (props) {
    let dateAndHour = fromUnixTime(props.dt + props.tz).toUTCString();
    let arrFormatting = dateAndHour.split("");
    arrFormatting.splice(0, 17);
    arrFormatting.splice(5);
    arrFormatting = arrFormatting.join("");

    hourOfArray = arrFormatting;
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
