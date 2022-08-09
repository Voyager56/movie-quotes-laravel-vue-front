<template>
  <div
    v-if="!quote || comments.length === 0"
    class="flex flex-col items-center justify-center"
  >
    <IconLoading />
  </div>
  <div
    v-else
    class="flex flex-col justify-center items-center h-fit bg-[#11101A]"
  >
    <div
      class="flex md:w-[900px] w-full justify-between px-10 mt-5 pb-5 border-b-2 border-[#EFEFEF33]/20"
    >
      <div class="flex w-[50px] justify-between">
        <a :href="`/main/movies/edit/quote/${quote.id}`">
          <IconPen />
        </a>
        <button @click="deleteQuote()">
          <IconBin />
        </button>
      </div>
      <div>{{ $t("view_quote") }}</div>
      <a href="/main/movies">X</a>
    </div>
    <div class="flex items-center px-10 self-start mt-5">
      <img
        :src="user.value.photo"
        alt="user avatar"
        class="rounded-full w-[50px]"
      />
      <p class="ml-3">{{ user.value.username }}</p>
    </div>
    <input
      type="text"
      readonly
      :value="quote.text.en"
      class="bg-black text-white border-[#EFEFEF33]/20 border-2 w-[90%] p-3 self-start mx-3 md:mx-10 my-2"
    />
    <input
      type="text"
      readonly
      :value="quote.text.ka"
      class="bg-black text-white border-[#EFEFEF33]/20 border-2 w-[90%] p-3 self-start mx-3 md:mx-10 my-2"
    />
    <img
      :src="quote.thumbnail"
      alt="quote image"
      class="w-full px-10 rounded-md my-5"
    />
    <div class="py-5 flex border-white/20 border-b-2 self-start px-10">
      <div class="flex align-center pb-5">
        <p class="mr-5">{{ comments.length }}</p>
        <IconComment />
      </div>
      <div class="flex align-center pb-5 ml-10">
        <p class="mr-5">{{ quote.likes.length }}</p>
        <button @click="likeQuote($event, quote.id)">
          <IconLike />
        </button>
      </div>
    </div>
    <div
      v-for="comment in comments"
      :key="comment.comment"
      class="self-start w-full px-10"
    >
      <div class="flex w-full self-start">
        <img
          :src="comment.user.photo"
          alt="author-photo"
          class="w-[50px] h-[50px] rounded-full"
        />
        <div class="flex flex-col ml-5 w-full">
          <h3 class="text-left pt-3">{{ comment.user.username }}</h3>
          <p class="py-5 border-b-2 w-full text-left">
            {{ comment.body }}
          </p>
        </div>
      </div>
    </div>
    <div class="pt-5 flex w-full self-start px-10">
      <img
        :src="user.value.photo"
        alt="user-photo"
        class="w-10 h-10 rounded-full mr-5"
      />
      <input
        type="text"
        class="bg-[#24222F] w-full rounded-xl pl-5"
        placeholder="Write a comment"
        @keyup.enter="addComment($event, quote.id)"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "../config/axios/index.js";
import IconLoading from "../assets/icons/IconLoading.vue";
import IconPen from "../assets/icons/IconPen.vue";
import IconBin from "../assets/icons/IconBin.vue";
import IconComment from "../assets/icons/IconComment.vue";
import IconLike from "../assets/icons/IconLike.vue";
import userStore from "../store/index.js";
import { storeToRefs } from "pinia";

const route = useRoute();
const quote = ref(null);
const comments = ref([]);
const store = userStore();
const { user } = storeToRefs(store);

function addComment(e, id) {
  e.preventDefault();
  const comment = e.target.value;
  e.target.value = "";
  if (comment) {
    axiosInstance
      .post(`/api/comment/${id}`, {
        userId: user.value.value.id,
        comment: comment,
      })
      .then(() => {
        e.target.value = "";
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

onMounted(() => {
  axiosInstance.get(`/api/quotes/${route.params.id}`).then((res) => {
    quote.value = res.data.quote;
    comments.value = res.data.comments;
  });
});

function deleteQuote() {
  axiosInstance.delete(`/api/quotes/delete/${route.params.id}`).then(() => {
    window.location.href = "/main/movies";
  });
}
</script>
