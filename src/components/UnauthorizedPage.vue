<template>
  <div
    class="bg-[#181623] w-full h-screen flex justify-center items-center flex-col text-white"
  >
    <div class="relative">
      <div
        class="bg-white h-[100px] w-[200px] rounded-[100px/50px] absolute left-[40px] top-[40px] rotate-45 mt-[10px] mb-[-10px]"
      ></div>
      <div
        class="bg-white h-[100px] w-[200px] rounded-[100px/50px] absolute left-[-40px] top-[40px] -rotate-45 mt-[10px] mb-[-10px]"
      ></div>
      <div class="z-[100] relative left-[-5px] top-[-25px]">
        <IconGendalf />
      </div>
    </div>
    <p class="text-3xl">You shall not pass!</p>
    <p class="my-5">Sorry, but you don’t have permission to access this page</p>
    <a href="/" class="bg-[#E31221] px-5 py-2 rounded-md">Return Home</a>
  </div>
</template>

<script setup>
import IconGendalf from "../assets/icons/IconGendalf.vue";
</script>
