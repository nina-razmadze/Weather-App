import React from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import useSearchHistory from "../hooks/useSearchHistory";
import "tailwindcss/tailwind.css";
import { Country } from "country-state-city";

export default function Search() {
  const intl = useIntl();
  const citiesToShow = 50;
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { search, setSearch } = useContext(SearchContext);
  const { addSearchTerm } = useSearchHistory();
  const [isInputFocused, setInputFocused] = useState(false);

  const handleInputChange = (e: any) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search) {
      addSearchTerm(search);
      navigate(search);
    }
  };

  const handleFocusClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      setInputFocused(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex ">
          <div
            className={`relative w-full overflow-hidden overflow-y-scroll custom-scrollbar  mb-[15px] transition-height duration-300     focus:border  ${
              isInputFocused ? "h-[500px]" : "h-[50px]"
            }`}
          >
            <input
              type="search"
              ref={inputRef}
              onClick={handleFocusClick}
              className="block p-2.5 w-full z-20 text-base text-white p-[10px] backdrop-blur-lx bg-transparent border-b border-fuchsia-600 focus:border-purple-600 outline-none placeholder-white font-sans focus:border focus:placeholder-white-800 mb-[30px]  "
              placeholder={intl.formatMessage({ id: "Another location" })}
              onChange={handleInputChange}
            />

            <div className="text-white ">
              <h1 className="text-[21px] font-serif pb-[8px]">
                <FormattedMessage id="City Names" />
              </h1>
              {isInputFocused && (
                <div className="max-h-500px transition-max-height duration-300 relative overflow-y-scroll custom-scrollbar text-xl">
                  <ul className="pt-[15px]">
                    {Country.getAllCountries()
                      .slice(0, citiesToShow)
                      .map((city) => (
                        <Link key={city.name} to={`/${city.name}`}>
                          <li className="pb-[16px] font-serif text-[19px]">
                            {city.name}
                          </li>
                        </Link>
                      ))}
                  </ul>
                </div>
              )}
            </div>
            <Link to={search}>
              <button type="submit" className="absolute top-1 right-0 p-2.5 ">
                <BsSearch className="text-white" />
                <span className="sr-only">Search</span>
              </button>
            </Link>

            <dl className="max-w-md text-white text-base  tracking-wider	pt-[40px] pl-[6px] font-mono dark:text-white dark:divide-gray-700"></dl>
          </div>
        </div>
      </form>
    </div>
  );
}
