import React from "react";
import Search from "./Search";
import WeatherDetails from "./WeatherDetails";

type SideBarProps = {
  toggle: boolean;
  cityName: string;
};

export default function SideBar({ toggle, cityName }: SideBarProps) {
  return (
    <div className="lg:w-[450px] 2xl:w-[500px] md:w-[410px]  bg-white/20 h-[710px]  overflow-y-scroll  ">
      <form>
        <div className="flex justify-center flex-row">
          <div className="relative  w-[380px] h-[600px] mt-[40px] m-auto">
            <Search />
            <WeatherDetails toggle={toggle} cityName={cityName} />
          </div>
        </div>
      </form>
    </div>
  );
}
