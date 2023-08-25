import useCurrentWeather from "../hooks/useCurrentWeather";
import useWeeklyWeather from "../hooks/useWeeklyWeather";
import { FormattedMessage } from "react-intl";

type WeatherDetailsProps = {
  toggle: boolean;
  cityName: string;
};

export default function WeatherDetails({
  toggle,
  cityName,
}: WeatherDetailsProps) {
  const { weeklyWeather } = useWeeklyWeather(cityName);
  const { currentWeather } = useCurrentWeather();

  const CurrentWeatherDesc = currentWeather?.weather[0].description;
  const CurrentWeatherHumidity = currentWeather?.main.humidity;
  const CurrentWeatherWindSpeed = currentWeather?.wind.speed;
  const CurrentWeatherWindDeg = currentWeather?.wind.deg;

  const handleChange = (celsius: any) => {
    if (toggle) {
      const fahrenheit = (celsius * 9) / 5 + 32;
      return `${fahrenheit.toFixed(2)}°F`;
    } else {
      return `${celsius}°C`;
    }
  };

  return (
    <div>
      <dl className="max-w-md text-white text-base	pt-[20px]  tracking-wider pl-[6px] font-mono dark:text-white dark:divide-gray-700 ">
        <div className="flex flex-col pb-[24px]">
          <dd className="text-lg font-semibold font-serif">
            <FormattedMessage id="Wheather Details" />
          </dd>
        </div>

        <div className="flex pt-[24px] justify-between">
          <dd className="text-xl  font-serif">
            <FormattedMessage id="description" />
          </dd>
          <dd className="text-lg font-semibold">{CurrentWeatherDesc}</dd>
        </div>

        <div className="flex justify-center">
          <dd className="text-xl  justify-center m-auto items-center font-semibold font-serif pt-[24px]">
            <FormattedMessage id="temperature" />
          </dd>
        </div>

        {CurrentWeatherHumidity !== null && (
          <div className="flex pt-[24px] justify-between">
            <dd className="text-xl  font-serif">
              <FormattedMessage id="Humidity" />
            </dd>
            <dd className="text-lg font-semibold">{CurrentWeatherHumidity}%</dd>
          </div>
        )}

        <div className="flex justify-center">
          <dd className="text-xl  justify-center m-auto items-center font-semibold font-serif pt-[24px]">
            <FormattedMessage id="Wind" />
          </dd>
        </div>

        <div className="flex pt-[24px] justify-between">
          <dd className="text-xl font-serif">
            <FormattedMessage id="Speed" />
          </dd>
          <dd className="text-lg font-semibold">
            {CurrentWeatherWindSpeed} m/s
          </dd>
        </div>
        <div
          className="flex pt-[24px] justify-between pb-[40px] font-serif"
          style={{ borderBottom: "1px solid purple" }}
        >
          <dd className="text-xl font-serif">
            <FormattedMessage id="Deg" />
          </dd>
          <dd className="text-lg font-semibold">{CurrentWeatherWindDeg} m/s</dd>
        </div>
      </dl>

      <dl className=" text-white text-base	pt-[30px] tracking-wide pl-[6px] font-serif dark:text-white dark:divide-gray-700 ">
        <div className="flex flex-col pb-3">
          <dd className="text-xl font-semibold font-serif pb-[24px]">
            <FormattedMessage id="Next Days" />
          </dd>
        </div>
        {weeklyWeather?.list.map((dayWeather: any, index: any) => {
          if (index === new Date().getDay()) {
            return null;
          }
          const CurrentWeatherMaxTemp = dayWeather[0].main.temp_max;
          let celsiusTemperature = "";
          if (typeof CurrentWeatherMaxTemp === "number") {
            celsiusTemperature = (CurrentWeatherMaxTemp - 273.15).toFixed(2);
          }

          const weekdayMessageId = `weekday.${new Date(
            dayWeather[0].dt * 1000
          ).getDay()}`;
          const translatedWeekday = <FormattedMessage id={weekdayMessageId} />;

          return (
            <div
              className="flex py-1 items-center justify-between w-[430px] pb-[24px]"
              key={index}
            >
              <div className="text-xl font-serif w-[30%]">
                {translatedWeekday}
              </div>

              <div className="text-lg font-semibold pr-[30px] w-[30%]">
                {handleChange(celsiusTemperature)}
              </div>

              <div className="text-lg  font-semibold pr-[30px] w-[30%]">
                {dayWeather[0].weather[0].description === "few clouds" ||
                dayWeather[0].weather[0].description === "broken clouds" ||
                dayWeather[0].weather[0].description === "scattered clouds" ||
                dayWeather[0].weather[0].description === "overcast clouds" ? (
                  <div className="text-[60px] pt-[10px]">☁️</div>
                ) : dayWeather[0].weather[0].description === "light rain" ||
                  dayWeather[0].weather[0].description === "moderate rain" ? (
                  <div className="text-[60px] pt-[10px]">🌧️</div>
                ) : dayWeather[0].weather[0].description === "Thunderstorm" ? (
                  <div className="text-[60px] pt-[10px]">⛈️</div>
                ) : dayWeather[0].weather[0].description === "clear sky" ? (
                  <div className="text-[60px] pt-[10px]">⛅️</div>
                ) : dayWeather[0].weather[0].description === "Rain" ? (
                  <div className="text-[60px] pt-[10px]">🌧</div>
                ) : dayWeather[0].weather[0].description === "Sunny" ? (
                  <div className="text-[60px] pt-[10px]">🌤</div>
                ) : dayWeather[0].weather[0].description === "snow" ? (
                  <div className="text-[60px] pt-[10px]">❄️</div>
                ) : dayWeather[0].weather[0].description === "mist" ? (
                  <div className="text-[60px] pt-[10px]">🌫️</div>
                ) : dayWeather[0].weather[0].description === "fog" ? (
                  <div className="text-[60px] pt-[10px]">🌁</div>
                ) : dayWeather[0].weather[0].description === "Tornado" ? (
                  <div className="text-[60px] pt-[10px]">🌪️</div>
                ) : null}
              </div>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
