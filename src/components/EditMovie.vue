<template>
  <div v-if="!movie">
    <IconLoading />
  </div>
  <div v-else class="bg-[#11101A] h-fit md:px-10">
    <div
      class="flex w-full md:w-[900px] justify-between px-10 mt-5 h-fit border-b-2 border-[#EFEFEF33]/20"
    >
      <button class="flex" @click="deleteQuote">
        <IconBin />
        <p class="md:mx-5">Delete</p>
      </button>
      <p>Edit Quote</p>
      <a href="/main/feed" class="text-2xl">x</a>
    </div>
    <Form v-slot="{ values, meta }">
      <div class="flex items-center px-10 self-start mt-5">
        <img
          :src="user.value.photo"
          alt="user avatar"
          class="rounded-full w-[50px]"
        />
        <p class="ml-3">{{ user.value.username }}</p>
      </div>
      <div class="flex w-full items-start flex-col md:mx-10 p-3">
        <Field
          id="title_en"
          name="title_en"
          type="text"
          rules="required|english"
          :value="movie.title.en"
          class="bg-black text-white border-[#EFEFEF33]/20 border-2 p-3 w-[90%] my-2"
        />
        <ErrorMessage name="title_en" class="text-left text-red-600 w-fit" />
      </div>
      <div class="flex w-full items-start flex-col md:mx-10 p-3">
        <Field
          id="title_ka"
          name="title_ka"
          type="text"
          rules="required|georgian"
          :value="movie.title.ka"
          class="bg-black text-white border-[#EFEFEF33]/20 border-2 p-3 w-[90%] my-2"
        />
        <ErrorMessage name="title_ka" class="text-left text-red-600" />
      </div>
      <Multiselect
        v-model="selectedGenres"
        :options="genres"
        :close-on-select="false"
        :searchable="true"
        :create-option="true"
        mode="tags"
        :classes="{
          container:
            'relative md:mx-auto w-[300px] ml-[10px] md:w-[790px] flex items-center justify-end box-border cursor-pointer border border-gray-300 rounded bg-black  text-base leading-snug outline-none',
          containerDisabled: 'cursor-default bg-gray-100',
          containerOpen: 'rounded-b-none',
          containerOpenTop: 'rounded-t-none',
          containerActive: 'ring ring-green-500 ring-opacity-30',
          singleLabel:
            'flex items-center h-full max-w-full absolute left-0 top-0 pointer-events-none bg-black leading-snug pl-3.5 pr-16 box-border rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3.5',
          multipleLabel:
            'flex items-center h-full absolute left-0 top-0 pointer-events-none  leading-snug pl-3.5 rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3.5',
          tags: 'flex-grow flex-shrink w-fit h-fit flex flex-wrap  ',
          tag: 'bg-gray-400 text-white text-sm font-semibold py-0.5 pl-2 rounded mr-1 mb-1 flex items-center  rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1',
          tagDisabled: 'pr-2 opacity-50 rtl:pl-2',
          tagRemove:
            'flex items-center justify-center p-1 md:mx-0.5 rounded-sm bg-gray-400 hover:bg-red-700 hover:bg-opacity-100 group',
          tagRemoveIcon:
            'bg-multiselect-remove bg-center bg-gray-400 bg-no-repeat opacity-100 inline-block w-3 h-3 group-hover:opacity-60',
          tagsSearchWrapper:
            'inline-block relative md:mx-1 mb-1 flex-grow flex-shrink h-full',
          tagsSearch:
            'absolute inset-0 border-0 outline-none focus:ring-0  p-0 text-base font-sans box-border',
          tagsSearchCopy: 'invisible  inline-block h-px',
          placeholder:
            'flex items-center h-full absolute left-0 top-0 pointer-events-none leading-snug pl-3.5 text-gray-400 rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3.5',
          caret:
            'bg-multiselect-caret bg-center bg-no-repeat w-2.5 h-4 py-px box-content mr-3.5 relative z-10 opacity-100 flex-shrink-0 flex-grow-0 transition-transform transform pointer-events-none rtl:mr-0 rtl:ml-3.5',
          caretOpen: 'rotate-180 pointer-events-auto',
          clear:
            'pr-3.5 relative z-10 opacity-100 transition duration-300 flex-shrink-0 flex-grow-0 flex hover:opacity-80 rtl:pr-0 rtl:pl-3.5',
          clearIcon:
            'bg-multiselect-remove bg-center bg-no-repeat w-2.5 h-4 py-px box-content inline-block',
          spinner:
            'bg-multiselect-spinner bg-center bg-no-repeat w-4 h-4 z-10 mr-3.5 animate-spin flex-shrink-0 flex-grow-0 rtl:mr-0 rtl:ml-3.5',
          inifite: 'flex items-center justify-center w-full',
          inifiteSpinner:
            'bg-multiselect-spinner bg-center bg-no-repeat w-4 h-4 z-10 animate-spin flex-shrink-0 flex-grow-0 m-3.5',
          dropdown:
            'max-h-60 absolute -left-px -right-px bottom-0 transform translate-y-full border border-gray-300  overflow-y-scroll z-50 bg-bkack flex flex-col rounded-b',
          dropdownTop:
            '-translate-y-full top-px bottom-auto rounded-b-none rounded-t',
          dropdownHidden: 'hidden',
          option:
            'flex items-center justify-start box-border text-left cursor-pointer text-base leading-snug py-2 px-3',
          optionPointed: 'text-gray-800 bg-gray-100',
          optionSelected: 'text-black bg-green-500',
          optionDisabled: 'text-gray-300 cursor-not-allowed',
          optionSelectedPointed: 'text-white bg-black opacity-90',
          optionSelectedDisabled:
            'text-green-100 bg-green-500 bg-opacity-50 cursor-not-allowed',
          noOptions: 'py-2 px-3 text-gray-600 bg-black text-left',
          noResults: 'py-2 px-3 text-gray-600 bg-black text-left',
          fakeInput:
            ' absolute left-0 right-0 -bottom-px w-full h-px border-0 p-0 appearance-none outline-none ',
          spacer: 'h-9 py-px box-content',
        }"
        class="multiselect-blue"
      />
      <div class="flex w-full items-start flex-col md:mx-10 p-3">
        <Field
          id="budget"
          name="budget"
          type="text"
          rules="required|numeric"
          :value="movie.budget"
          class="bg-black text-white border-[#EFEFEF33]/20 border-2 p-3 w-[90%] my-2"
        />
        <ErrorMessage name="budget" class="text-left text-red-600" />
      </div>
      <div class="flex w-full items-start flex-col md:mx-10 p-3">
        <Field
          id="release_year"
          name="release year"
          type="text"
          rules="required|numeric"
          :value="movie.release_year"
          class="bg-black text-white border-[#EFEFEF33]/20 border-2 p-3 w-[90%] my-2"
        />
        <ErrorMessage name="release year" class="text-left text-red-600" />
      </div>
      <div class="flex w-full items-start flex-col md:mx-10 p-3">
        <Field
          id="description_en"
          name="description_en"
          type="text"
          rules="required|english"
          :value="movie.description.en"
          class="bg-black text-white border-[#EFEFEF33]/20 border-2 p-3 w-[90%] my-2"
        />
        <ErrorMessage
          name="description_en"
          class="text-left text-red-600 w-fit"
        />
      </div>
      <div class="flex w-full items-start flex-col md:mx-10 p-3">
        <Field
          id="description_ka"
          name="description_ka"
          type="text"
          rules="required|georgian"
          :value="movie.description.ka"
          class="bg-black text-white border-[#EFEFEF33]/20 border-2 p-3 w-[90%] my-2"
        />
        <ErrorMessage name="description_ka" class="text-left text-red-600" />
      </div>
      <div class="flex w-full items-start flex-col md:mx-10 p-3">
        <Field
          id="director_en"
          name="director_en"
          type="text"
          rules="required|english"
          :value="movie.director.en"
          class="bg-black text-white border-[#EFEFEF33]/20 border-2 p-3 w-[90%] my-2"
        />
        <ErrorMessage name="director_en" class="text-left text-red-600 w-fit" />
      </div>
      <div class="flex w-full items-start flex-col md:mx-10 p-3">
        <Field
          id="director_ka"
          name="director_ka"
          type="text"
          rules="required|georgian"
          :value="movie.director.ka"
          class="bg-black text-white border-[#EFEFEF33]/20 border-2 p-3 w-[90%] my-2"
        />
        <ErrorMessage name="director_ka" class="text-left text-red-600" />
      </div>
      <div class="relative overflow-hidden w-full md:px-10 rounded-md my-5">
        <img
          v-if="!imageUrl"
          :src="movie.thumbnail"
          alt="quote image"
          class="w-full"
        />
        <img
          v-else
          :src="imageUrl"
          alt="quote image"
          class="w-full max-w-[800px]"
        />
        <div class="opacity-0 hover:opacity-80">
          <Field
            id="image"
            name="image"
            type="file"
            rules="required"
            class="absolute top-0 text-[100px] md:text-[10000px] right-10 left-10 opacity-0"
            @change="imageUpload"
          />
          <ErrorMessage name="image" class="text-left text-red-600" />
          <div
            class="flex-col absolute top-[50%] left-[45%] items-center my-auto justify-center bg-[#181623] rounded-md px-5 py-3 flex"
          >
            <IconPhoto />
            <p class="my-5">Change Photo</p>
          </div>
        </div>
      </div>
      <button
        class="w-[90%] py-3 mb-10 md:md:mx-10 bg-[#E31221] rounded-md disabled:opacity-40"
        :disabled="!meta.valid"
        @click="updateQuote($event, values)"
      >
        Save Changes
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
import IconPhoto from "./icons/IconPhoto.vue";
import Multiselect from "@vueform/multiselect";

