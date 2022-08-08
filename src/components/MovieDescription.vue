<template>
  <div v-if="!movie"><IconLoading /></div>
  <div v-else class="flex flex-col">
    <div class="self-start text-2xl">Movie Description</div>

    <div class="mt-10">
      <div class="flex">
        <img
          :src="movie.thumbnail"
          alt="movie-thumbnail"
          class="w-[809px] h-[441px] rounded-xl"
        />
        <div class="flex flex-col text-2xl ml-10 justify-start items-start">
          <p class="text-[#DDCCAA]">
            {{ movie.title[locale] }} ({{ movie.release_year }})
          </p>
          <div class="flex pt-2">
            <div
              v-for="genre in movie.genres"
              :key="genre.id"
              class="bg-gray-400 mr-2 rounded-md p-1 text-xl"
            >
              {{ genre.name }}
            </div>
          </div>
          <div class="ml-3 flex flex-col items-start mt-10">
            <p class="mt-3">
              {{ $t("director") }}: {{ movie.director[locale] }}
            </p>
            <p class="mt-3">{{ $t("budget") }}: {{ movie.budget }}</p>
            <p class="mt-3">{{ movie.description[locale] }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-start mt-10">
      <div class="flex">
        <p class="text-xl">
          {{ $t("quotes") }} ({{ $t("total") }} {{ quotes.length }})
        </p>
        <p class="text-3xl text-[#6C757D] mt-[-5px] mx-2">|</p>
        <button
          class="bg-red-500 px-2 py-2 rounded-sm flex items-center justify-between w-[120px]"
          @click="openQuoteModal"
        >
          <IconPlus /> {{ $t("add_quote") }}
        </button>
      </div>
      <div
        v-for="quote in quotes"
        :key="quote.id"
        class="bg-[#24222F] mx-5 px-10 py-5 rounded-md w-[700px] mt-[5rem]"
      >
        <QuoteCard :quote="quote" />
      </div>
    </div>
  </div>
  <AddQuote
    :modal="addQuoteModal"
    :movies="[movie]"
    :closeModal="closeQuoteModal"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import instance from "../config/axios";
import { useI18n } from "vue-i18n";
import IconLoading from "../assets/icons/IconLoading.vue";
import IconPlus from "../assets/icons/IconPlus.vue";
import AddQuote from "./AddQuote.vue";

import QuoteCard from "./QuoteCard.vue";

const { locale } = useI18n({ useScope: "global" });
const route = useRoute();
const movie = ref(null);
const quotes = ref([]);
const addQuoteModal = ref(false);

function closeQuoteModal() {
  addQuoteModal.value = false;
}

function openQuoteModal() {
  addQuoteModal.value = true;
}

onMounted(() => {
  instance.get(`/api/movies/${route.params.id}`).then((res) => {
    movie.value = res.data.movie;
    quotes.value = res.data.quotes;
  });
});
</script>
