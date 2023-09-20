/* eslint-disable react/prop-types */
import "./ForcastWeather.css";
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
                <div className="card-container card" key={item.date}>
                  <div>
                    <h3>{item.day}</h3>
                  </div>
                  <img
                    alt="weather"
                    src={`icons/${item.icon}.svg`}
                    className="icon-forecast"
                  />

                  <div>
                    <p>{item.description}</p>
                    <p className="temp">{item.temperature}°C</p>
                  </div>
                </div>
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
