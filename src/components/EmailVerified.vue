<script setup>
import { onClickOutside } from "@vueuse/core";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import userStore from "@/store/index";
import IconLoading from "@/components/icons/IconLoading.vue";
import axiosInstance from "@/config/axios";
import IconEmailVerified from "@/components/icons/IconEmailVerified.vue";

const emailVerifiedModal = ref(null);
const emailVerified = ref(false);
const loading = ref(true);
const route = useRoute();
const store = userStore();

onMounted(() => {
  if (route.params) {
    axiosInstance
      .get(`/api/email-verification/${route.params.token}`)
      .then((response) => {
        store.user = response.data.user;
        loading.value = false;
        emailVerified.value = true;
      });
  }
});

onClickOutside(emailVerifiedModal, () => {
  emailVerified.value = false;
  loading.value = false;
});
</script>

<template>
  <div
    v-if="emailVerified"
    class="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] w-[100vw] h-[100vh] max-w-[100%] z-10 backdrop-blur-sm flex justify-center items-center"
  >
    <div
      ref="emailVerifiedModal"
      class="bg-[#222030] w-[600px] h-[400px] text-white flex flex-col items-center justify-evenly"
    >
      <IconEmailVerified />
      <h1 class="text-3xl">Thank you!</h1>
      <p>Your account has been activated.</p>
      <a
        href="/main/feed"
        class="w-[300px] p-3 bg-[#E31221] mt-3 cursor-pointer"
      >
        Go To Feed
      </a>
    </div>
  </div>
  <div
    v-if="loading"
    class="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] w-[100vw] h-[100vh] max-w-[100%] z-10 backdrop-blur-sm flex justify-center items-center"
  >
    >
    <IconLoading />
  </div>
</template>
