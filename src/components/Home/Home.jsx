import "./home.css";
import { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import axios from "axios";
import WetherDays from "../WeatherDays/WetherDays";

const Home = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weather, setWeather] = useState([]);
  let currentDay = new Date().getDay() - 1;

  const setLocation = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };

  const getWeatherData = async () => {
    try {
      await window.navigator.geolocation.getCurrentPosition(setLocation);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=9102fcb602fc2c718391570e2dab5618&units=metric`
      );
      setWeather(response.data.list);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  return (
    <div className="home">
      <div className="search">
        <LocationOnIcon className="location-icon" />
        <input placeholder="       Search places..." />
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
    </div>
  );
};

export default Home;
