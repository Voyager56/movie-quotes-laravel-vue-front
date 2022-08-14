<script setup>
import IconEmailVerified from "./icons/IconEmailVerified.vue";
</script>

<template>
  <div
    class="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] w-[100vw] h-[100vh] max-w-[100%] z-10 backdrop-blur-sm flex justify-center items-center"
  >
    <div
      class="bg-[#222030] w-[600px] h-[400px] text-white flex flex-col items-center justify-evenly"
    >
      <IconEmailVerified />
      <h1 class="text-3xl">Success</h1>
      <p>Your Password changed successfully</p>
      <a
        href="/main/feed"
        class="w-[300px] p-3 bg-[#E31221] mt-3 cursor-pointer"
      >
        Go To Feed
      </a>
    </div>
  </div>
</template>
