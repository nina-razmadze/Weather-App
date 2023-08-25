import { useEffect, useState } from "react";
import axios from "axios";

type TCurrentWeather = {
  weather: any[];
  main: {
    temp_max: number;
    temp_min: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  name: string;
  coord: any;
};
export default function useCurrentWeather() {
  const [currentWeather, setCurrentWeather] = useState<TCurrentWeather | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async (lat: any, lon: any) => {
      try {
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=737bdb77f2efb1c4470345aede9305cc`
        );
        setCurrentWeather(weatherResponse.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  return { loading, error, currentWeather };
}
