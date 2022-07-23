import "./home.css";
import axios from "axios";
import { City } from "country-state-city";
import WetherDays from "../WeatherDays/WetherDays";
import { useEffect, useState, useRef } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import useGeoLocation from "../../Hooks/useGeoLocation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Home = () => {
  const keys = ["name"];
  const myRef = useRef();
  const location = useGeoLocation();
  const [city, setCity] = useState(null);
  const [query, setQuery] = useState("");
  let currentDay = new Date().getDay() - 1;
  const [weather, setWeather] = useState([]);
  const [isTrue, setIsTrue] = useState(false);
  const cities = City.getCitiesOfCountry("IN");
  const [currentCityWeather, setCurrentCityWeather] = useState({});

  const searchCityWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9102fcb602fc2c718391570e2dab5618&units=metric`
      );
      setCurrentCityWeather(response.data);
      setIsTrue(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchCityWeather();
    }
  };

  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${location.coordinates.lat}&lon=${location.coordinates.lng}&appid=9102fcb602fc2c718391570e2dab5618&units=metric`
      );
      setWeather(response.data.list);
      setCity(response.data.city.name);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    searchCityWeather();
  }, [city]);

  useEffect(() => {
    getWeatherData();
  }, [location]);

  const search = (data) => {
    return data.filter((item) => keys.some((key) => item[key].includes(query)));
  };

  const onClick = () => {
    myRef.current.style.display = "none";
  };

  const handleFocus = () => {
    myRef.current.style.display = "block";
  };

  return (
    <div className="home">
      <div className="search">
        <LocationOnIcon className="location-icon" />
        <input
          type="text"
          className="search"
          value={query}
          onFocus={handleFocus}
          onKeyPress={handleKeyPress}
          placeholder="Search places..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchOutlinedIcon className="search-icon" />
      </div>
      {search(cities)?.length > 0 && (
        <div className="autocomplete" ref={myRef}>
          {search(cities).map((item, index) => {
            return index < 5 ? (
              <div
                key={item.name}
                onClick={() => {
                  onClick();
                  setCity(item.name);
                }}
                className="autocompleteItems"
              >
                <span>{item.name}</span>
                <div>
                  <img src="./images/clouds.png" alt={item.name} />
                </div>
              </div>
            ) : null;
          })}
        </div>
      )}
      <div className="days">
        {weather.map((day, index) => {
          if (index % 8 === 0) {
            return (
              <WetherDays key={day.dt} {...day} currentDay={++currentDay} />
            );
          }
        })}
      </div>
      {isTrue ? (
        <WeatherCard
          weather={weather}
          currentCityWeather={currentCityWeather}
        />
      ) : null}
    </div>
  );
};

export default Home;
