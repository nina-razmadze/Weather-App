export default function WeatherBox({
  temperature,
  description,
  translatedWeekday,
}: any) {
  return (
    <div className="box-content h-36 flex flex-col items-center justify-center w-32 p-6 border-2 m-[10px] backdrop-blur-md bg-white/30 rounded-lg">
      <h1 className="font-sans text-[21px] items-center tracking-wider">
        {translatedWeekday}
      </h1>

      <div>
        {description === "few clouds" ||
        description === "broken clouds" ||
        description === "scattered clouds" ||
        description === "overcast clouds" ? (
          <div className="text-[50px] ">☁️</div>
        ) : description === "light rain" || description === "moderate rain" ? (
          <div className="text-[50px] ">🌧️</div>
        ) : description === "Thunderstorm" ? (
          <div className=" text-[60px] ">⛈️</div>
        ) : description === "clear sky" ? (
          <div className="text-[50px] ">⛅️</div>
        ) : description === "Rain" ? (
          <div className="text-[60px] ">🌧</div>
        ) : description === "Sunny" ? (
          <div className="text-[60px] ">☀️</div>
        ) : description === "snow" ? (
          <div className="text-[60px] ">❄️</div>
        ) : description === "mist" ? (
          <div className="text-[60px] ">🌫️</div>
        ) : description === "fog" ? (
          <div className="text-[60px] ">🌁</div>
        ) : description === "Tornado" ? (
          <div className="text-[60px] ">🌪️</div>
        ) : null}
      </div>
      <p className="pt-[20px] font-mono text-xl">{temperature}</p>
    </div>
  );
}
