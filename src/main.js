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
  authEndpoint: import.meta.env.VUE_APP_API_URL + "/broadcasting/auth",
  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  },
  broadcaster: "pusher",
  key: import.meta.env.VITE_APP_PUSHER_KEY,
  cluster: import.meta.env.VITE_APP_PUSHER_CLUSTER,
  encrypted: true,
});

const app = createApp(App).use(i18n).use(router).use(createPinia());
app.mount("#app");
