<template>
  <div class="relative">
    <div class="md:w-[80rem] flex flex-col justify-center text-left">
      <div class="flex items-center mt-5 ml-5">
        <div
          ref="writeQuoteDiv"
          class="flex cursor-pointer relative items-center w-[80%] md:w-[46%] bg-[#24222F] rounded-md p-3"
          @click="openWriteQuoteModal"
        >
          <IconWriteMovie />
          <p class="ml-5">{{ $t("write_quote") }}</p>
        </div>
        <div
          class="md:relative my-[4px] mx-[2px] h-[50px] w-[50px] align-bottom md:flex items-center ml-10 absolute md:top-0 md:right-0 top-[-50px] right-[60px]"
        >
          <input
            id="searchright"
            class="search expandright md:right-[90px] md:left-auto"
            type="search"
            name="search"
            placeholder="Enter @ to search movies, Enter # to search quotes "
            @keyup.enter="searchDB"
          />
          <label class="searchbutton flex justify-between" for="searchright">
            <IconSearch />
            <p class="mx-10 w-[100px] text-xl hidden md:block">
              {{ $t("search") }}
            </p>
          </label>
        </div>
      </div>
      <AddQuote
        :modal="writeQuoteModal"
        :movies="movies"
        :close-modal="closeWriteQuoteModal"
      />
      <div v-if="!quotes">
        <IconLoading />
      </div>
      <div
        v-for="quote in quotes"
        v-else
        :key="quote.quote"
        class="bg-[#11101A] md:w-[50rem] flex flex-col self-start pt-5 px-10 my-10"
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
          <p class="max-w-[600px]">" {{ quote.quote[locale] }} "</p>
          <p>- {{ quote.director[locale] }}</p>
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
                  quote.userLikes.some(
                    (like) =>
                      like.quote_id == quote.id && like.user_id == user.value.id
                  )
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
            class="bg-[#24222F] w-full rounded-xl pl-5"
            placeholder="Write a comment"
            @keyup.enter="addComment($event, quote.id)"
          />
        </div>
      </div>
    </div>
    <div ref="element" class="absolute right-0 left-0 bottom-0"></div>
  </div>
</template>

<script setup>
import axiosInstance from "../config/axios/index";
import { onMounted, ref, watch } from "vue";
import { useElementVisibility } from "@vueuse/core";
import IconLoading from "../assets/icons/IconLoading.vue";
import userStore from "../store/index";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import IconComment from "../assets/icons/IconComment.vue";
import IconLike from "../assets/icons/IconLike.vue";
import IconWriteMovie from "../assets/icons/IconWriteMovie.vue";
import IconSearch from "../assets/icons/IconSearch.vue";
import AddQuote from "./AddQuote.vue";

const store = userStore();
const { user } = storeToRefs(store);
const { locale } = useI18n({ useScope: "global" });
const quotes = ref([]);
const comments = ref([]);
const element = ref(null);
const page = ref();
const targetIsVisible = useElementVisibility(element);
const writeQuoteDiv = ref(null);
const writeQuoteModal = ref(false);
const movies = ref([]);

onMounted(() => {
  axiosInstance
    .get("/api/quotes")
    .then((res) => {
      quotes.value = res.data;
      page.value += 1;
    })
    .catch((err) => {
      console.log(err);
    });

  axiosInstance
    .get("/api/comments")
    .then((res) => {
      comments.value = [...comments.value, ...res.data];
    })
    .catch((err) => {
      console.log(err);
    });

  axiosInstance
    .get("api/movies")
    .then((res) => {
      console.log(res.data);
      movies.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});

function openWriteQuoteModal() {
  writeQuoteModal.value = true;
}

function closeWriteQuoteModal() {
  writeQuoteModal.value = false;
}

window.Echo.channel("QuotesChannel")
  .listen("LikeEvent", ({ data }) => {
    quotes.value.forEach((quote) => {
      if (quote.id === data.like.quote_id) {
        quote.likes = quote.likes + 1;
        quote.userLikes = [...quote.userLikes, data.like];
      }
    });
  })
  .listen("RemoveLikeEvent", ({ data }) => {
    quotes.value.forEach((quote) => {
      if (quote.id == data.like.quote_id) {
        quote.likes = quote.likes - 1;
        quote.userLikes = quote.userLikes.filter(
          (like) => like.user_id != data.like.user_id
        );
      }
    });
  })
  .listen("CommentEvent", ({ data }) => {
    comments.value.push(data.commentData);
    quotes.value.find(
      (quote) => quote.id === data.commentData.quoteId
    ).commentCount = data.commentCount;
  })
  .listen("PostQuote", ({ data }) => {
    console.log(data);
    quotes.value = [data, ...quotes.value];
  });

watch(locale, () => {
  page.value = 1;
});

watch(targetIsVisible, () => {
  // refreshing in firefox doesn't pull you up to the top all the way and target was visibble on the load of the page
  // initiating two api calls on the same page and fetching same data twice
  // this is a workaround
  page.value = page.value ? page.value + 1 : 2;
  axiosInstance
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
    axiosInstance
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
  axiosInstance
    .post(`/api/likes/${id}`)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
}

function searchDB(e) {
  const search = e.target.value;
  if (search.startsWith("#")) {
    axiosInstance
      .get("/api/quotes/search", {
        params: {
          search: search.substring(1),
        },
      })
      .then((res) => {
        quotes.value = res.data;
        page.value += 1;
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (search.startsWith("@")) {
    axiosInstance
      .get("/api/movies/search", {
        params: {
          search: search.substring(1),
        },
      })
      .then((res) => {
        quotes.value = res.data;
        page.value += 1;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    axiosInstance
      .get("/api/quotes/search", {
        params: {
          search: "",
        },
      })
      .then((res) => {
        quotes.value = res.data;
        page.value += 1;
      })
      .catch((err) => {
        console.log(err);
      });
  }
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
    right: -50px;
    top: -20px;
  }
}
</style>
