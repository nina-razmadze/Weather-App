import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { LocaleProvider } from "./providers/LocaleProvider/LocaleProvider";
import { SearchProvider } from "./providers/SearchProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <SearchProvider>
        <LocaleProvider>
          <App />
        </LocaleProvider>
      </SearchProvider>
    </BrowserRouter>
  </React.StrictMode>
);
