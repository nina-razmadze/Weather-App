import React, { useState } from "react";
import { SearchContext } from "../contexts/SearchContext";

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState<string>("");
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}
