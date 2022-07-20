import LandingPage from "../pages/LandingPage.vue";
import MainPage from "../pages/MainPage.vue";
import EmailVerified from "../components/EmailVerified.vue";
import EmailSent from "../components/EmailSent.vue";
import { createRouter, createWebHistory } from "vue-router";
import instance from "../config/axios/index";
import userStore from "../store/index";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: LandingPage,
      children: [
        {
          path: "/verified/:token?",
          component: EmailVerified,
        },
        {
          path: "/verify",
          component: EmailSent,
        },
      ],
    },
    {
      path: "/main",
      component: MainPage,
      meta: { requiresAuth: true },
      children: [],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const store = userStore();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    instance
      .post("http://127.0.0.1:8000/api/me", {
        Authorization: `Bearer ${document.cookie.split("=")[1]}`,
      })
      .then((res) => {
        store.setUser(res.data.user);
        if (res.data.user.email_verified_at) {
          next();
        } else {
          next("/verified");
        }
      })
      .catch(() => {
        next("/");
      });
  } else {
    next();
  }
});

export default router;
