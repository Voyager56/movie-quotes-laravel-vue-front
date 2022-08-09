import { defineRule } from "vee-validate";

import {
  min,
  max,
  required,
  email,
  confirmed,
  image,
  numeric,
} from "@vee-validate/rules";

defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("required", required);
defineRule("confirmed", confirmed);
defineRule("image", image);
defineRule("numeric", numeric);
defineRule("georgian", (value) => {
  return /[\u10A0-\u10FF-9_]+( [\u10A0-\u10FF-9_]+)*[+*?.]*$/.test(value);
});
defineRule("english", (value) => {
  return /^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*[+*?.]*$/.test(value);
});
