import { useState, useEffect } from "react";
import axios from "axios";

type WeeklyWeatherData = {
  city: string;
  list: {
    main: any;
    weather: any[];
  }[];
};

export default function useWeeklyWeather(city: string) {
  const [weeklyWeather, setWeeklyWeather] = useState<WeeklyWeatherData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [dailyError, setDailyError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=737bdb77f2efb1c4470345aede9305cc`
        );

        const dailyForecast = response.data.list.reduce(
          (acc: any, forecast: any) => {
            const forecastDate = forecast.dt_txt.split(" ")[0];
            if (!acc[forecastDate]) {
              acc[forecastDate] = [];
            }
            acc[forecastDate].push(forecast);
            return acc;
          },
          {}
        );
        setWeeklyWeather({
          city: response.data.city,
          list: Object.values(dailyForecast),
        });
        setLoading(false);
      } catch (error) {
        setDailyError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [city]);
  return { weeklyWeather, loading, dailyError };
}
