import "./details.css";
import { useState } from "react";
import Chart from "react-apexcharts";
import LineChart from "../WeatherChart/LineChart";
import AreaChart from "../WeatherChart/AreaChart";

const WeatherCard = ({ weather, currentCityWeather }) => {
  console.log(weather);
  let clear = "./images/clear.png";
  let clouds = "./images/clouds.png";
  let rain = "./images/rain.png";

  const [userData, setUserData] = useState({
    labels: [
      "6:00 AM",
      "9:00 AM",
      "12:00 PM",
      "3:00 PM",
      "6:00 AM",
      "9:00 PM",
      "12:00 AM",
      "3:00 AM",
      "6:00 AM",
    ],
    datasets: [
      {
        label: "Temperature",
        fill: {
          target: "origin",
          above: "#C4DDFF", // Area will be red above the origin
          below: "rgb(0, 0, 255)", // And blue below the origin
        },
        data: weather.map((data) => data.main.temp),
        backgroundColor: [
          "#C499BA",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
          "#A149FA",
          "#839AA8",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  return (
    <div className="details">
      <div className="detail-one">
        <h1>{currentCityWeather.main.temp}°C</h1>
        <img
          src={
            currentCityWeather.weather[0].main === "Clear"
              ? clear
              : currentCityWeather.weather[0].main === "Clouds"
              ? clouds
              : rain
          }
          alt={currentCityWeather.weather[0].main}
        />
        <h2 className="cityName">{currentCityWeather.name}</h2>
      </div>
      <div>
        <LineChart chartData={userData} />
      </div>
      <div className="detail-three">
        <div>
          <h2>Pressure</h2>
          <span>{currentCityWeather.main.pressure} hpa</span>
        </div>
        <div>
          <h2>Humidity</h2>
          <span>{currentCityWeather.main.humidity}%</span>
        </div>
      </div>
      <div className="detail-three">
        <div>
          <h2>Sunrise</h2>
          <span>5:24 AM</span>
        </div>
        <div>
          <h2>Sunset</h2>
          <span>7:25 PM</span>
        </div>
      </div>
      <div className="detail-four">
        <AreaChart />
      </div>
    </div>
  );
};

export default WeatherCard;
