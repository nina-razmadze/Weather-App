import { useEffect, useState, useContext } from "react";
import SideBar from "../components/SideBar";
import useCurrentWeather from "../hooks/useCurrentWeather";
import { getCityNameFromCoordinates } from "../utils/geocoding";
import { wallpaperArray } from "../components/WallpaperArray";
import { randomIndex } from "../components/WallpaperArray";
import { FormattedMessage } from "react-intl";
import { Language } from "../types/localstorage";
import { LocaleContext } from "../contexts/LocaleContext/LocaleContext";
import "tailwindcss/tailwind.css";

function HomeView() {
  const { loading, currentWeather } = useCurrentWeather();
  const [toggle, setToggle] = useState(false);
  const [cityName, setCityName] = useState("");
  const { locale, setLocale } = useContext(LocaleContext);

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
  const currentData = new Date();

  useEffect(() => {
    if (currentWeather && currentWeather.coord) {
      const { lat, lon } = currentWeather.coord;
      getCityNameFromCoordinates(lat, lon)
        .then((city) => {
          if (!cityName) {
            setCityName(city);
          }
        })
        .catch(() => {
          if (!cityName) {
            setCityName("Loading...");
          }
        });
    }
  }, [currentWeather, cityName]);

  const CurrentWeatherMaxTemp = currentWeather?.main.temp_max;
  let celsiusTemperature = "";
  if (typeof CurrentWeatherMaxTemp === "number") {
    celsiusTemperature = (CurrentWeatherMaxTemp - 273.15).toFixed(2);
  }
  return (
    <div
      className="relative w-screen h-screen "
      style={{
        backgroundImage: `url(${wallpaperArray[randomIndex]})`,
        backgroundSize: "cover",
      }}
    >
      <div
        className="absolute top-0 left-0 w-full h-full "
        style={{
          content: "''",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
        }}
      ></div>

      <div className="flex items-center justify-center w-full h-full">
        <div
          className="flex items-center justify-between w-[90%]  m-auto container border backdrop-blur-lg"
          style={{
            backgroundImage: `url(${wallpaperArray[randomIndex]})`,
            backgroundSize: "cover",
          }}
        >
          <div className="absolute top-4 left-4  pt-[24px] pl-[24px]">
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
            className="absolute bg-purple-400 bottom-[90.5%] left-[10%] border border-white rounded text-white px-[7px] py-[5px] "
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

          <div className="text-white 2xl:pl-[160px] pt-[280px] lg:pl-[75px] md:pl-[40px] flex  flex-col ">
            <h1 className="lg:text-[90px] md:text-[60px] 2xl:text-[120px]  font-serif tracking-widest">
              {loading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-[50px] h-[50px] mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>

                  <h1 className="text-[60px] font-serif text-white">
                    Loading...
                  </h1>
                </div>
              ) : (
                <h1>{cityName}</h1>
              )}
            </h1>
            <h1 className="text-[70px] pr-[20px] md:text-[50px] 2xl:text-[80px] 2xl:pl-[10px] 2xl:pb-[10px] ">
              {handleChange(celsiusTemperature)}
            </h1>
            <h1 className="text-2xl pt-[24px] md:text-[25px] 2xl:text-[40px] 2xl:pl-[10px] 2xl:pb-[70px] ">
              <FormattedMessage
                id="date.format"
                defaultMessage="{month} {weekday}, {day} {year}"
                values={{
                  month: (
                    <FormattedMessage
                      id={`months.short.${currentData.getMonth()}`}
                    />
                  ),
                  weekday: (
                    <FormattedMessage id={`weekdays.${currentData.getDay()}`} />
                  ),

                  day: currentData.getDate(),
                  year: currentData.getFullYear(),
                }}
              />
            </h1>
          </div>

          <SideBar toggle={toggle} cityName={cityName} />
        </div>
      </div>
    </div>
  );
}

export default HomeView;
