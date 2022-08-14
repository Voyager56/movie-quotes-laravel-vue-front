import LandingPage from "../pages/LandingPage.vue";
import MainPage from "../pages/MainPage.vue";
import EmailVerified from "../components/EmailVerified.vue";
import EmailSent from "../components/EmailSent.vue";
import EditProfile from "../components/EditComponents/EditProfile.vue";
import FeedComponent from "../components/FeedComponent.vue";
import MovieList from "../components/MovieList.vue";
import ViewQuote from "../components/ViewQuote.vue";
import EditQuote from "../components/EditComponents/EditQuote.vue";
import EditMovie from "../components/EditComponents/EditMovie.vue";
import MovieDescription from "../components/MovieDescription.vue";
import PasswordResetEmailSent from "../components/PasswordResetComponents/PasswordResetEmailSent.vue";
import PasswordReset from "../components/PasswordResetComponents/PasswordReset.vue";
import SendPasswordReset from "../components/PasswordResetComponents/SendPasswordReset.vue";
import PasswordConfirmationSuccess from "../components/PasswordResetComponents/PasswordConfirmationSuccess.vue";
import PageNotFound from "../pages/PageNotFound.vue";
import UnauthorizedPage from "../pages/UnauthorizedPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import axiosInstance from "@/config/axios";
import userStore from "@/store/index";

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
        {
          path: "/password-reset",
          component: PasswordReset,
        },
        {
          path: "/password-reset-sent",
          component: PasswordResetEmailSent,
        },
        {
          path: "/reset-password/:token?",
          component: SendPasswordReset,
        },
        {
          path: "/password-reset-success",
          component: PasswordConfirmationSuccess,
        },
      ],
    },
    {
      path: "/unauthorized",
      component: UnauthorizedPage,
    },
    {
      path: "/main",
      component: MainPage,
      meta: { requiresAuth: true },
      children: [
        {
          path: "/main/feed",
          component: FeedComponent,
        },
        {
          path: "/main/edit",
          component: EditProfile,
        },
        {
          path: "/main/movies",
          component: MovieList,
        },
        {
          path: "/main/movies/:id",
          component: MovieDescription,
        },
        {
          path: "/main/movies/quote/:id",
          component: ViewQuote,
        },
        {
          path: "/main/movies/edit/quote/:id",
          component: EditQuote,
        },
        {
          path: "/main/movies/edit/movie/:id",
          component: EditMovie,
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      component: PageNotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const store = userStore();
  if (to.path === "/main") next("/main/feed");
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    axiosInstance
      .post("/api/me", {
        Authorization: `Bearer ${localStorage.token}`,
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
        next("/unauthorized");
      });
  } else {
    next();
  }
});

export default router;
