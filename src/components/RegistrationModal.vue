<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { Form, Field, ErrorMessage } from "vee-validate";
import axiosInstance from "../config/axios/index";
import IconLoading from "./icons/IconLoading.vue";
import userStore from "../store/index";
import { storeToRefs } from "pinia";
import IconGoogle from "./icons/IconGoogle.vue";

const modalRef = ref(null);
const loading = ref(false);
const store = userStore();
const { userErrors } = storeToRefs(store);

const props = defineProps({
  modal: Boolean,
  closeModal: Function,
  epenEmailSent: Function,
  openLogin: Function,
});

function toggleLoginModal() {
  props.openLogin();
  props.closeModal();
}

async function handleSubmit(data) {
  loading.value = true;
  userErrors.value = {};
  axiosInstance
    .post("/api/register", {
      username: data.username,
      email: data.email,
      password: data.password,
      password_confirmation: data["confirm password"],
    })

    .then(() => {
      props.epenEmailSent();
      props.closeModal();
    })
    .catch((err) => {
      userErrors.value =
        Object.keys(err.response.data.errors).length > 0
          ? err.response.data.errors
          : [];
      loading.value = false;
    });
}
onClickOutside(modalRef, () => {
  props.closeModal();
});

const googleCallback = () => {
  axiosInstance.get("/auth/google/redirect").then((response) => {
    window.location.href = response.data.url;
  });
};
</script>

<template>
  <div
    v-if="modal"
    class="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] w-[100vw] h-[100vh] max-w-[100%] z-10 backdrop-blur-sm flex justify-center items-center"
  >
    <div v-if="loading" role="status">
      <IconLoading />
    </div>
    <div
      v-else
      ref="modalRef"
      class="bg-[#222030] w-[600px] text-white flex flex-col items-center"
    >
      <Form v-slot="{ values, meta }" @submit.prevent="closeModal">
        <h1 class="py-6 text-2xl">{{ $t("create_account") }}</h1>
        <p class="text-[#6C757D]">{{ $t("start_journey") }}</p>
        <div class="flex justify-center flex-col items-center py-3">
          <div class="flex w-[300px]">
            <label class="text-left" for="username">{{ $t("name") }}</label>
            <p class="text-red-400">*</p>
          </div>
          <Field
            id="username"
            type="username"
            name="username"
            rules="required|min:3|max:15"
            placeholder="At least 3 & max.15 lower case characters"
            class="py-2 pl-4 rounded-sm w-[300px] text-[#6C757D]"
          />
          <div v-if="userErrors">
            <div
              v-for="error in userErrors[`username`]"
              :key="error"
              class="text-red-400 text-left w-[300px] h-[25px]"
            >
              {{ $t(`${error}`) }}
            </div>
          </div>
          <ErrorMessage
            name="username"
            class="text-red-400 text-left w-[300px] h-[25px]"
          />
        </div>
        <div class="flex justify-center flex-col items-center py-3">
          <div class="flex w-[300px]">
            <label class="text-left" for="email">{{ $t("email") }}</label>
            <p class="text-red-400">*</p>
          </div>
          <Field
            id="email"
            type="email"
            name="email"
            rules="required|email"
            placeholder="Enter your email"
            class="py-2 pl-4 rounded-sm w-[300px] text-[#6C757D]"
          />
          <div v-if="userErrors">
            <div
              v-for="error in userErrors[`email`]"
              :key="error"
              class="text-red-400 text-left w-[300px] h-[25px]"
            >
              {{ $t(`${error}`) }}
            </div>
          </div>
          <ErrorMessage
            name="email"
            class="text-red-400 text-left w-[300px] h-[25px]"
          />
        </div>
        <div class="flex justify-center flex-col items-center py-3">
          <div class="flex w-[300px]">
            <label class="text-left" for="password">{{ $t("password") }}</label>
            <p class="text-red-400">*</p>
          </div>
          <Field
            id="password"
            type="password"
            name="password"
            rules="required|min:8|max:15"
            placeholder="At least 8 & max.15 lower case characters"
            class="py-2 pl-4 rounded-sm w-[300px] text-[#6C757D]"
          />
          <div v-if="userErrors">
            <div
              v-for="error in userErrors[`password`]"
              :key="error"
              class="text-red-400 text-left w-[300px] h-[25px]"
            >
              {{ $t(`${error}`) }}
            </div>
          </div>
          <ErrorMessage
            name="password"
            class="text-red-400 text-left w-[300px] h-[25px]"
          />
        </div>
        <div class="flex justify-center flex-col items-center py-3">
          <div class="flex w-[300px]">
            <label class="text-left" for="confirm password">{{
              $t("confirm_password")
            }}</label>
            <p class="text-red-400">*</p>
          </div>
          <Field
            id="confirm-password"
            type="password"
            name="confirm password"
            rules="confirmed:@password"
            placeholder="Confirm password"
            class="py-2 pl-4 rounded-sm w-[300px] text-[#6C757D]"
          />
          <div v-if="userErrors">
            <div
              v-for="error in userErrors[`confirm password`]"
              :key="error"
              class="text-red-400 text-left w-[300px] h-[25px]"
            >
              {{ $t(`${error}`) }}
            </div>
          </div>
          <ErrorMessage
            name="confirm password"
            class="text-red-400 text-left w-[300px] h-[25px]"
          />
        </div>
        <button
          id="signup"
          :disabled="!meta.valid"
          :class="!meta.valid ? `text- gray - 700` : `text - white`"
          class="w-[300px] p-3 bg-[#E31221] mt-3"
          @click="handleSubmit(values)"
        >
          {{ $t("started") }}
        </button>
      </Form>
      <button
        class="flex w-[300px] p-3 border border-1-white mt-3 mb-10 items-center justify-center"
        style="display: flex"
        @click="googleCallback"
      >
        <div class="pr-3">
          <IconGoogle />
        </div>
        <div>{{ $t("google_auth") }}</div>
      </button>
      <div class="flex mb-5">
        {{ $t("already_have_account") }}
        <button class="underline text-blue-600 mx-2" @click="toggleLoginModal">
          {{ $t("log_in") }}
        </button>
      </div>
    </div>
  </div>
</template>
