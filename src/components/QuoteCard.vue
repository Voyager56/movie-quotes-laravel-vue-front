<template>
  <div
    class="flex py-6 border-b-2 border-[#EFEFEF33]/20 w-full justify-between items-center relative"
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
    <div
      v-if="editQuote"
      ref="editQuoteRef"
      class="flex flex-col absolute right-[-150px] top-10 bg-[#212730] p-5 rounded-md"
    >
      <a
        :href="`/main/movies/quote/` + quote.id"
        class="flex items-center my-2"
      >
        <IconEye />
        <p class="ml-2">View Post</p>
      </a>
      <a
        :href="`/main/movies/edit/quote/${quote.id}`"
        class="flex items-center my-2"
      >
        <IconPen />
        <p class="ml-2">Edit</p>
      </a>
      <button class="flex items-center my-2" @click="deleteQuote(quote.id)">
        <IconBin />
        <p class="ml-2">Delete</p>
      </button>
    </div>
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
import IconEye from "../assets/icons/IconEye.vue";
import { onClickOutside } from "@vueuse/core";
import IconBin from "../assets/icons/IconBin.vue";
import IconPen from "../assets/icons/IconPen.vue";
import axiosInstance from "../config/axios";

const { locale } = useI18n({ useScope: "global" });
const editQuote = ref(null);
const editQuoteRef = ref(null);

function openQuoteEdit() {
  editQuote.value = true;
}

function deleteQuote(id) {
  axiosInstance.delete(`/api/quotes/delete/${id}`).then(() => {
    window.location.reload();
  });
}

onClickOutside(editQuoteRef, () => {
  editQuote.value = false;
});

defineProps({
  quote: {
    type: Object,
    required: true,
  },
});
</script>
