<script setup>
import LanguageButtons from "./LanguageButtons.vue";

defineProps({
  toggleDropDown: Function,
  toggleRegistration: Function,
  toggleLogin: Function,
  closeDropDown: Function,
  dropDown: Boolean,
});
</script>

<template>
  <div class="flex justify-between py-5 px-10">
    <p class="text-[#DDCCAA] text-2xl">MOVIE QUOTES</p>
    <div class="flex justify-evenly w-[400px] items-center">
      <LanguageButtons
        :drop-down="dropDown"
        :toggle-drop-down="toggleDropDown"
        :close-drop-down="closeDropDown"
      />
      <button
        class="bg-red-500 py-2 px-4 rounded-md"
        @click="toggleRegistration"
      >
        {{ $t("sign_up") }}
      </button>
      <button
        class="border border-1-white py-2 px-4 rounded-md"
        @click="toggleLogin"
      >
        {{ $t("log_in") }}
      </button>
    </div>
  </div>
  <div class="flex flex-col items-center justify-center h-[80vh] bg-black">
    <h1 class="text-5xl text-[#DDCCAA]">
      Find any quote in millions of movie lines
    </h1>
    <button
      class="bg-red-500 py-2 px-4 rounded-md w-40 mt-10 hover:motion-safe:animate-bounce"
      @click="toggleRegistration"
    >
      {{ $t("started") }}
    </button>
  </div>
</template>
