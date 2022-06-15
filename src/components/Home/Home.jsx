import "./home.css";
import { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import axios from "axios";
import WetherDays from "../WeatherDays/WetherDays";
import WeatherCard from "../WeatherCard/WeatherCard";

const Home = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weather, setWeather] = useState([]);
  const [city, setCity] = useState("Globe");
  const [isTrue, setIsTrue] = useState(false);
  const [currentCityWeather, setCurrentCityWeather] = useState({});
  console.log(currentCityWeather);
  let currentDay = new Date().getDay() - 1;

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

  const setLocation = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };

  const getWeatherData = async () => {
    try {
      window.navigator.geolocation.getCurrentPosition(setLocation);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=9102fcb602fc2c718391570e2dab5618&units=metric`
      );
      setWeather(response.data.list);
      setCity(response.data.city.name);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWeatherData();
    searchCityWeather();
  }, []);

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
      {isTrue ? <WeatherCard currentCityWeather={currentCityWeather} /> : null}
    </div>
  );
};

export default Home;
