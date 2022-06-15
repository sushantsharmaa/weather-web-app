import "./details.css";

const WeatherCard = ({ currentCityWeather }) => {
  console.log(currentCityWeather);
  let clear = "./images/clear.png";
  let clouds = "./images/clouds.png";
  let rain = "./images/rain.png";
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
      </div>
      <div></div>
    </div>
  );
};

export default WeatherCard;
