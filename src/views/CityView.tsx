import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Language } from "../types/localstorage";
import WeatherBox from "../components/WeatherBox";
import { randomIndex } from "../components/WallpaperArray";
import { wallpaperArray } from "../components/WallpaperArray";
import useWeeklyWeather from "../hooks/useWeeklyWeather";
import { LocaleContext } from "../contexts/LocaleContext/LocaleContext";
import { useContext } from "react";
import { FormattedMessage } from "react-intl";

type TweatherData = {
  daily: any;
  name: string;
  wind: {
    speed: number;
    deg: number;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    description: any;
    main: string;
    icon: any;
  }[];
};

export default function CityView() {
  const { locale, setLocale } = useContext(LocaleContext);

  const currentData = new Date();
  const { cityName } = useParams();

  const apiKey = "737bdb77f2efb1c4470345aede9305cc";

  const { weeklyWeather } = useWeeklyWeather(cityName as string);

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  const [weatherData, setWeatherData] = useState<TweatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toggle, setToggle] = useState(false);

  let celsiusTemperature = "";
  if (
    weatherData &&
    weatherData.main &&
    typeof weatherData.main.temp_min === "number"
  ) {
    celsiusTemperature = (weatherData.main.temp_min - 273.15).toFixed(2);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<TweatherData>(apiUrl);
        setWeatherData(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(error);
      }
    };
    fetchData();
  }, [apiUrl]);

  if (isLoading) {
    return (
      <div
        className="relative w-screen h-screen justify-center items-center flex"
        style={{
          backgroundImage: `url(${wallpaperArray[randomIndex]})`,
          backgroundSize: "cover",
        }}
      >
        <h1 className="text-[60px] font-serif text-white">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weatherData) {
    return <div>No data available</div>;
  }

  const weatherItem = weatherData.weather[0];
  const weatherMain = weatherItem?.main || "Unknown";
  const description = weatherItem?.description || "Unknown";

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleChange = (celsius: any) => {
    if (toggle) {
      const fahrenheit = (celsius * 9) / 5 + 32;
      return `${fahrenheit.toFixed(2)}°F`;
    } else {
      return `${celsius}°C`;
    }
  };

  return (
    <div
      className="relative h-screen"
      style={{
        backgroundImage: `url(${wallpaperArray[randomIndex]})`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-wrap justify-center"></div>

      <div
        className="absolute top-0 left-0 w-full h-full "
        style={{
          content: "''",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
        }}
      ></div>
      <div className="flex items-center justify-center w-full h-full">
        <div
          className="flex flex-col items-center justify-center w-[75%] m-auto container border backdrop-blur-lg"
          style={{
            backgroundImage: `url(${wallpaperArray[randomIndex]})`,
            backgroundSize: "cover",
          }}
        >
          <div className="text-white pt-[24px] justify-center flex-col items-center">
            <div className="absolute top-4 right-4  pt-[24px] pr-[24px]">
              <label className="relative inline-flex items-center  cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  onClick={handleToggle}
                />
                <div className="  w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                <span className="ml-3 text-sm text-white font-medium text-gray-900 dark:text-gray-300">
                  <FormattedMessage id="Fahr" />
                </span>
              </label>
            </div>
            <select
              className="absolute bg-purple-400 bottom-[90.5%] right-[13%] border border-white rounded text-white px-[7px] py-[5px] "
              onChange={(e) => {
                localStorage.setItem("locale", e.target.value);
                setLocale(e.target.value as Language);
              }}
              value={locale}
            >
              <option value={Language.EN}>
                <FormattedMessage id="ENG" />
              </option>
              <option value={Language.GE}>
                <FormattedMessage id="GEO" />
              </option>
            </select>
            <h1 className="text-6xl font-serif tracking-wide	">
              {weatherData.name}
            </h1>
            <h2 className="text-xl pt-[24px] "> </h2>
          </div>
          <div className="text-white  justify-between w-[80%] flex pt-[30px] items-center">
            <div className="felx flex-col ">
              <div className="flex  ">
                <h1
                  className="pr-[35px] 2xl:text-[100px]  md:absolute md:top-[150px] md:text-[35px]  md:hidden lg:block lg:text-[65px]
                font-serif "
                >
                  <FormattedMessage id={weatherMain} />
                </h1>
                <div className="flex justify-center items-center  h-[100px]">
                  <div className="pt-[45px]  items-center">
                    {weatherMain === "Clouds" ||
                      (weatherMain === "Clear" && (
                        <div className="hidden 2xl:block 2xl:pl-[300px] 2xl:text-[130px] 2xl:mb-[100px] text-8xl">
                          <span role="img" aria-label="Cloud Emoji">
                            ☁️
                          </span>
                        </div>
                      ))}
                    {weatherMain === "Thunderstorm" && (
                      <div className="pr-[40px] pt-[20px] text-3xl">⛈️</div>
                    )}
                    {weatherMain === "Haze" && (
                      <div className="pr-[40px] pt-[20px] text-3xl">🌫️</div>
                    )}
                    {weatherMain === "Rain" && (
                      <div className="text-3xl">🌧️</div>
                    )}
                    {weatherMain === "Sunny" && (
                      <div className="text-3xl">☀️</div>
                    )}
                    {weatherMain === "Snow" && (
                      <div className="text-3xl">❄️</div>
                    )}
                    {weatherMain === "Clouds" && (
                      <div className="text-3xl">☁️</div>
                    )}
                    {weatherMain === "Mist" && (
                      <div className="text-3xl">🌫️</div>
                    )}
                    {weatherMain === "Fog" && (
                      <div className="text-3xl">🌁</div>
                    )}
                    {weatherMain === "Tornado" && (
                      <div className="text-3xl">🌪️</div>
                    )}
                  </div>
                </div>
              </div>
              <p className="2xl:text-[50px] lg:text-[40px] lg:pl-[6px] 2xl:pl-[15px] font-serif tracking-wide md:hidden lg:block 	">
                <FormattedMessage id={description} />
              </p>
            </div>

            <div className="2xl:w-[470px] lg:w-[370px]">
              <div className="grid grid-cols-3  gap-4">
                <div>
                  <h1 className="text-[55px]">🌡</h1>
                </div>
                <div>
                  <h1 className="text-[40px] pr-[5px]">
                    <FormattedMessage id="temp" />
                  </h1>
                </div>
                <div className="text-[30px] lg:pt-[10px]">
                  {handleChange(celsiusTemperature)}
                </div>
                <div>
                  <h1 className="text-[55px] pt-[10px] ">💨</h1>
                </div>
                <div>
                  <h1 className="text-[40px] pr-[5px] pt-[10px]">
                    <FormattedMessage id="Wind" />
                  </h1>
                </div>
                <div>
                  <h1 className="text-[30px] flex justify-between ">
                    {weatherData.wind.speed} m/s,{weatherData.wind.deg}°
                  </h1>
                </div>
                <div>
                  <h1 className="text-[55px] ">%</h1>
                </div>
                <div>
                  <h1 className="text-[40px] pr-[5px]">
                    <FormattedMessage id="Pressure" />
                  </h1>
                </div>
                <div>
                  <h1 className="text-[30px] lg:pt-[10px] ">
                    {weatherData.main.pressure}
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className="text-white lg:overflow-x-auto lg:w-[660px] 2xl:w-[1200px] pt-[60px] pb-[24px] relative flex justify-between items-center  md:overflow-x-auto md:w-[500px]">
            {weeklyWeather?.list.map((dayWeather: any, index: any) => {
              const CurrentWeatherMaxTemp = dayWeather[0].main.temp_max;
              let celsiusTemperature = "";
              if (typeof CurrentWeatherMaxTemp === "number") {
                celsiusTemperature = (CurrentWeatherMaxTemp - 273.15).toFixed(
                  2
                );
              }
              const weekdayMessageId = `weekday.${new Date(
                dayWeather[0].dt * 1000
              ).getDay()}`;
              const translatedWeekday = (
                <FormattedMessage id={weekdayMessageId} />
              );

              return (
                <WeatherBox
                  key={index}
                  day={new Date(dayWeather[0].dt * 1000).toLocaleDateString(
                    "en-US"
                  )}
                  translatedWeekday={translatedWeekday}
                  temperature={handleChange(celsiusTemperature)}
                  description={dayWeather[0].weather[0].description}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
