<script setup>
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";
import IconEmailSent from "./icons/IconEmailSent.vue";

const emailSent = ref(null);

onClickOutside(emailSent, () => {
  window.location.href = "/";
});
</script>

<template>
  <div
    class="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] w-[100vw] h-[100vh] max-w-[100%] z-10 backdrop-blur-sm flex justify-center items-center"
  >
    <div
      ref="emailSent"
      class="bg-[#222030] w-[600px] h-[400px] text-white flex flex-col items-center justify-evenly"
    >
      <IconEmailSent />
      <h1 class="text-3xl">Check your email</h1>
      <p>We have sent a password recover instructions to your email</p>
      <a href="/" class="w-[300px] p-3 bg-[#E31221] mt-3"> Go to my email </a>
      <a href="/" class="text-[#6C757D]">Skip, I’ll confirm later</a>
    </div>
  </div>
</template>
