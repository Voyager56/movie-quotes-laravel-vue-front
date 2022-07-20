<template>
    <div class="relative">
        <div class="w-[80rem] flex flex-col justify-center   ">
            <div v-if="!quotes">
                <IconLoading />
            </div>
            <div v-else v-for="quote in quotes" :key="quote.quote"
                class="bg-[#11101A] w-[50rem] flex flex-col  self-start pt-5 px-10 my-10">
                <div class="flex items-center">
                    <img :src="quote.user.photo" width="50" class="rounded-full h-[50px]" alt="">
                    <div class="flex justify-start pl-5">
                        {{ quote.user.username }}
                    </div>
                </div>
                <div class="flex py-5">
                    <p>" {{ quote.quote }} "</p>
                    <p> - {{ quote.director }}</p>
                </div>
                <img :src="quote.thumbnail" alt="">
            </div>
        </div>
        <div ref="element" class="absolute right-0 bottom-0"></div>
    </div>
</template>

<script setup>
import instance from '../config/axios/index';
import { onMounted, ref, watch } from 'vue';
import { useElementVisibility } from '@vueuse/core';
import IconLoading from './icons/IconLoading.vue';
import userStore from "../store/index";
import { storeToRefs } from 'pinia';

const store = userStore();
const { language } = storeToRefs(store);

onMounted(() => {
    instance.get('/api/quotes').then(res => {
        quotes.value = res.data
        page.value += 1;
    }).catch(err => {
        console.log(err);
    })
})

const quotes = ref(null)
const element = ref(null);
const page = ref(1);
const targetIsVisible = useElementVisibility(element);

watch(language, () => {
    const locale = language.value === "Eng" ? "en" : "ka";
    page.value = 1;
    console.log('language changed');
    instance.get('/api/quotes', {
        params: {
            lang: locale
        }
    }).then(res => {
        console.log(res.data);
        quotes.value = res.data
        page.value += 1;
    }).catch(err => {
        console.log(err);
    })
});

watch(targetIsVisible, () => {
    console.log(targetIsVisible);
    console.log(page.value);
    instance.get('api/quotes', {
        params: {
            page: page.value
        }
    }).then(res => {
        quotes.value = [...quotes.value, ...res.data]
        page.value += res.data.length > 0 ? 1 : 0;
    })
})
</script>