<template>
  <div
    class="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] w-[100vw] h-[100vh] max-w-[100%] z-10 backdrop-blur-sm flex justify-center items-center"
  >
    <Form
      v-slot="{ meta }"
      class="bg-[#222030] w-[600px] h-[400px] text-white flex flex-col items-center"
    >
      <h1 class="text-3xl mt-[3rem]">Forgot Password?</h1>
      <p class="text-[16px] w-[300px] mt-5 text-[#6C757D]">
        Enter the email and we’ll send an email with instructions to reset your
        password
      </p>
      <div class="flex flex-col items-start mt-5">
        <label for="email">Email</label>
        <Field
          v-model="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          rules="required|email"
          class="py-2 px-5 w-[300px] text-black"
        />
        <ErrorMessage
          name="email"
          class="text-red-400 text-left w-[300px] h-[25px]"
        />
      </div>
      <button
        :disabled="!meta.valid"
        class="bg-[#E31221] w-[300px] py-3 mt-5 rounded-md disabled:opacity-40"
        @click="sendEmailReset"
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
import { ref } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import axiosInstance from "../config/axios/index.js";

const email = ref("");

function sendEmailReset(e) {
  e.preventDefault();
  console.log(email.value);
  axiosInstance
    .post("/api/forgot-password", {
      email: email.value,
    })
    .then((res) => {
      console.log(res);
    });
  window.location.href = "/password-reset-sent";
}
</script>
