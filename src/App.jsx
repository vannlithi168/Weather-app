// App.js
import { useState, useEffect } from "react";
import axios from "axios";
import WeatherSearch from "./components/Search/Search";
import WeatherForecast from "./components/ForecastWeather/ForecastWeather";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import CityData from "./data/city_data.json";
import "./App.css";
import { API_KEY, API_URL } from "./api/api";
import "font-awesome/css/font-awesome.min.css";

const App = () => {
  const [currentCity, setCurrentCity] = useState("Phnom Penh");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeatherData = async (city) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
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

  const handleCityChange = (city) => {
    setCurrentCity(city);
    fetchWeatherData(city);
  };

  useEffect(() => {
    fetchWeatherData(currentCity);
  }, [currentCity]);

  return (
    <div>
      <WeatherSearch
        onCityChange={handleCityChange}
        placeholder="Enter city name"
        data={CityData}
        fetchWeatherData={fetchWeatherData}
        setCurrentCity={setCurrentCity}
      />
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <CurrentWeather city={currentCity} />
          <WeatherForecast weatherData={weatherData} />
        </>
      )}
    </div>
  );
};

export default App;
