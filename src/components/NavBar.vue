<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import instance from "../config/axios/index"

const dropDownRef = ref(null);


const props = defineProps({
  toggleDropDown: Function,
  changeLanguage: Function,
  toggleRegistration: Function,
  toggleLogin: Function,
  closeDropDown: Function,
  lang: String,
  dropDown: Boolean,
});
const updateLanguage = async (lang) => {
  const locale = lang === "Eng" ? "en" : "ka";
  props.changeLanguage(lang);
  await instance.get(`/api/locale/${locale}`);
}

onClickOutside(dropDownRef, () => {
  props.closeDropDown();
});
</script>

<template>
  <div class="flex justify-between py-5 px-10">
    <p class="text-[#DDCCAA] text-2xl">MOVIE QUOTES</p>
    <div class="flex justify-evenly w-[400px] items-center">
      <div class="flex relative">
        <button ref="dropDownRef" @click="toggleDropDown" class="text-white">
          {{ lang }}
        </button>
        <div class="absolute bg-red-500 top-[30px] left-[-40px] h-[100px] flex flex-col justify-evenly px-5 rounded-xl"
          :class="{ hidden: !dropDown }">
          <button class="dropdown-item" @click="updateLanguage('Eng')">
            English
          </button>
          <button class="dropdown-item" @click="updateLanguage('Geo')">
            ქართული
          </button>
        </div>
      </div>
      <button @click="toggleRegistration" class="bg-red-500 py-2 px-4 rounded-md">Sign Up</button>
      <button @click="toggleLogin" class="border border-1-white py-2 px-4 rounded-md">Log In</button>
    </div>
  </div>
  <div class="flex flex-col items-center justify-center h-[80vh] bg-black">
    <h1 class="text-5xl text-[#DDCCAA]">
      Find any quote in millions of movie lines
    </h1>
    <button @click="toggleRegistration"
      class="bg-red-500 py-2 px-4 rounded-md w-40 mt-10 hover:motion-safe:animate-bounce">
      Get Started
    </button>
  </div>
</template>
