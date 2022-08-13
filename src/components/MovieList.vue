<template>
  <div class="w-full h-screen md:h-full mr-[5rem]">
    <div class="flex justify-between items-center pt-5 pl-10">
      <p id="my-movie-list">
        {{ $t("my_list") }} [{{ $t("total") }} {{ movies.length }}]
      </p>
      <div class="flex items-center">
        <div
          class="md:relative my-[4px] mx-[2px] h-[50px] w-[50px] align-bottom flex items-center ml-10 absolute right-[60px] top-[10px]"
        >
          <input
            id="movie-search-input"
            class="search expandright"
            type="search"
            name="search"
            placeholder="Search Movies"
            @keyup.enter="searchDB"
          />
          <label
            id="open-search"
            class="searchbutton flex justify-between items-center right-0 h-fit"
            for="movie-search-input"
          >
            <IconSearch />
            <p class="mx-10 w-[100px] text-xl hidden md:block">
              {{ $t("search") }}
            </p>
          </label>
        </div>
        <button
          id="add-movie-modal"
          class="bg-red-500 px-2 py-3 rounded-sm md:flex items-center justify-between w-[120px] hidden"
          @click="openAddMovieModal"
        >
          <IconPlus /> Add Movie
        </button>
      </div>
    </div>
    <div class="flex flex-wrap mt-5 h-[600px]">
      <div v-for="movie in movies" :key="movie.id" class="h-full">
        <a
          id="movie-element"
          :href="`/main/movies/` + movie.id"
          class="flex flex-col pl-10"
        >
          <img
            :src="movie.thumbnail"
            alt="movie-thumbnail"
            class="rounded-xl w-[400px] h-[400px]"
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
  <AddMovieModal :modal="addMovie" :close-modal="closeMovieModal" />
</template>

<script setup>
import IconSearch from "./icons/IconSearch.vue";
import IconPlus from "./icons/IconPlus.vue";
import IconCommentNotificationVue from "./icons/IconCommentNotification.vue";
import AddMovieModal from "./AddMovieModal.vue";
import { onMounted, ref } from "vue";
import axiosInstance from "../config/axios/index";
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
  axiosInstance.get("api/movies").then((res) => {
    movies.value = res.data;
  });
  document.body.style.overflow = "hidden";
});

function searchDB(e) {
  e.preventDefault();
  const search = e.target.value;

  axiosInstance
    .get("api/movies/movie-search/", {
      params: {
        search: search,
      },
    })
    .then((res) => {
      movies.value = res.data;
    });
}
</script>

<style scoped>
.searchbutton {
  position: absolute;
  margin: 0;
  padding: 0;
  cursor: pointer;
}

.search:focus + .searchbutton {
  transition-duration: 0.4s;
  opacity: 0;
  -moz-transition-duration: 0.4s;
  -webkit-transition-duration: 0.4s;
  -o-transition-duration: 0.4s;
  background-color: black;
  color: black;
}

.search {
  position: absolute;
  left: 49px;
  background-color: #00000033;
  color: white;
  outline: none;
  border: none;
  border-radius: 12px;
  opacity: 1;
  padding: 0;
  width: 0;
  height: 100%;
  z-index: 10;
  transition-duration: 0.4s;
  -moz-transition-duration: 0.4s;
  -webkit-transition-duration: 0.4s;
  -o-transition-duration: 0.4s;
}

.search:focus {
  width: 400px;
  padding: 0 16px 0 0;
}

.expandright {
  left: auto;
  right: 90px;
}

.expandright:focus {
  padding: 0 0 0 16px;
}

@media screen and (max-width: 768px) {
  .expandright {
    left: auto;
    right: -100px;
    top: -20px;
  }
}
</style>
