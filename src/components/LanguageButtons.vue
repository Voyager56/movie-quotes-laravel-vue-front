<script setup>
import { storeToRefs } from "pinia";
import instance from "../config/axios/index";
import userStore from "../store/index";
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";
import IconArrow from "./icons/IconArrow.vue";
import { setLocale } from "@vee-validate/i18n";

const store = userStore();
const { language } = storeToRefs(store);
const dropDownRef = ref(null);

const updateLanguage = async (lang) => {
  const locale = lang === "Eng" ? "en" : "ka";
  setLocale(locale);
  language.value = lang;
  await instance.get(`/api/locale/${locale}`, {
    params: {
      lang: locale,
    },
  });
  props.closeDropDown();
};

onClickOutside(dropDownRef, () => {
  props.closeDropDown();
});

const props = defineProps({
  toggleDropDown: Function,
  closeDropDown: Function,
  dropDown: Boolean,
});

const toggle = () => {
  return props.dropdown ? props.closeDropDown() : props.toggleDropDown();
};
</script>

<template>
  <div class="flex items-center relative cursor-pointer z-10" @click="toggle">
    <button ref="dropDownRef" class="text-white">
      {{ language }}
    </button>
    <IconArrow
      class="pl-2 w-5 transition-transform p-0"
      :class="
        dropDown
          ? `rotate-0 `
          : `rotate-90 absolute top-[4px] right-[-20px] w-5`
      "
    />
    <div
      class="absolute bg-red-500 top-[30px] text-white left-[-40px] h-[100px] flex flex-col justify-evenly px-5 rounded-xl"
      :class="{ hidden: !dropDown }"
    >
      <button class="dropdown-item" @click="updateLanguage('Eng')">
        English
      </button>
      <button class="dropdown-item" @click="updateLanguage('Geo')">
        ქართული
      </button>
    </div>
  </div>
</template>
