<script setup>
import { onClickOutside } from "@vueuse/core";
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const emailSent = ref(null);
const open = ref(props.modalOpen);
const router = useRoute();

const props = defineProps({
    modalOpen: Boolean,
});

watch(() => props.modalOpen, (newValue) => {
    open.value = newValue;
});

onMounted(() => {
    if (router.path === "/verify") {
        open.value = true;
    }
});

onClickOutside(emailSent, () => {
    open.value = false;
});

</script>


<template>
    <div v-if="open"
        class="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] w-[100vw] h-[100vh] max-w-[100%] z-10 backdrop-blur-sm flex justify-center items-center">
        <div ref="emailSent"
            class="bg-[#222030] w-[600px] h-[400px] text-white flex flex-col items-center justify-evenly ">
            <img src="../assets/images/landingpage/emailsent.png" alt="email_sent" class="">
            <h1 class="text-3xl">Thank you!</h1>
            <p>Please check your email and follow the instructions to
                activate your account.</p>
            <a href="/" class="w-[300px] p-3 bg-[#E31221] mt-3">
                Go to my email
            </a>
        </div>
    </div>
</template>