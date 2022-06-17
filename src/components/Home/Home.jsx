import "./home.css";
import axios from "axios";
import { useEffect, useState } from "react";
import WetherDays from "../WeatherDays/WetherDays";
import WeatherCard from "../WeatherCard/WeatherCard";
import useGeoLocation from "../../Hooks/useGeoLocation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Home = () => {
  const location = useGeoLocation();
  const [city, setCity] = useState(null);
  let currentDay = new Date().getDay() - 1;
  const [weather, setWeather] = useState([]);
  const [isTrue, setIsTrue] = useState(false);
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

  return (
    <div className="home">
      <div className="search">
        <LocationOnIcon className="location-icon" />
        <input
          type="text"
          onKeyPress={handleKeyPress}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search places..."
        />
        <SearchOutlinedIcon className="search-icon" />
        <div></div>
      </div>
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
