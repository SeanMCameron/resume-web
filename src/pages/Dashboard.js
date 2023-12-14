import { useState, useEffect } from "react";
import sunrise from "../images/icons/sunrise.png";
import sunset from "../images/icons/sunset.png";

function Home() {
  const [longitude, setLongitude] = useState(-81.088371);
  const [latitude, setLatitude] = useState(32.076176);

  const [currWeatherString, setCurrWeatherString] = useState(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=7f8c45f89464ee582892e3cfa07c27bc&units=metric`
  );
  const [fiveDayWeatherString, setFiveDayWeatherString] = useState(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=7f8c45f89464ee582892e3cfa07c27bc&units=metric`
  );

  const [hourlyWeather, setHourlyWeather] = useState(null);
  const [currWeather, setCurrWeather] = useState(null);
  const [fiveDayWeahter, setFiveDayWeather] = useState(null);
  let forecastArr = [];
  const now = new Date();

  useEffect(() => {
    const fetchData = () => {
      Promise.all([fetch(currWeatherString), fetch(fiveDayWeatherString)])
        .then(([res1, res2]) => {
          return Promise.all([res1.json(), res2.json()]);
        })
        .then(([data1, data2]) => {
          setCurrWeather(data1);
          forecastArr = [];
          for (let i = 0; i < 40; i++) {
            if (data2.list[i].dt_txt.slice(11, 13) == 18) {
              forecastArr.push(data2.list[i]);
            }
          }
          setFiveDayWeather(forecastArr);
          setHourlyWeather(data2.list.slice(0, 5));
        });
    };
    fetchData();
  }, []);

  return (
    <div className="Dashboard">
      <div className="top_container">
        <div className="city_container">
          {" "}
          <h2>Savannah</h2>
          <h1>
            {now.getHours()}:{now.getMinutes().toString().padStart(2, "0")}
          </h1>
          <h3>
            {now.toLocaleString("default", { weekday: "long" })},{" "}
            {now.getDate().toString().padStart(2, "0")}{" "}
            {now.toLocaleString("default", { month: "long" })}
          </h3>
        </div>
        <div className="weather_container">
          <div className="temp_sun_container">
            <div className="temp_container">
              <h1>{currWeather && Math.round(currWeather.main.temp)}°C</h1>
              <p>
                Feels like:{" "}
                {currWeather && Math.round(currWeather.main.feels_like)}
                °C
              </p>
            </div>
            <div className="sun_container">
              <div className="sunrise_container">
                <img src={sunrise} alt="sunrise_icon" />
                <div className="sunrise_value_container">
                  <p>Sunrise</p>
                  <p>
                    {currWeather &&
                      new Date(currWeather.sys.sunrise * 1000)
                        .toTimeString()
                        .slice(0, 5) + " am"}
                  </p>
                </div>
              </div>
              <div className="sunset_container">
                <img src={sunset} alt="sunset_icon" />
                <div className="sunset_value_container">
                  <p>Sunset</p>
                  <p>
                    {" "}
                    {currWeather &&
                      new Date((currWeather.sys.sunset - 43200) * 1000)
                        .toTimeString()
                        .slice(0, 5) + " pm"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="main_weather_container">
            <img
              src={
                currWeather &&
                require(`../images/weather_icons/${currWeather.weather[0].icon}.png`)
              }
              alt="weather_icon"
              className="main_weather_img"
            />
            <h1 className="main_weather_title">
              {currWeather && currWeather.weather[0].description}
            </h1>
          </div>
          <div className="other_weather_container">
            <div className="left_other_weather">
              <div className="wind_container">
                <img
                  className="wind_icon"
                  src={currWeather && require("../images/icons/arrow_icon.png")}
                  alt="wind_icon"
                  style={
                    currWeather && {
                      transform: `rotate(${currWeather.wind.deg}deg)`
                    }
                  }
                />
                <p className="wind_value">
                  {currWeather && currWeather.wind.speed} km/hr
                </p>
                <p className="wind_title">Wind Speed</p>
              </div>
              <div className="humidity_container">
                <img
                  className="humidity_icon"
                  src={require("../images/icons/humidity_icon.png")}
                  alt="humidity_icon"
                />
                <p className="humidity_value">
                  {currWeather && currWeather.main.humidity}%
                </p>
                <p className="humidity_title">humidity</p>
              </div>
            </div>
            <div className="right_other_weather">
              <div className="pressure_container">
                <img
                  src={require("../images/icons/pressure_icon.png")}
                  alt="pressure_icon"
                  className="pressure_icon"
                />
                <p className="pressure_value">
                  {currWeather && currWeather.main.pressure} hPa
                </p>
                <p className="pressure_title">Pressure</p>
              </div>
              <div className="cloud_container">
                <img
                  src={require("../images/icons/cloud_icon.png")}
                  alt="cloud_icon"
                  className="cloud_icon"
                />
                <p className="cloud_value">
                  {currWeather && currWeather.clouds.all}%
                </p>
                <p className="cloud_title">Cloudiness</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom_container">
        <div className="forecast_container">
          <h1 className="forecast_title">5 Days Forecast:</h1>
          {fiveDayWeahter &&
            fiveDayWeahter.map((day, index) => (
              <div className={`forecast_${index}`} key={`forecast_${index}`}>
                <img
                  src={require(`../images/weather_icons/${day.weather[0].icon}.png`)}
                  alt="weather_icon"
                  className={`forecast_img_${index}`}
                />
                <div className="forecast_value_container">
                  <h3 className={`forecast_img_${index}`}>
                    {Math.round(day.main.temp)}°C
                  </h3>
                  <h3 className={`forecast_img_${index}`}>
                    {new Date(day.dt * 1000).toDateString().slice(0, -5)}
                  </h3>
                </div>
              </div>
            ))}
        </div>
        <div className="hourly_container">
          <h3 className="hourly_title">Hourly Forecast:</h3>
          <div className="inner_hourly_container">
            {hourlyWeather &&
              hourlyWeather.map((hour, index) => (
                <div className={`hourly_${index}`} key={`hourly_${index}`}>
                  <p className={`hourly_hour_${index}`}>
                    {new Date(hour.dt * 1000).toTimeString().slice(0, 5)}
                  </p>
                  <img
                    src={require(`../images/weather_icons/${hour.weather[0].icon}.png`)}
                    alt=""
                    className={`hourly_img_${index}`}
                  />
                  <p className={`hourly_temp_${index}`}>
                    {Math.round(hour.main.temp)}°C
                  </p>
                  <img
                    src={require("../images/icons/arrow_icon.png")}
                    alt="wind_icon"
                    className={`hourly_pointer_${index}`}
                    style={
                      hourlyWeather && {
                        transform: `rotate(${hour.wind.deg}deg)`
                      }
                    }
                  />
                  <p className={`hourly_wind_${index}`}>
                    {Math.round(hour.wind.speed)} km/hr
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
