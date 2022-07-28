<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { Form, Field, ErrorMessage } from "vee-validate";
import instance from "../config/axios/index";
import IconLoading from "../assets/icons/IconLoading.vue";
import userStore from "../store/index";
import { storeToRefs } from "pinia";

const modalRef = ref(null);
const loading = ref(false);
const store = userStore();
const { userErrors, user } = storeToRefs(store);

const props = defineProps({
  modal: Boolean,
  closeModal: Function,
});

function handleSubmit(values) {
  loading.value = true;
  userErrors.value = {};
  instance
    .post("/api/login", values)
    .then((res) => {
      if (res.data.status === "success") {
        localStorage.token = "";
        localStorage.token = res.data.token;
        console.log(res.data.user);
        user.value = res.data.user;
        window.location.href = "/main/feed";
        props.closeModal();
      }
    })
    .catch((err) => {
      userErrors.value =
        Object.keys(err.response.data.error).length > 0
          ? err.response.data.error
          : [];
      loading.value = false;
    });
}
onClickOutside(modalRef, () => {
  props.closeModal();
});

const googleCallback = () => {
  instance.get("/auth/google/redirect").then((response) => {
    window.location.href = response.data.url;
  });
};
</script>

<template>
  <pre class="text-white">{{ userErrors }}</pre>
  <div
    v-if="modal"
    class="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] w-[100vw] h-[100vh] max-w-[100%] z-10 backdrop-blur-sm flex justify-center items-center"
  >
    <div role="status" v-if="loading">
      <IconLoading />
    </div>
    <div
      v-else
      ref="modalRef"
      class="bg-[#222030] w-[600px] text-white flex flex-col items-center"
    >
      <Form v-slot="{ values, meta }" @submit.prevent="closeModal">
        <h1 class="py-6 text-2xl">{{ $t("log_to_account") }}</h1>
        <p class="text-[#6C757D] w-[300px]">{{ $t("welcome_back") }}</p>
        <div class="flex justify-center flex-col items-center py-3">
          <div class="flex w-[300px]">
            <label class="text-left" for="username">{{ $t("email") }}</label>
            <p class="text-red-400">*</p>
          </div>
          <Field
            type="username"
            name="username"
            rules="required"
            placeholder="Enter your username or email"
            class="py-2 pl-4 rounded-sm w-[300px] text-[#6C757D]"
          />
          <div v-if="userErrors">
            <div
              v-for="error in userErrors[`username`]"
              :key="error"
              class="text-red-400 text-left w-[300px] h-[25px]"
            >
              {{ error }}
            </div>
          </div>
          <ErrorMessage
            name="username"
            class="text-red-400 text-left w-[300px] h-[25px]"
          />
        </div>
        <div class="flex justify-center flex-col items-center py-3">
          <div class="flex w-[300px]">
            <label class="text-left" for="password">{{ $t("password") }}</label>
            <p class="text-red-400">*</p>
          </div>
          <Field
            type="password"
            name="password"
            rules="required"
            placeholder="Enter your password"
            class="py-2 pl-4 rounded-sm w-[300px] text-[#6C757D]"
          />
          <div v-if="userErrors">
            <div
              v-for="error in userErrors[`username`]"
              :key="error"
              class="text-red-400 text-left w-[300px] h-[25px]"
            >
              {{ error }}
            </div>
          </div>
          <ErrorMessage
            name="password"
            class="text-red-400 text-left w-[300px] h-[25px]"
          />
        </div>
        <div>
          <div class="flex w-[300px] items-center">
            <Field name="remember" type="checkbox" value="true" />
            <label class="h-[17px] ml-2" for="remember">{{
              $t("remember_me")
            }}</label>
          </div>
        </div>
        <button
          :disabled="!meta.valid"
          :class="!meta.valid ? `text- gray - 700` : `text - white`"
          class="w-[300px] p-3 bg-[#E31221] mt-3"
          @click="handleSubmit(values)"
        >
          {{ $t("log_in") }}
        </button>
      </Form>
      <button
        @click="googleCallback"
        style="display: flex"
        class="flex w-[300px] p-3 border border-1-white mt-3 mb-10 items-center justify-center"
      >
        <img src="../assets/logos/google.png" alt="google-logo" class="pr-3" />
        <div>{{ $t("google_auth") }}</div>
      </button>
    </div>
  </div>
</template>
