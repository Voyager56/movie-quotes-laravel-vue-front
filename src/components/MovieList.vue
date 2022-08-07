<template>
  <div class="w-full mr-[5rem]">
    <div class="flex justify-between items-center">
      <p>{{ $t("my_list") }} [{{ $t("total") }} {{ movies.length }}]</p>
      <div class="flex items-center">
        <p class="ml-2 flex mx-5 w-[75px] justify-between">
          <IconSearch /> Search
        </p>
        <button
          class="bg-red-500 px-2 py-3 rounded-sm flex items-center justify-between w-[120px]"
          @click="openAddMovieModal"
        >
          <IconPlus /> Add Movie
        </button>
      </div>
    </div>
    <div class="flex flex-wrap">
      <div v-for="movie in movies" :key="movie.id">
        <a :href="`/main/movies/` + movie.id" class="flex flex-col">
          <img
            :src="movie.thumbnail"
            alt="movie-thumbnail"
            class="rounded-xl"
          />
          <div class="flex pt-5 text-2xl">
            <p>{{ movie.title[locale] }}</p>
            <p class="pl-3">({{ movie.release_year }})</p>
          </div>
          <div class="flex text-xl">
            <p class="mr-3">{{ movie.quotes.length }}</p>
            <IconCommentNotificationVue />
          </div>
        </a>
      </div>
    </div>
  </div>
  <AddMovieModal :modal="addMovie" :closeModal="closeMovieModal" />
</template>

<script setup>
import IconSearch from "../assets/icons/IconSearch.vue";
import IconPlus from "../assets/icons/IconPlus.vue";
import IconCommentNotificationVue from "../assets/icons/IconCommentNotification.vue";
import AddMovieModal from "./AddMovieModal.vue";
import { onMounted, ref } from "vue";
import instance from "../config/axios/index";
import { useI18n } from "vue-i18n";

const { locale } = useI18n({ useScope: "global" });

const movies = ref([]);
const addMovie = ref(false);

function openAddMovieModal() {
  addMovie.value = true;
}
function closeMovieModal() {
  addMovie.value = false;
}

onMounted(() => {
  instance.get("api/movies").then((res) => {
    movies.value = res.data;
    console.log(movies.value);
  });
  document.body.style.overflow = "hidden";
});
</script>
