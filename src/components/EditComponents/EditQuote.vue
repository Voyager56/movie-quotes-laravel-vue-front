<template>
  <div v-if="!quote">
    <IconLoading />
  </div>
  <div v-else class="bg-[#11101A] h-screen md:h-full w-fit">
    <div
      class="flex w-screen md:w-[900px] justify-between px-10 mt-5 h-fit border-b-2 border-[#EFEFEF33]/20"
    >
      <button class="flex" @click="deleteQuote">
        <IconBin />
        <p class="mx-5">Delete</p>
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
      <div class="flex w-full items-start flex-col md:mx-10 sm:pl-5 md:p-3">
        <Field
          id="quote_en"
          name="quote_en"
          type="text"
          rules="required|english"
          :value="quote.text.en"
          class="bg-black text-white border-[#EFEFEF33]/20 border-2 md:p-3 w-[90%] my-2"
        />
        <ErrorMessage name="quote_en" class="text-left text-red-600 w-fit" />
      </div>
      <div class="flex w-full items-start flex-col md:mx-10 sm:pl-5 md:p-3">
        <Field
          id="quote_ka"
          name="quote_ka"
          type="text"
          rules="required|georgian"
          :value="quote.text.ka"
          class="bg-black text-white border-[#EFEFEF33]/20 border-2 md:p-3 w-[90%] my-2"
        />
        <ErrorMessage name="quote_ka" class="text-left text-red-600" />
      </div>
      <div
        id="image-select"
        class="relative overflow-hidden w-full px-10 rounded-md my-5"
      >
        <img
          v-if="!imageUrl"
          :src="quote.thumbnail"
          alt="quote image"
          class="w-full"
        />
        <img v-else :src="imageUrl" alt="quote image" class="w-full" />
        <div class="opacity-0 hover:opacity-80">
          <Field
            id="image"
            name="image"
            type="file"
            rules=""
            class="absolute top-0 text-[1000px] right-10 left-10 opacity-0"
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
        id="post-quote"
        class="w-[90%] py-3 mb-10 md:mx-10 bg-[#E31221] rounded-md disabled:opacity-40"
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

const route = useRoute();
const quote = ref(null);
const store = userStore();
const { user } = storeToRefs(store);
const image = ref(null);
const imageUrl = ref(null);

onMounted(() => {
  axiosInstance.get(`/api/quotes/${route.params.id}`).then((res) => {
    quote.value = res.data.quote;
  });
});

function deleteQuote() {
  axiosInstance.delete(`/api/quotes/${route.params.id}`).then(() => {
    window.location.href = "/main/movies";
  });
}

function imageUpload(e) {
  const file = e.target.files[0];

  const reader = new FileReader();
  reader.onload = (e) => (imageUrl.value = e.target.result);
  reader.readAsDataURL(file);
  image.value = file;
}

function updateQuote(e, values) {
  e.preventDefault();

  const formData = new FormData();
  formData.append("image", image.value);
  formData.append("quote_en", values["quote_en"]);
  formData.append("quote_ka", values["quote_ka"]);
  formData.append("_method", "PUT");

  axiosInstance
    .post(`/api/quotes/${route.params.id}`, formData, {
      headers: { "content-type": "multipart/form-data" },
    })
    .then(() => {
      window.location.href = "/main/movies";
    });
}
</script>
