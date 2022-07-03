import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import LandingPage from "./pages/LandingPage.vue";
import "./assets/tailwind.css";
import "./config/validator";
import "./config/messages";
import { createPinia } from "pinia";

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", component: LandingPage }],
});
createApp(App).use(createPinia()).use(router).mount("#app");
