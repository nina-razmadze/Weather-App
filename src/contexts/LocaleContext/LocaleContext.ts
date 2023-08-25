import { createContext } from "react";
import { Language } from "../../types/localstorage";

export type LocaleContextValue = {
  locale: Language;
  setLocale: React.Dispatch<React.SetStateAction<Language>>;
};

export const LocaleContext = createContext<LocaleContextValue>({
  locale: Language.EN,
  setLocale: () => {},
});
