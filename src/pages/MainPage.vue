<script setup>
import { ref, onMounted, watch } from "vue";
import LanguageButtons from "../components/LanguageButtons.vue";
import IconBell from "../components/icons/IconBell.vue";
import IconHome from "../components/icons/IconHome.vue";
import IconFilm from "../components/icons/IconFilm.vue";
import IconCommentNotification from "../components/icons/IconCommentNotification.vue";
import IconLikeNotification from "../components/icons/IconLikeNotification.vue";
import IconDropDown from "../components/icons/IconDropDown.vue";
import userStore from "@/store/index";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import axiosInstance from "@/config/axios";
import { onClickOutside } from "@vueuse/core";
import timeDiff from "time-diff-for-humans";
import { useI18n } from "vue-i18n";

const { locale } = useI18n({ useScope: "global" });

const url = ref("feed");
const store = userStore();
const { user } = storeToRefs(store);
const langDropDown = ref(false);
const notifications = ref([]);
const notificationModal = ref(false);
const notificationModalRef = ref(null);
const element = ref(null);
const isLowRes = ref(!(window.innerWidth < 768));

onMounted(() => {
  const route = useRoute();
  url.value = route.path.split("/main/")[1];

  axiosInstance
    .get("/api/notifications")
    .then((res) => {
      notifications.value = res.data.reverse();
    })
    .catch((err) => {
      console.log(err);
    });
});

watch(isLowRes, () => {
  document.body.style.overflow = isLowRes.value ? "hidden" : "auto";
});

function toggleSideBar() {
  isLowRes.value = !isLowRes.value;
}

function toggle() {
  notificationModal.value = !notificationModal.value;
}

function toggleLanguageDropdown() {
  langDropDown.value = true;
}

function closeLanguageDropdown() {
  langDropDown.value = false;
}

watch(notificationModal, (notificationModal) => {
  document.body.style.overflow = notificationModal ? "hidden" : "auto";
});

onClickOutside(notificationModalRef, () => {
  notificationModal.value = false;
});

window.Echo.private(`user.${user.value.value.id}`).listen(
  "SendNotificationEvent",
  ({ data }) => {
    notifications.value = [data, ...notifications.value];
  }
);

function markAllNotificationsAsRead() {
  axiosInstance
    .post("/api/notifications/all")
    .then(() => {
      notifications.value.forEach((notification) => {
        notification.notification.read = true;
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function markNotificationAsRead(notification) {
  axiosInstance
    .post(`/api/notifications/${notification.id}`)
    .then(() => {
      notification.read = true;
    })
    .catch((err) => {
      console.log(err);
    });
}

function logOut() {
  axiosInstance
    .post("api/logout")
    .then(() => {
      window.location.href = "/";
      localStorage.token = null;
      store.setUser(null);
    })
    .catch((e) => console.log(e));
}
</script>

<template>
  <!-- navbar -->
  <div ref="element">
    <div
      class="bg-[#22203033]/100 h-[5rem] sticky flex items-center justify-between px-0 md:px-20"
    >
      <a href="/main/feed" class="text-[#DDCCAA] text-2xl hidden md:block"
        >MOVIE QUOTES</a
      >
      <div class="flex justify-between w-[300px] items-center">
        <button class="absolute left-[50px] md:hidden" @click="toggleSideBar">
          <IconDropDown />
        </button>
        <div class="absolute md:static flex right-2">
          <button id="notification-dropdown" class="relative" @click="toggle">
            <IconBell />
            <h3
              class="bg-red-500 rounded-full p-4 w-3 h-3 text-white absolute top-[-15px] right-[-15px] flex items-center justify-center"
              :class="{ hidden: notifications.length === 0 }"
            >
              {{ notifications.length }}
            </h3>
          </button>
          <div
            v-if="notificationModal"
            class="bg-[#22203033]/70 left-0 right-0 top-[5rem] bottom-0 absolute z-[100] backdrop-blur-sm"
          >
            <div
              ref="notificationModalRef"
              class="absolute bg-[#000000] text-white right-[20px] md:right-[100px] max-h-[600px] pb-5 top-[0px] z-[100] w-[300px] md:w-[500px] flex flex-col items-start px-5 rounded-xl h-[600px] overflow-y-scroll"
              :class="{ hidden: !notificationModal }"
            >
              <div class="flex justify-between w-[100%]">
                <p class="text-2xl">{{ $t("notifications") }}</p>
                <button class="underline" @click="markAllNotificationsAsRead">
                  {{ $t("mark_read") }}
                </button>
              </div>
              <div
                v-for="notification in notifications"
                :key="notification"
                class="flex justify-between mt-2 pt-5 px-5 w-full border-[1px] z-[100] border-[#6C757D80]/80 rounded-md cursor-pointer"
                @click="markNotificationAsRead(notification.notification)"
              >
                <div class="flex z-100">
                  <img
                    :src="notification.comingFrom.photo"
                    alt="user-photo"
                    class="w-[50px] h-[50px] rounded-full"
                  />
                  <div class="pl-5">
                    <p class="text-left">
                      {{ notification.comingFrom.username }}
                    </p>
                    <div v-if="notification.notification.type === `comment`">
                      <IconCommentNotification />
                      <p>{{ $t("commented") }}</p>
                    </div>
                    <div
                      v-if="notification.notification.type === `like`"
                      class="flex py-2"
                    >
                      <IconLikeNotification />
                      <p class="pl-2">{{ $t("liked") }}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p>
                    {{
                      timeDiff(
                        `${notification.notification["created_at"]}`,
                        locale
                      )
                    }}
                  </p>
                  <p
                    v-if="!notification.notification.read"
                    class="text-left text-lime-500"
                  >
                    New
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <LanguageButtons
            :drop-down="langDropDown"
            :toggle-drop-down="toggleLanguageDropdown"
            :close-drop-down="closeLanguageDropdown"
          />
        </div>
        <button
          id="logout"
          class="py-2 px-3 text-white border-white border-[1px] rounded-lg hidden md:block"
          @click="logOut"
        >
          {{ $t("log_out") }}
        </button>
      </div>
    </div>
    <div
      class="bg-gradient-to-r from-[#181623] to-[#0D0B14] text-white flex h-full overflow-y-scroll"
    >
      <!-- sidebar -->
      <div
        v-if="isLowRes"
        class="w-[20rem] bg-black pt-10 pl-10 absolute h-full md:h-screen md:sticky md:top-0 top-[5rem] z-[100] left-0 flex flex-col align-center"
      >
        <div class="flex items-center">
          <img
            :src="user.value.photo"
            alt=""
            class="rounded-full w-[50px] h-[50px]"
            :class="url === 'edit' ? 'border-[2px] border-red-500' : ''"
          />
          <div class="pl-5 flex flex-col items-start">
            <h2>{{ user.value.username }}</h2>
            <a id="edit-profile" class="text-left" href="edit">{{
              $t("edit_profile")
            }}</a>
          </div>
        </div>
        <a
          href="/main/feed"
          class="flex justify-between items-center pt-10 w-[150px]"
        >
          <IconHome :color="url === 'feed' ? 'red' : 'white'" />
          <p class="text-left w-[100px]">{{ $t("news_feed") }}</p>
        </a>
        <a
          id="movies-list"
          href="/main/movies"
          class="flex justify-between items-center pt-10 w-[150px]"
        >
          <IconFilm :color="url.includes('movies') ? 'red' : 'white'" />
          <p class="text-left w-[100px]">{{ $t("movie_list") }}</p>
        </a>
      </div>

      <!-- main -->
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </div>
</template>
