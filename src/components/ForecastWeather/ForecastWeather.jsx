/* eslint-disable react/prop-types */
import "./ForcastWeather.css";
import WeatherCard from "../WeatherCard/WeatherCard";
const WeatherForecast = ({ weatherData }) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const forecast = weatherData
    ? weatherData.list
        .filter((item, index) => index % 8 === 0)
        .slice(1, 5)
        .map((item) => {
          const date = new Date(item.dt * 1000);
          const day = days[date.getDay()];
          const temperature = Math.round(item.main.temp);
          const description = item.weather[0].description;
          const icon = item.weather[0].icon;

          return { date, day, temperature, description, icon };
        })
    : [];

  return (
    <div>
      {weatherData ? (
        weatherData.cod === "200" ? (
          <>
            <div className="">
              {forecast.map((item) => (
                <WeatherCard
                  key={item.date}
                  day={item.day}
                  icon={item.icon}
                  description={item.description}
                  temperature={item.temperature}
                />
              ))}
            </div>
          </>
        ) : (
          <p>No data available</p>
        )
      ) : (
        <p>No data available...</p>
      )}
    </div>
  );
};

export default WeatherForecast;
