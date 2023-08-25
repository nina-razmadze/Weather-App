import { useState, useEffect } from "react";

export default function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  const addSearchTerm = (term: string) => {
    setSearchHistory((prev) => [term, ...prev]);
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  return { searchHistory, addSearchTerm, clearSearchHistory };
}
