<script setup>
import { ref, onMounted } from 'vue';
import IconBell from '../components/icons/IconBell.vue';
import LanguageButtons from '../components/LanguageButtons.vue';
import IconHome from '../components/icons/IconHome.vue';
import IconFilm from '../components/icons/IconFilm.vue';
import userStore from '../store/index';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import instance from "../config/axios/index"


const url = ref('feed');
const router = useRouter();



onMounted(() => {
    const route = useRoute();
    url.value = route.path.split('/main/')[1];
});

const store = userStore();
const { user } = storeToRefs(store);
const langDropDown = ref(false);
const notificationModal = ref(true);


function toggle() {
    notificationModal.value = !notificationModal.value;
}

function toggleLanguageDropdown() {
    langDropDown.value = true
}

function closeLanguageDropdown() {
    langDropDown.value = false;
}

function logOut() {
    instance.post("api/logout").then(() => {
        localStorage.token = null;
        store.setUser(null)
        console.log(localStorage.token)
        router.go("/");
    }).catch(e => console.log(e))
}

</script>



<template>
    <!-- navbar -->
    <div class="bg-[#22203033]/100 h-[5rem] flex items-center justify-between px-0 md:px-20">
        <a href="/main/feed" class="text-[#DDCCAA] text-2xl">MOVIE QUOTES</a>
        <div class=" flex justify-between w-[300px] items-center">
            <div class="relative">
                <button @click="toggle" class="relative">
                    <IconBell />
                    <h3
                        class=" bg-red-500 rounded-full p-4 w-3 h-3 text-white absolute top-[-15px] right-[-15px] flex items-center justify-center">
                        3
                    </h3>
                </button>
                <div
                    :class="notificationModal ? `bg-[#22203033]/70 left-0 right-0 top-[5rem] bottom-0 absolute z-10 backdrop-blur-sm` : ''">
                    <div class=" fixed bg-[#000000] text-white right-[100px] top-[100px] h-[100px] w-[500px] flex flex-col justify-evenly items-start px-5 rounded-xl"
                        :class="{ hidden: !notificationModal }">
                        <div class="flex justify-between w-[100%] ">
                            <p class="text-2xl">Notifications</p>
                            <button class="underline">Mark as all read</button>
                        </div>
                    </div>
                </div>
            </div>
            <LanguageButtons :dropDown="langDropDown" :toggleDropDown="toggleLanguageDropdown"
                :closeDropDown="closeLanguageDropdown" />
            <button @click="logOut" class="py-2 px-3 text-white border-white border-[1px] rounded-lg ">Log Out</button>
        </div>
    </div>
    <div class="bg-gradient-to-r from-[#181623] to-[#0D0B14]  pt-10 pl-10 text-white flex">
        <!-- sidebar -->
        <div class="w-[20rem] flex flex-col align-center h-[100vh]">
            <div class="flex  items-center">
                <img :src="user.value.photo" alt="" class="rounded-full w-[50px] h-[50px] "
                    :class="url === 'profile' ? 'border-[2px] border-red-500' : ''">
                <div class="pl-5 flex flex-col items-start">
                    <h2>{{ user.value.username }}</h2>
                    <a href="edit">Edit your profile</a>
                </div>
            </div>
            <a href="/main/feed" class="flex justify-between items-center pt-10 w-[150px]">
                <IconHome :color="url === 'feed' ? 'red' : 'white'" />
                <p class=" text-left w-[100px]">
                    News Feed
                </p>
            </a>
            <a href="/main/movies" class="flex justify-between items-center pt-10 w-[150px]">
                <IconFilm :color="url === 'movies' ? 'red' : 'white'" />
                <p class="text-left w-[100px]">
                    List of movies
                </p>
            </a>
        </div>
        <router-view />
    </div>
</template>