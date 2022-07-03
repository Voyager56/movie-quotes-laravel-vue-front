<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core'


const dropDownRef = ref(null);

const props = defineProps({
    toggleDropDown: Function,
    changeLanguage: Function,
    toggleModal: Function,
    closeDropDown: Function,
    lang: String,
    dropDown: Boolean,
})

onClickOutside(dropDownRef, () => {
    props.closeDropDown();
});



</script>


<template>
    <div class="flex justify-between py-5 px-10">
        <p class="text-[#DDCCAA] text-2xl">Movie Quotes</p>
        <div class="flex justify-evenly w-[400px] items-center">
            <div class="flex relative">
                <button ref="dropDownRef" @click="toggleDropDown" class="text-white">{{ lang }}</button>
                <div class="absolute bg-red-500 top-[30px] left-[-40px] h-[100px] flex flex-col justify-evenly px-5 rounded-xl"
                    :class="{ hidden: !dropDown }">
                    <div class="dropdown-item" @click="changeLanguage('Eng')">English</div>
                    <div class="dropdown-item" @click="changeLanguage('Geo')">ქართული</div>
                </div>
            </div>
            <button class="bg-red-500 py-2 px-4 rounded-md">Sign Up</button>
            <button class="border border-1-white py-2 px-4 rounded-md">Log In</button>
        </div>
    </div>
    <div class="flex flex-col items-center justify-center h-[80vh] bg-black">
        <h1 class="text-5xl text-[#DDCCAA]">Find any quote in
            millions of movie lines</h1>
        <button @click="toggleModal"
            class="bg-red-500 py-2 px-4 rounded-md w-40 mt-10 hover:motion-safe:animate-bounce">Get
            Started</button>
    </div>
</template>