/* eslint-disable react/prop-types */
import "./WeatherCard.css";

const WeatherCard = ({ day, icon, description, temperature }) => {
  return (
    <div className="card-container card">
      <div>
        <h3>{day}</h3>
      </div>
      <img alt="weather" src={`icons/${icon}.svg`} className="icon-forecast" />
      <div>
        <p>{description}</p>
        <p className="temp">{temperature}°C</p>
      </div>
    </div>
  );
};

export default WeatherCard;
