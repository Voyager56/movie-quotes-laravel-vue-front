<template>
  <div v-if="!movie"><IconLoading /></div>
  <div v-else class="flex flex-col md:px-10 md:py-10 md:w-fit">
    <div class="self-start text-2xl hidden md:block">Movie Description</div>

    <div class="mt-10">
      <div class="flex flex-col md:flex-row items-center justify-center">
        <img
          :src="movie.thumbnail"
          alt="movie-thumbnail"
          class="w-[70%] md:w-[809px] md:h-[441px] rounded-xl"
        />
        <div class="flex flex-col text-2xl ml-10 justify-start items-start">
          <div class="flex items-center flex-col md:flex-row">
            <p class="text-[#DDCCAA] text-left">
              {{ movie.title[locale] }} ({{ movie.release_year }})
            </p>
            <div
              class="ml-[200px] flex bg-[#24222F] px-4 py-2 rounded-md items-center"
            >
              <a :href="`/main/movies/edit/movie/${movie.id}`">
                <IconPen />
              </a>
              <div class="text-2xl mx-5 text-gray-400">|</div>
              <button @click="deleteMovie">
                <IconBin />
              </button>
            </div>
          </div>
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
            <p class="mt-3 text-left">{{ movie.description[locale] }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-start mt-10">
      <div class="flex">
        <p class="text-xl">
          {{ $t("quotes") }} ({{ $t("total") }} {{ movie.quotes.length }})
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
        v-for="quote in movie.quotes"
        :key="quote.id"
        class="bg-[#24222F] mx-5 px-10 py-5 rounded-md w-[60%] md:w-[700px] mt-[5rem]"
      >
        <QuoteCard :quote="quote" />
      </div>
    </div>
  </div>
  <AddQuote
    :modal="addQuoteModal"
    :movies="[movie]"
    :close-modal="closeQuoteModal"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "../config/axios";
import { useI18n } from "vue-i18n";
import IconLoading from "./icons/IconLoading.vue";
import IconPlus from "./icons/IconPlus.vue";
import AddQuote from "./AddQuote.vue";
import QuoteCard from "./QuoteCard.vue";
import IconBin from "./icons/IconBin.vue";
import IconPen from "./icons/IconPen.vue";

const { locale } = useI18n({ useScope: "global" });
const route = useRoute();
const movie = ref(null);
const addQuoteModal = ref(false);

function openQuoteModal() {
  addQuoteModal.value = true;
}

function closeQuoteModal() {
  addQuoteModal.value = false;
}

onMounted(() => {
  axiosInstance.get(`/api/movies/${route.params.id}`).then((res) => {
    movie.value = res.data.movie;
  });
});

function deleteMovie(e) {
  e.preventDefault();
  axiosInstance.delete(`/api/movies/${route.params.id}`).then(() => {
    window.location.href = "/main/movies/";
  });
}
</script>