const route = useRoute();
const movie = ref(null);
const store = userStore();
const { user } = storeToRefs(store);
const image = ref(null);
const imageUrl = ref(null);
const genres = ref([]);
const selectedGenres = ref([]);

onMounted(() => {
  axiosInstance.get(`/api/movies/${route.params.id}`).then((res) => {
    movie.value = res.data.movie;
    console.log(movie.value);
  });
  axiosInstance.get("api/genres").then((res) => {
    genres.value = res.data.genres;
  });
});

function imageUpload(e) {
  const file = e.target.files[0];

  const reader = new FileReader();
  reader.onload = (e) => (imageUrl.value = e.target.result);
  reader.readAsDataURL(file);
  image.value = file;
}

function updateQuote(e, values) {
  e.preventDefault();

  console.log(image.value);

  const formData = new FormData();
  formData.append("image", image.value);
  formData.append("description_en", values["description_en"]);
  formData.append("description_ka", values["description_ka"]);
  formData.append("director_en", values["director_en"]);
  formData.append("director_ka", values["director_ka"]);
  formData.append("title_en", values["title_en"]);
  formData.append("title_ka", values["title_ka"]);
  formData.append("release_year", values["release year"]);
  formData.append("budget", values["budget"]);
  formData.append("genres", selectedGenres.value);

  axiosInstance
    .put(`/api/movies/${route.params.id}`, formData, {
      headers: { "content-type": "multipart/form-data" },
      _method: "PUT",
    })
    .then(() => {
      window.location.href = "/main/movies";
    });
}
</script>
