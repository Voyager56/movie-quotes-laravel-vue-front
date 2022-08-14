<template>
  <div
    v-if="modal"
    class="text-white fixed left-[270px] w-full h-[90%] max-w-[100%] z-10 backdrop-blur-sm flex justify-start overflow-scroll"
  >
    <div
      ref="modalRef"
      class="bg-[#000000] w-[600px] h-fit text-white flex flex-col items-center justify-start ml-[20rem]"
    >
      <h1 class="text-2xl py-[2rem] border-b-gray-700 border-b-[1px] w-full">
        Add Movie
      </h1>
      <div class="flex flex-col self-start px-[2rem] py-[3rem] w-full">
        <div class="flex items-center pb-[1rem]">
          <img
            :src="user.value.photo"
            alt="avatar"
            class="rounded-full w-[50px]"
          />
          <p class="px-[1rem]">{{ user.value.username }}</p>
        </div>
        <Form v-slot="{ values, meta }" class="flex flex-col w-full">
          <Field
            id="title_en"
            name="title in english"
            as="input"
            rules="required|english"
            class="bg-[#11101A] my-2 border-[#6C757D] border-[2px] px-3 py-2"
            placeholder="Movie Name"
          ></Field>
          <ErrorMessage
            name="title in english"
            class="text-left text-red-600"
          />
          <Field
            id="title_ka"
            name="title in georgian"
            as="input"
            rules="required|georgian"
            class="bg-[#11101A] my-2 border-[#6C757D] border-[2px] px-3 py-2"
            placeholder="ფილმის სახელი"
          ></Field>
          <ErrorMessage
            name="title in georgian"
            class="text-left text-red-600"
          />
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
            @click="submit($event, values)"
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup>
import userStore from "../store/index";
import { storeToRefs } from "pinia";
import ImageDrop from "./ImageDrop.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { onClickOutside } from "@vueuse/core";
import { ref, onMounted } from "vue";
import axiosInstance from "../config/axios";
import Multiselect from "@vueform/multiselect";
import { useRouter } from "vue-router";

const store = userStore();
const { user } = storeToRefs(store);
const modalRef = ref(null);
const image = ref(null);
const genres = ref([]);
const selectedGenres = ref([]);
const router = useRouter();

onMounted(() => {
  axiosInstance.get("api/genres").then((res) => {
    genres.value = res.data.genres;
  });
});

function setImage(img) {
  image.value = img;
}

const props = defineProps({
  modal: Boolean,
  closeModal: Function,
});

onClickOutside(modalRef, () => {
  props.closeModal();
});

function submit(e, values) {
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
  axiosInstance.post("/api/movies", form).then(() => {
    router.go();
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
