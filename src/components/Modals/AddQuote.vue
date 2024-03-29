<script setup>
import IconFilm from "@/components/icons/IconFilm.vue";
import IconArrow from "@/components/icons/IconArrow.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import userStore from "@/store/index";
import { storeToRefs } from "pinia";
import axiosInstance from "@/config/axios";
import { useI18n } from "vue-i18n";
import ImageDrop from "@/components/ImageDrop.vue";

const { locale } = useI18n({ useScope: "global" });
const store = userStore();
const { user } = storeToRefs(store);

const chosenMovie = ref(null);
const image = ref(null);
const writeQuoteRef = ref(null);

const movieDropdown = ref(false);
const movieDropdownRef = ref(null);

const props = defineProps({
  movies: {
    type: Array,
    required: true,
  },
  modal: {
    type: Boolean,
    required: true,
  },
  closeModal: {
    type: Function,
    required: true,
  },
});

function setImage(img) {
  image.value = img;
}

function chooseMovie(e, movie) {
  chosenMovie.value = movie;
  movieDropdown.value = false;
}

function openMovieDropdown() {
  movieDropdown.value = true;
}

onClickOutside(writeQuoteRef, () => {
  props.closeModal();
  image.value = null;
  chosenMovie.value = null;
});

function postMovie(e, values) {
  e.preventDefault();
  const form = new FormData();
  form.append("movie", chosenMovie.value.id);
  form.append("image", image.value);
  form.append("quote_ka", values.quote_ka);
  form.append("quote_en", values.quote_en);
  axiosInstance
    .post("/api/quotes", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>

<template>
  <div class="flex text-white items-center">
    <div
      v-if="modal"
      class="bg-[#22203033]/70 fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] w-[100vw] h-[100vh] max-w-[100%] z-10 backdrop-blur-sm flex justify-center items-center overflow-scroll"
    >
      <div
        ref="writeQuoteRef"
        class="bg-[#222030] w-[600px] text-white h-[90%] flex flex-col items-center rounded-md"
      >
        <p class="text-3xl py-5 border-b-2 border-gray-500 w-full text-center">
          Write New Quote
        </p>
        <div class="flex items-center justify-start w-full py-5 px-[3rem]">
          <img
            :src="user.value.photo"
            class="rounded-full w-[50px] h-[50px]"
            alt=""
          />
          <p class="ml-5">{{ user.value.username }}</p>
        </div>
        <Form v-slot="{ values, meta }" class="flex flex-col w-full px-[3rem]">
          <Field
            id="quote_en"
            as="textarea"
            name="quote_en"
            rules="required|english"
            class="bg-[#11101A] my-2 border-[#6C757D] border-[2px] px-3 py-2"
            placeholder="Start create new quote"
          ></Field>
          <ErrorMessage
            name="quote_en"
            class="text-red-500 text-sm"
          ></ErrorMessage>
          <Field
            id="quote_ka"
            name="quote_ka"
            as="textarea"
            rules="required|georgian"
            class="bg-[#11101A] my-2 border-[#6C757D] border-[2px] px-3 py-2"
            placeholder="ახალი ციტატა"
          ></Field>
          <ErrorMessage
            name="quote_ka"
            class="text-red-500 text-sm"
          ></ErrorMessage>
          <ImageDrop :set-image="setImage" />
          <div class="relative w-full">
            <div class="w-full pb-5 cursor-pointer">
              <div
                id="movie-dropdown"
                class="bg-[#000000] py-[1rem] px-3 flex items-center w-full relative"
                @click="openMovieDropdown"
              >
                <div class="flex items-center">
                  <IconFilm />
                  <p class="pl-5">Choose movie</p>
                </div>
                <div class="absolute right-5">
                  <IconArrow />
                </div>
              </div>
              <div
                v-if="chosenMovie"
                class="bg-[#000000] py-[1rem] px-3 flex items-center w-full relative cursor-pointer"
              >
                <div class="flex items-center">
                  <div class="px-3 flex items-center">
                    <p class="w-[300px]">{{ chosenMovie.title[locale] }}</p>
                    <p>- {{ chosenMovie.director[locale] }}</p>
                  </div>
                </div>
              </div>
              <div v-if="movieDropdown" class="absolute top-[4rem]">
                <div
                  v-for="movie in movies"
                  id="movie-element"
                  ref="movieDropdownRef"
                  :key="movie.id"
                  class="bg-black px-5 border-2 border-gray-500 w-full left-[1rem] relative cursor-pointer rounded-md my-2"
                >
                  <div
                    class="flex items-center cursor-pointer"
                    @click="chooseMovie($event, movie)"
                  >
                    <p class="w-[300px]">{{ movie.title[locale] }}</p>
                    <p>- {{ movie.director[locale] }}</p>
                  </div>
                </div>
              </div>
              <button
                id="post-quote"
                class="w-full bg-[#E31221] text-white my-[2rem] py-[1rem] rounded-xl disabled:opacity-40"
                :disabled="!meta.valid || !image || !chosenMovie"
                @click="postMovie($event, values)"
              >
                POST
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
