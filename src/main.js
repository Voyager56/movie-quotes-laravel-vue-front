import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import "./config/vee-validate/validator";
import "./config/vee-validate/messages";
import { createPinia } from "pinia";
import "aos/dist/aos.css";
import router from "./router";
import Pusher from "pusher-js";
import Echo from "laravel-echo";

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: "pusher",
  key: "85f4b4e04d72b31622a3",
  cluster: "ap2",
  encrypted: true,
});

const app = createApp(App).use(router).use(createPinia());
app.mount("#app");
