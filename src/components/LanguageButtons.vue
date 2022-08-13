<script setup>
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";
import IconArrow from "./icons/IconArrow.vue";
import { setLocale } from "@vee-validate/i18n";
import { useI18n } from "vue-i18n";

const dropDownRef = ref(null);
const { locale } = useI18n({ useScope: "global" });

const updateLanguage = async (lang) => {
  locale.value = lang;
  setLocale(locale.value);
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
    <button id="lang-dropdown" ref="dropDownRef" class="text-white capitalize">
      {{ locale }}
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
      <button id="en" class="dropdown-item" @click="updateLanguage('en')">
        English
      </button>
      <button id="ka" class="dropdown-item" @click="updateLanguage('ka')">
        ქართული
      </button>
    </div>
  </div>
</template>
