<template>
  <div class="relative">
    <div class="w-[80rem] flex flex-col justify-center">
      <div v-if="!quotes">
        <IconLoading />
      </div>
      <div
        v-else
        v-for="quote in quotes"
        :key="quote.quote"
        class="bg-[#11101A] w-[50rem] flex flex-col self-start pt-5 px-10 my-10"
      >
        <div class="flex items-center">
          <img
            :src="quote.user.photo"
            width="50"
            class="rounded-full h-[50px]"
            alt=""
          />
          <div class="flex justify-start pl-5">
            {{ quote.user.username }}
          </div>
        </div>
        <div class="flex py-5">
          <p>" {{ quote.quote }} "</p>
          <p>- {{ quote.director }}</p>
        </div>
        <img :src="quote.thumbnail" alt="" />
        <div class="py-5 flex border-white/20 border-b-2">
          <div class="flex align-center pb-5">
            <p class="mr-5">{{ quote.commentCount }}</p>
            <IconComment />
          </div>
          <div class="flex align-center pb-5 ml-10">
            <p class="mr-5">{{ quote.likes }}</p>
            <button @click="likeQuote($event, quote.id)">
              <IconLike
                :color="
                  quote.userLikes.some((like) => like.quote_id === quote.id)
                    ? 'red'
                    : 'white'
                "
              />
            </button>
          </div>
        </div>
        <div v-for="comment in comments" :key="comment.comment">
          <div v-if="comment.quoteId === quote.id" class="mt-2 flex">
            <div class="flex w-full">
              <img
                :src="comment.authorPhoto"
                alt="author-photo"
                class="w-[50px] h-[50px] rounded-full"
              />
              <div class="flex flex-col ml-5 w-full">
                <h3 class="text-left pt-3">{{ comment.authorUsername }}</h3>
                <p class="py-5 border-b-2 w-full text-left">
                  {{ comment.comment }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="pt-5 flex">
          <img
            :src="user.value.photo"
            alt="user-photo"
            class="w-10 h-10 rounded-full mr-5"
          />
          <input
            type="text"
            @keyup.enter="addComment($event, quote.id)"
            class="bg-[#24222F] w-full rounded-xl pl-5"
            placeholder="Write a comment"
          />
        </div>
      </div>
    </div>
    <div ref="element" class="absolute right-0 bottom-0"></div>
  </div>
</template>

<script setup>
import instance from "../config/axios/index";
import { onMounted, ref, watch } from "vue";
import { useElementVisibility } from "@vueuse/core";
import IconLoading from "./icons/IconLoading.vue";
import userStore from "../store/index";
import { storeToRefs } from "pinia";
import IconComment from "./icons/IconComment.vue";
import IconLike from "./icons/IconLike.vue";

const store = userStore();
const { language, user } = storeToRefs(store);
const quotes = ref([]);
const comments = ref([]);
const element = ref(null);
const page = ref();
const shellComment = ref({});
const targetIsVisible = useElementVisibility(element);

onMounted(() => {
  instance
    .get("/api/quotes")
    .then((res) => {
      quotes.value = res.data;
      page.value += 1;
    })
    .catch((err) => {
      console.log(err);
    });

  instance
    .get("/api/comments")
    .then((res) => {
      comments.value = [...comments.value, ...res.data];
    })
    .catch((err) => {
      console.log(err);
    });
});

window.Echo.channel("QuotesChannel")
  .listen("CommentEvent", ({ data }) => {
    comments.value.push(data.commentData);
    quotes.value.find(
      (quote) => quote.id === data.commentData.quoteId
    ).commentCount = data.commentCount;
    shellComment.value = data.commentData;
  })
  .listen("LikeEvent", ({ data }) => {});

watch(
  language,
  () => {
    const locale = language.value === "Eng" ? "en" : "ka";
    page.value = 1;
    console.log("language changed");
    instance
      .get("/api/quotes", {
        params: {
          lang: locale,
        },
      })
      .then((res) => {
        quotes.value = res.data;
        page.value += 1;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  {
    immediate: true,
  }
);

watch(targetIsVisible, () => {
  // refreshing in firefox doesn't pull you up to the top all the way and target was visibble on the load of the page
  // initiating two api calls on the same page and fetching same data twice
  // this is a workaround
  page.value = page.value ? page.value + 1 : 2;
  instance
    .get("api/quotes", {
      params: {
        page: page.value,
      },
    })
    .then((res) => {
      quotes.value = [...quotes.value, ...res.data];
      page.value += res.data.length > 0 ? 1 : 0;
    });
});

function addComment(e, id) {
  e.preventDefault();
  const comment = e.target.value;
  e.target.value = "";
  if (comment) {
    instance
      .post(`/api/comment/${id}`, {
        userId: user.value.value.id,
        comment: comment,
      })
      .then(() => {
        e.target.value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
function likeQuote(e, id) {
  e.preventDefault();
  instance
    .post(`/api/likes/${id}`)
    .then(() => {
      quotes.value.find((quote) => quote.id === id).likeCount += 1;
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>
