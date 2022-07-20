import LandingPage from "../pages/LandingPage.vue";
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
      path: "/feed",
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    instance
      .post("http://127.0.0.1:8000/api/me", {
        Authorization: `Bearer ${document.cookie.split("=")[1]}`,
      })
      .then((res) => {
        if (res.data.status === "success") {
          userStore.user = res.data.user;
          if (userStore.user.email_verified_at) {
            next();
          } else {
            next("/verify");
          }
        } else {
          next("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    next();
  }
});

export default router;
