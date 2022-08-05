import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import "./config/vee-validate/rules";
import "./config/vee-validate/messages";
import { createPinia } from "pinia";
import "aos/dist/aos.css";
import router from "./router";
import Pusher from "pusher-js";
import Echo from "laravel-echo";
import { i18n } from "./config/i18n/index";

window.Pusher = Pusher;

window.Echo = new Echo({
  authEndpoint: "http://127.0.0.1:8000/broadcasting/auth",
  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  },
  broadcaster: "pusher",
  key: "85f4b4e04d72b31622a3",
  cluster: "ap2",
  encrypted: true,
});

const app = createApp(App).use(i18n).use(router).use(createPinia());
app.mount("#app");
