import { useState } from "react";
import axios from "axios";
import { API_KEY, API_URL } from "../../api/api";
import "./Search.css";

const WeatherSearch = ({ onWeatherDataUpdate, onCityChange }) => {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCity("");

    const trimmedCity = city.trim();

    if (!trimmedCity) {
      setError("Please enter a city.");
      return;
    }

    try {
      const response = await axios.get(
        `${API_URL}?q=${trimmedCity}&appid=${API_KEY}&units=metric`
      );

      if (response.status === 200) {
        onWeatherDataUpdate(response.data);
        onCityChange(trimmedCity);
      } else {
        onWeatherDataUpdate(null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      onWeatherDataUpdate(null);
    }
  };

  console.log(city);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="search-container"
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter the city"
          required
        />
        <button className="btn" type="submit">
          Search
        </button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default WeatherSearch;
