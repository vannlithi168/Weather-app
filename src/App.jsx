import { useState, useEffect } from "react";
import WeatherSearch from "./components/Search/Search";
import WeatherForecast from "./components/ForecastWeather/ForecastWeather";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";

import "./App.css";
import axios from "axios";
import { API_KEY, API_URL } from "./api/api";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [currentCity, setCurrentCity] = useState("Phnom Penh");
  const [loading, setLoading] = useState(true);

  const handleWeatherDataUpdate = (data) => {
    setWeatherData(data);
  };

  const handleCityChange = (city) => {
    setCurrentCity(city);
  };

  useEffect(() => {
    const fetchDefaultLocationWeather = async () => {
      try {
        const response = await axios.get(
          `${API_URL}?q=${currentCity}&appid=${API_KEY}&units=metric`
        );

        if (response.status === 200) {
          setWeatherData(response.data);
          setLoading(false);
        } else {
          setWeatherData(null);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setWeatherData(null);
        setLoading(false);
      }
    };

    fetchDefaultLocationWeather();
  }, [currentCity]);

  return (
    <div>
      <WeatherSearch
        onWeatherDataUpdate={handleWeatherDataUpdate}
        onCityChange={handleCityChange}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <CurrentWeather city={currentCity} />

          <WeatherForecast
            weatherData={weatherData}
            handleWeatherDataUpdate={handleWeatherDataUpdate}
          />
        </>
      )}
    </div>
  );
};

export default App;
