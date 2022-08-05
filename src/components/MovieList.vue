<template>
  <div class="w-full mr-[5rem]">
    <div class="flex justify-between items-center">
      <p>My List Of Movies (Total 25)</p>
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
  </div>
  <AddMovieModal :modal="addMovie" :closeModal="closeMovieModal" />
</template>

<script setup>
import IconSearch from "../assets/icons/IconSearch.vue";
import IconPlus from "../assets/icons/IconPlus.vue";
import AddMovieModal from "./AddMovieModal.vue";
import { onMounted, ref } from "vue";
import instance from "../config/axios/index";

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
    console.log(movies);
  });
  document.body.style.overflow = "hidden";
});
</script>
