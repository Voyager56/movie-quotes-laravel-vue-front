<template>
  <div v-if="!movie">
    <IconLoading />
  </div>
  <div v-else class="bg-[#11101A] h-fit md:px-10 md:w-[900px]">
    <div
      class="flex w-full justify-between px-10 mt-5 h-fit border-b-2 border-[#EFEFEF33]/20"
    >
      <button class="flex" @click="deleteQuote">
        <IconBin />
        <p class="md:mx-5">Delete</p>
      </button>
      <p>Edit Movie</p>
      <a href="/main/feed" class="text-2xl">x</a>
    </div>
    <Form v-slot="{ values, meta }" class="flex flex-col w-full">
      <div class="flex items-center self-start mt-5">
        <img
          :src="user.value.photo"
          alt="user avatar"
          class="rounded-full w-[50px]"
        />
        <p class="ml-3">{{ user.value.username }}</p>
      </div>
      <Field
        id="title_en"
        name="title in english"
        as="input"
        rules="required|english"
        class="bg-[#11101A] my-2 border-[#6C757D] border-[2px] px-3 py-2"
        placeholder="Movie Name"
      ></Field>
      <ErrorMessage name="title in english" class="text-left text-red-600" />
      <Field
        id="title_ka"
        name="title in georgian"
        as="input"
        rules="required|georgian"
        class="bg-[#11101A] my-2 border-[#6C757D] border-[2px] px-3 py-2"
        placeholder="ფილმის სახელი"
      ></Field>
      <ErrorMessage name="title in georgian" class="text-left text-red-600" />
      <Field
        id="release_date"
        name="release date"
        as="input"
        rules="required|numeric"
        class="bg-[#11101A] my-2 border-[#6C757D] border-[2px] px-3 py-2"
        :placeholder="$t('release_date')"
      ></Field>
      <ErrorMessage name="release date" class="text-left text-red-600" />
      <Field
        id="budget"
        name="budget"
        as="input"
        rules="required|numeric"
        class="bg-[#11101A] my-2 border-[#6C757D] border-[2px] px-3 py-2"
        :placeholder="$t('budget')"
      ></Field>
      <ErrorMessage name="budget" class="text-left text-red-600" />
      <Multiselect
        id="multiselect"
        v-model="selectedGenres"
        :options="genres"
        :close-on-select="false"
        :searchable="true"
        :create-option="true"
        mode="tags"
      />
      <Field
        id="director_en"
        name="directors name in english"
        as="input"
        rules="required|english"
        class="bg-[#11101A] my-2 border-[#6C757D] border-[2px] px-3 py-2"
        placeholder="Director"
      ></Field>
      <ErrorMessage
        name="directors name in english"
        class="text-left text-red-600"
      />
      <Field
        id="director_ka"
        name="directors name in georgian"
        as="input"
        rules="required|georgian"
        class="bg-[#11101A] my-2 border-[#6C757D] border-[2px] px-3 py-2"
        placeholder="რეჟისორი"
      ></Field>
      <ErrorMessage
        name="directors name in georgian"
        class="text-left text-red-600"
      />
      <Field
        id="description_en"
        name="description in english"
        as="textarea"
        rules="required|english"
        class="bg-[#11101A] my-2 border-[#6C757D] border-[2px] px-3 py-2"
        placeholder="Movie Description"
      ></Field>
      <ErrorMessage
        name="description in english"
        class="text-left text-red-600"
      />
      <Field
        id="description_ka"
        name="description in georgian"
        as="textarea"
        rules="required|georgian"
        class="bg-[#11101A] my-2 border-[#6C757D] border-[2px] px-3 py-2"
        placeholder="ფილმის აღწერა"
      />
      <ErrorMessage
        name="description in georgian"
        class="text-left text-red-600"
      />

      <ImageDrop :set-image="setImage" />

      <button
        id="submit"
        class="w-full text-center my-2 py-2 bg-[#E31221] rounded-md disabled:opacity-40"
        :disabled="!meta.valid || selectedGenres.length === 0"
        @click="updateQuote($event, values)"
      >
        Submit
      </button>
    </Form>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "../config/axios/index.js";
import userStore from "../store/index.js";
import { storeToRefs } from "pinia";
import IconLoading from "./icons/IconLoading.vue";
import IconBin from "./icons/IconBin.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import Multiselect from "@vueform/multiselect";
import ImageDrop from "./ImageDrop.vue";

const route = useRoute();
const movie = ref(null);
const store = userStore();
const { user } = storeToRefs(store);
const image = ref(null);
const genres = ref([]);
const selectedGenres = ref([]);

function setImage(img) {
  image.value = img;
}

onMounted(() => {
  axiosInstance.get(`/api/movies/${route.params.id}`).then((res) => {
    movie.value = res.data.movie;
  });
  axiosInstance.get("api/genres").then((res) => {
    genres.value = res.data.genres;
  });
});

function updateQuote(e, values) {
  e.preventDefault();

  const form = new FormData();
  form.append("title_en", values["title in english"]);
  form.append("title_ka", values["title in georgian"]);
  form.append("release_year", values["release date"]);
  form.append("budget", values["budget"]);
  form.append("director_en", values["directors name in english"]);
  form.append("director_ka", values["directors name in georgian"]);
  form.append("description_en", values["description in english"]);
  form.append("description_ka", values["description in georgian"]);
  form.append("genres", selectedGenres.value);
  form.append("image", image.value);
  form.append("_method", "PUT");

  axiosInstance
    .post(`/api/movies/${route.params.id}`, form, {
      headers: { "content-type": "multipart/form-data" },
    })
    .then(() => {
      window.location.href = "/main/movies";
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style>
:root {
  --ms-tag-bg: #e31221;
  --ms-tag-color: #000000;
  --ms-bg-disabled: #000000;
  --ms-dropdown-bg: #000000;
  --ms-bg: #000000;
}
</style>
