import { createI18n } from "vue-i18n";
import { ka } from "./locales/ka";
import { en } from "./locales/en";
const messages = {
  en: en,
  ka: ka,
};

export const i18n = createI18n({
  locale: "en",
  fallBackLocale: "en",
  messages,
});
