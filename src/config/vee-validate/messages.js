import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";
import en from "@vee-validate/i18n/dist/locale/en.json ";
import ka from "@vee-validate/i18n/dist/locale/ka.json ";

localize("ka", {
  messages: {
    georgian: "გთხოვთ გამოიყენოთ მხოლოდ ქართული სიმბოლოები",
    english: "გთხოვთ გამოიყენოთ მხოლოდ ლათინური სიმბოლოები",
  },
});
localize("en", {
  messages: {
    georgian: "Please use only Georgian letters",
    english: "Please use only English letters",
  },
});

configure({
  generateMessage: localize({
    en,
    ka,
  }),
});
