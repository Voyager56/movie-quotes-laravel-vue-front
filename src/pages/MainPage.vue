<script setup>
import { ref, onMounted, watch } from "vue";
import IconBell from "../components/icons/IconBell.vue";
import LanguageButtons from "../components/LanguageButtons.vue";
import IconHome from "../components/icons/IconHome.vue";
import IconFilm from "../components/icons/IconFilm.vue";
import userStore from "../store/index";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import instance from "../config/axios/index";
import { onClickOutside } from "@vueuse/core";
import IconCommentNotification from "../components/icons/IconCommentNotification.vue";
import IconLikeNotification from "../components/icons/IconLikeNotification.vue";
import timeDiff from "time-diff-for-humans";

const url = ref("feed");
const router = useRouter();
const store = userStore();
const { user } = storeToRefs(store);
const langDropDown = ref(false);
const notifications = ref([]);
const notificationModal = ref(false);
const notificationModalRef = ref(null);
const element = ref(null);

onMounted(() => {
  const route = useRoute();
  url.value = route.path.split("/main/")[1];

  instance
    .get("/api/notifications")
    .then((res) => {
      notifications.value = res.data.reverse();
    })
    .catch((err) => {
      console.log(err);
    });
});

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
  instance
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
  instance
    .post(`/api/notifications/${notification.id}`)
    .then(() => {
      notification.read = true;
    })
    .catch((err) => {
      console.log(err);
    });
}

function logOut() {
  instance
    .post("api/logout")
    .then(() => {
      localStorage.token = null;
      store.setUser(null);
      console.log(localStorage.token);
      router.go("/");
    })
    .catch((e) => console.log(e));
}
</script>

<template>
  <!-- navbar -->
  <div ref="element">
    <div
      class="bg-[#22203033]/100 h-[5rem] flex items-center justify-between px-0 md:px-20"
    >
      <a href="/main/feed" class="text-[#DDCCAA] text-2xl">MOVIE QUOTES</a>
      <div class="flex justify-between w-[300px] items-center">
        <div>
          <button @click="toggle" class="relative">
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
            class="bg-[#22203033]/70 left-0 right-0 top-[5rem] bottom-0 absolute z-10 backdrop-blur-sm"
          >
            <div
              ref="notificationModalRef"
              class="absolute bg-[#000000] text-white right-[100px] max-h-[600px] pb-5 top-[0px] w-[500px] flex flex-col items-start px-5 rounded-xl h-[600px] overflow-y-scroll"
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
                class="flex justify-between mt-2 pt-5 px-5 w-full border-[1px] border-[#6C757D80]/80 rounded-md cursor-pointer"
                @click="markNotificationAsRead(notification.notification)"
              >
                <div class="flex">
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
                    {{ timeDiff(`${notification.notification["created_at"]}`) }}
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
        <LanguageButtons
          :dropDown="langDropDown"
          :toggleDropDown="toggleLanguageDropdown"
          :closeDropDown="closeLanguageDropdown"
        />
        <button
          @click="logOut"
          class="py-2 px-3 text-white border-white border-[1px] rounded-lg"
        >
          {{ $t("log_out") }}
        </button>
      </div>
    </div>
    <div
      class="bg-gradient-to-r from-[#181623] to-[#0D0B14] pt-10 pl-10 text-white flex"
    >
      <!-- sidebar -->
      <div class="w-[20rem] flex flex-col align-center h-[100vh]">
        <div class="flex items-center">
          <img
            :src="user.value.photo"
            alt=""
            class="rounded-full w-[50px] h-[50px]"
            :class="url === 'profile' ? 'border-[2px] border-red-500' : ''"
          />
          <div class="pl-5 flex flex-col items-start">
            <h2>{{ user.value.username }}</h2>
            <a href="edit">{{ $t("edit_profile") }}</a>
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
          href="/main/movies"
          class="flex justify-between items-center pt-10 w-[150px]"
        >
          <IconFilm :color="url === 'movies' ? 'red' : 'white'" />
          <p class="text-left w-[100px]">{{ $t("movie_list") }}</p>
        </a>
      </div>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </div>
</template>
