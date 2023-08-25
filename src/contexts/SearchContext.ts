import { createContext } from "react";

interface searchContextValue {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = createContext<searchContextValue>({
  search: "",
  setSearch: () => {},
});
