<template>
  <div
    class="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] w-[100vw] h-[100vh] max-w-[100%] z-10 backdrop-blur-sm flex justify-center items-center"
  >
    <Form
      v-slot="{ meta, values }"
      class="bg-[#222030] w-[600px] h-[450px] text-white flex flex-col items-center"
    >
      <h1 class="text-3xl mt-[3rem]">Forgot Password?</h1>
      <p class="text-[16px] w-[300px] mt-5 text-[#6C757D]">
        Enter the email and we’ll send an email with instructions to reset your
        password
      </p>
      <div class="flex flex-col items-start mt-5">
        <label for="email">Password</label>
        <Field
          type="password"
          name="password"
          placeholder="Enter your password"
          rules="required|min:6"
          class="py-2 px-5 w-[300px] text-black"
        />
        <ErrorMessage
          name="password"
          class="text-red-400 text-left w-[300px] h-[25px]"
        />
      </div>
      <div class="flex flex-col items-start mt-5">
        <label for="email">Confirm PAssword</label>
        <Field
          type="password"
          name="password confirmation"
          placeholder="Confirm your password"
          rules="required|min:6|confirmed:password"
          class="py-2 px-5 w-[300px] text-black"
        />
        <ErrorMessage
          name="password confirmation"
          class="text-red-400 text-left w-[300px] h-[25px]"
        />
      </div>
      <button
        :disabled="!meta.valid"
        class="bg-[#E31221] w-[300px] py-3 mt-5 rounded-md disabled:opacity-40"
        @click="sendEmailReset($event, values)"
      >
        Send Instructions
      </button>
      <a href="/" class="text-xl flex items-center mt-3"
        ><p class="text-3xl pb-2">←</p>
        back to login</a
      >
    </Form>
  </div>
</template>

<script setup>
import { Field, Form, ErrorMessage } from "vee-validate";
import { onMounted, ref } from "vue";
import axiosInstance from "@/config/axios/index.js";
import { useRoute } from "vue-router";

const token = ref("");
const route = useRoute();

onMounted(() => {
  token.value = route.params.token;
});

function sendEmailReset(e, values) {
  e.preventDefault();
  axiosInstance
    .post("/api/reset-password/" + token.value, {
      password: values["password"],
      password_confirmation: values["password confirmation"],
    })
    .then((res) => {
      if (res.status === 200) {
        localStorage.token = res.data.token;
        window.location.href = "/password-reset-success";
      }
    })
    .catch((res) => console.log(res.status));
}
</script>
