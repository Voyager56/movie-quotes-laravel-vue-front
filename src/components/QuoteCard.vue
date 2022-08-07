<template>
  <div
    class="flex py-6 border-b-2 border-[#EFEFEF33]/20 w-full justify-between items-center"
  >
    <img
      :src="quote.thumbnail"
      alt="quote thumbnail"
      class="w-[100px] h-[100px]"
    />
    <p class="mx-5 text-2xl break-words w-[400px]">
      "{{ quote.text[locale] }}"
    </p>
    <button class="self-start text-2xl" @click="openQuoteEdit">...</button>
  </div>
  <div class="flex mr-3 my-5">
    <div class="flex">
      <p class="mr-3">{{ quote.comments.length }}</p>
      <IconComment />
    </div>
    <div class="flex ml-3">
      <p class="mr-3">{{ quote.likes.length }}</p>
      <IconLike />
    </div>
  </div>
</template>

<script setup>
import IconComment from "../assets/icons/IconComment.vue";
import IconLike from "../assets/icons/IconLike.vue";
import { useI18n } from "vue-i18n";
import { ref } from "vue";

const { locale } = useI18n({ useScope: "global" });
const editQuote = ref(null);

function openQuoteEdit() {
  editQuote.value = true;
}

function closeQuoteEdit() {
  editQuote.value = null;
}

defineProps({
  quote: {
    type: Object,
    required: true,
  },
});
</script>
