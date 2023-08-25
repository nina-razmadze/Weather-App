import React, { PropsWithChildren, useState, useEffect } from "react";
import { IntlProvider } from "react-intl";
import { Language } from "../../types/localestorage";
import { LocaleContext } from "../../contexts/LocaleContext/LocaleContext";

import en from "./translations/en.json";
import ge from "./translations/ge.json";

export function LocaleProvider({ children }: PropsWithChildren) {
  const [locale, setLocale] = useState<Language>(Language.EN);

  useEffect(() => {
    const items = localStorage.getItem("locale");
    if (items === "ENG") {
      setLocale(Language.EN);
    } else {
      setLocale(Language.GE);
    }
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <IntlProvider
        locale={locale === Language.EN ? "en" : "ge"}
        messages={locale === Language.EN ? en : ge}
        defaultLocale="en"
      >
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
}
