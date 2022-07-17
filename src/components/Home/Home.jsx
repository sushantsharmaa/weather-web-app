import "./home.css";
import axios from "axios";
import { useEffect, useCallback, useState, useRef } from "react";
import WetherDays from "../WeatherDays/WetherDays";
import WeatherCard from "../WeatherCard/WeatherCard";
import useGeoLocation from "../../Hooks/useGeoLocation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Home = () => {
  let clear = "./images/clear.png";
  let clouds = "./images/clouds.png";
  let rain = "./images/rain.png";
  const myRef = useRef();
  const location = useGeoLocation();
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState([]);
  let currentDay = new Date().getDay() - 1;
  const [weather, setWeather] = useState([]);
  const [isTrue, setIsTrue] = useState(false);
  const [currentCityWeather, setCurrentCityWeather] = useState({});

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const handleChange = async (event) => {
    const { value } = event.target;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=9102fcb602fc2c718391570e2dab5618&units=metric`
      );
      setSearch([...search, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const optimisedVersion = useCallback(debounce(handleChange), []);

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

  const clickMe = () => {
    myRef.current.style.display = "none";
  };

  return (
    <div className="home">
      <div className="search">
        <LocationOnIcon className="location-icon" />
        <input
          type="text"
          className="search"
          onKeyPress={handleKeyPress}
          onChange={optimisedVersion}
          placeholder="Search places..."
        />
        <SearchOutlinedIcon className="search-icon" />
      </div>
      {search?.length > 0 && (
        <div className="autocomplete">
          {search.map((item) => {
            return (
              <div
                ref={myRef}
                key={item.id}
                onClick={() => {
                  clickMe();
                  setCity(item.name);
                }}
                className="autocompleteItems"
              >
                <span>{item.name}</span>
                <div>
                  <span>{item.main.temp}°C</span>
                  <img
                    src={
                      item.weather[0].main === "Clear"
                        ? clear
                        : item.weather[0].main === "Clouds"
                        ? clouds
                        : rain
                    }
                    alt={item.weather[0].main}
                  />
                </div>
              </div>
            );
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
