import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import "./config/vee-validate/validator";
import "./config/vee-validate/messages";
import { createPinia } from "pinia";
import "aos/dist/aos.css";
import router from "./router";

const app = createApp(App).use(createPinia()).use(router);
app.mount("#app");
