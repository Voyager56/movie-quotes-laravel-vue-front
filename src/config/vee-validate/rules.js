import { defineRule } from "vee-validate";

import {
  min,
  max,
  required,
  email,
  confirmed,
  image,
} from "@vee-validate/rules";

defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("required", required);
defineRule("confirmed", confirmed);
defineRule("image", image);
defineRule("georgian", (value) => {
  return /[\u10A0-\u10FF]/.test(value);
});
defineRule("english", (value) => {
  return /^[a-zA-Z]+$/.test(value);
});
