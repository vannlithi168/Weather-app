/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY, API_URL } from "../../api/api";
import "./Search.css";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import CloseIcon from "@mui/icons-material/Close";

const WeatherSearch = ({
  onWeatherDataUpdate,
  onCityChange,
  data,
  placeholder,
  setCurrentCity,
  fetchWeatherData,
}) => {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [showNoData, setShowNoData] = useState(false); // State to control "No data found" visibility

  const handleCityChange = (city) => {
    // Clear the input field
    setCity("");

    // Reset the filtered data
    setFilteredData([]);
    setWordEntered("");

    // Update the current city and fetch weather data
    setCurrentCity(city);
    fetchWeatherData(city);
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
      setShowNoData(false); // Hide "No data found" when the input is empty
    } else {
      setFilteredData(newFilter);

      // Show "No data found" if no matching results
      setShowNoData(newFilter.length === 0);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
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

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter" && filteredData.length > 0) {
        // Automatically select the first result when Enter is pressed
        handleCityChange(filteredData[0].name);
        clearInput();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [filteredData, handleCityChange]);

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          onClick={() => setError("")}
          onChange={handleFilter}
          value={wordEntered}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SavedSearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      <div className={`dataResult ${showNoData ? "noDataVisible" : ""}`}>
        {filteredData.length === 0 && !error && (
          <div className="noDataMessage">No data found.</div>
        )}
        {filteredData.slice(0, 4).map((value, key) => {
          return (
            <ul className="dataItem" key={value.id}>
              <li onClick={() => handleCityChange(value.name)}>
                {value.name}, {value.country_name}
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherSearch;
