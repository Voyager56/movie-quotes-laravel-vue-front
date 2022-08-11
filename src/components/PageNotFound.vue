<template>
  <div
    class="bg-[#181623] w-full h-screen flex justify-center items-center flex-col text-white"
  >
    <div class="flex flex-col justify-between items-between h-[200px] mb-5">
      <IconGhost />
      <IconElipse />
    </div>
    <p class="text-3xl">Whoops!</p>
    <p class="my-5">We can't see the page you are looking for</p>
    <a href="/" class="bg-[#E31221] px-5 py-2 rounded-md">Return Home</a>
  </div>
</template>

<script setup>
import IconGhost from "../assets/icons/IconGhost.vue";
import IconElipse from "../assets/icons/IconElipse.vue";
</script>
