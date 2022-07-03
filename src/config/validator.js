import { defineRule } from "vee-validate";
import { min, max, required, email, confirmed } from "@vee-validate/rules";

defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("required", required);
defineRule("confirmed", confirmed);
