import { Box } from "@mui/material";
import React from "react";
import "./weather.css";

const WetherDays = ({ main, weather, currentDay }) => {
  let clear = "./images/clear.png";
  let clouds = "./images/clouds.png";
  let rain = "./images/rain.png";

  currentDay = currentDay % 7;
  switch (currentDay) {
    case 0:
      currentDay = "Sun";
      break;
    case 1:
      currentDay = "Mon";
      break;
    case 2:
      currentDay = "Tue";
      break;
    case 3:
      currentDay = "Wed";
      break;
    case 4:
      currentDay = "Thu";
      break;
    case 5:
      currentDay = "Fri";
      break;
    case 6:
      currentDay = "Sat";
      break;
    default:
  }
  return (
    <Box className="weather-day">
      <h5>{currentDay}</h5>
      <div className="max-min">
        <h5>{main.temp_max}°</h5>
        <span>{main.temp_min}°</span>
      </div>
      <img
        src={
          weather[0].main === "Clear"
            ? clear
            : weather[0].main === "Clouds"
            ? clouds
            : rain
        }
        alt={weather[0].main}
      />
      <h5>{weather[0].main}</h5>
    </Box>
  );
};

export default WetherDays;
