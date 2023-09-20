/* eslint-disable react/prop-types */
import "./CurrentWeather.css";
import { useState, useEffect } from "react";
import {
  CURRENT_WEATHER_API_KEY,
  CURRENT_WEATHER_API_URL,
} from "../../api/api";
import axios from "axios";

function CurrentWeather({ city }) {
  const [currentWeather, setCurrentWeather] = useState(null);

  function convertTime(unixTimestamp) {
    const sunsetDate = new Date(unixTimestamp * 1000);
    const hours = sunsetDate.getHours() % 12 || 12;
    const minutes = sunsetDate.getMinutes();

    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}pm`;
  }

  function convertDate(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  }

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      try {
        const response = await axios.get(
          `${CURRENT_WEATHER_API_URL}?q=${city}&appid=${CURRENT_WEATHER_API_KEY}&units=metric`
        );

        if (response.status === 200) {
          setCurrentWeather(response.data);
        } else {
          setCurrentWeather(null);
        }
      } catch (error) {
        console.error("Error fetching current weather data:", error);
        setCurrentWeather(null);
      }
    };

    fetchCurrentWeather();
  }, [city]);
  return (
    <div>
      {currentWeather ? (
        <>
          <p className="city-name">{currentWeather.name}, {currentWeather.sys.country}</p>
          <p className="description">{currentWeather.weather[0].description}</p>
          <div className="current-weather">
            <img
              alt="weather"
              src={`icons/${currentWeather.weather[0].icon}.svg`}
              className="icon"
            />

            <p className="temperature">
              {Math.round(currentWeather.main.temp)}°
            </p>
          </div>
        </>
      ) : (
        <p>No current weather data available</p>
      )}
      {currentWeather && (
        <div>
          <div className="today">
            <p>Feels Like {Math.round(currentWeather.main.feels_like)}°</p>
            <p>Today {convertDate(currentWeather.dt)}</p>
          </div>

          <div className="detail">
            <div className="info">
              <div className="info-item">
                <img src="/icons/sunset.svg" />
                <p className="info-label">
                  Sunset
                  <br />
                  {convertTime(currentWeather.sys.sunset)}
                </p>
              </div>
            </div>

            <div className="info">
              <div className="info-item">
                <img src="/icons/humidity.svg" />
                <p className="info-label">
                  Humidity
                  <br />
                  {currentWeather.main.humidity} %
                </p>
              </div>
            </div>

            <div className="info">
              <div className="info-item">
                <img src="/icons/pressure.svg" />
                <p className="info-label">
                  Pressure
                  <br />
                  {currentWeather.main.pressure} hpa
                </p>
              </div>
            </div>

            <div className="info">
              <div className="info-item">
                <img src="/icons/wind.svg" />
                <p className="info-label">
                  Wind
                  <br />
                  {currentWeather.wind.speed} m/s
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrentWeather;
