<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { Form, Field, ErrorMessage } from "vee-validate";
import instance from "../config/axios/index"
import IconLoading from "./icons/IconLoading.vue";
import userStore from "../store/index"
import { storeToRefs } from "pinia";

const modalRef = ref(null);
const loading = ref(false);
const store = userStore();
const { userErrors } = storeToRefs(store);

const props = defineProps({
    modal: Boolean,
    closeModal: Function,
    epenEmailSent: Function,
});

async function handleSubmit(data) {
    loading.value = true;
    userErrors.value = {};
    instance
        .post("/api/register", {
            username: data.username,
            email: data.email,
            password: data.password,
            password_confirmation: data["confirm password"],
        })

        .then((response) => {
            console.log(response.data.status);
            props.epenEmailSent()
            props.closeModal();
        })
        .catch((err) => {
            userErrors.value =
                Object.keys(err.response.data.errors).length > 0
                    ? err.response.data.errors
                    : [];
            loading.value = false;

        });
}
onClickOutside(modalRef, () => {
    props.closeModal();
});

const googleCallback = () => {
    instance.get("/auth/google/redirect").then(
        (response) => {
            console.log(response);
        }
    )
}
</script>

<template>
    <div v-if="modal"
        class="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] w-[100vw] h-[100vh] max-w-[100%] z-10 backdrop-blur-sm flex justify-center items-center">
        <div role="status" v-if="loading">
            <IconLoading />
        </div>
        <div v-else ref="modalRef" class="bg-[#222030] w-[600px] text-white flex flex-col items-center ">
            <Form v-slot="{ values, meta }" @submit.prevent="closeModal">
                <h1 class="py-6 text-2xl">Create an account</h1>
                <p class="text-[#6C757D]">Start your journey!</p>
                <div class="flex justify-center flex-col items-center py-3">
                    <div class="flex w-[300px]">
                        <label class="text-left" for="username">Name</label>
                        <p class="text-red-400">*</p>
                    </div>
                    <Field type="username" name="username" rules="required|min:3|max:15"
                        placeholder="At least 3 & max.15 lower case characters"
                        class="py-2 pl-4 rounded-sm w-[300px] text-[#6C757D]" />
                    <div v-if="userErrors">
                        <div v-for="error in userErrors[`username`]" :key="error"
                            class="text-red-400 text-left w-[300px] h-[25px]">{{
                                    error
                            }}</div>
                    </div>
                    <ErrorMessage name="username" class="text-red-400 text-left w-[300px] h-[25px]" />
                </div>
                <div class="flex justify-center flex-col items-center py-3">
                    <div class="flex w-[300px]">
                        <label class="text-left" for="email">Email</label>
                        <p class="text-red-400">*</p>
                    </div>
                    <Field type="email" name="email" rules="required|email" placeholder="Enter your email"
                        class="py-2 pl-4 rounded-sm w-[300px] text-[#6C757D]" />
                    <div v-if="userErrors">
                        <div v-for="error in userErrors[`email`]" :key="error"
                            class="text-red-400 text-left w-[300px] h-[25px]">{{
                                    error
                            }}</div>
                    </div>
                    <ErrorMessage name="email" class="text-red-400 text-left w-[300px] h-[25px]" />
                </div>
                <div class="flex justify-center flex-col items-center py-3">
                    <div class="flex w-[300px]">
                        <label class="text-left" for="password">Password}</label>
                        <p class="text-red-400">*</p>
                    </div>
                    <Field type="password" name="password" rules="required|min:8|max:15"
                        placeholder="At least 8 & max.15 lower case characters"
                        class="py-2 pl-4 rounded-sm w-[300px] text-[#6C757D]" />
                    <div v-if="userErrors">
                        <div v-for="error in userErrors[`password`]" :key="error"
                            class="text-red-400 text-left w-[300px] h-[25px]">{{
                                    error
                            }}</div>
                    </div>
                    <ErrorMessage name="password" class="text-red-400 text-left w-[300px] h-[25px]" />
                </div>
                <div class="flex justify-center flex-col items-center py-3">
                    <div class="flex w-[300px]">
                        <label class="text-left" for="confirm password">Password Confirmation</label>
                        <p class="text-red-400">*</p>
                    </div>
                    <Field type="password" name="confirm password" rules="confirmed:@password"
                        placeholder="Confirm password" class="py-2 pl-4 rounded-sm w-[300px] text-[#6C757D]" />
                    <div v-if="userErrors">
                        <div v-for="error in userErrors[`confirm password`]" :key="error"
                            class="text-red-400 text-left w-[300px] h-[25px]">{{
                                    error
                            }}</div>
                    </div>
                    <ErrorMessage name="confirm password" class="text-red-400 text-left w-[300px] h-[25px]" />
                </div>
                <button :disabled="!meta.valid" :class="!meta.valid ? `text- gray - 700` : `text - white`"
                    class="w-[300px] p-3 bg-[#E31221] mt-3" @click="handleSubmit(values)">Get Started</button>
            </Form>
            <button @click="googleCallback" style="display: flex"
                class=" flex w-[300px] p-3 border border-1-white mt-3 mb-10 items-center justify-center">
                <img src="../assets/logos/google.png" alt="google-logo" class="pr-3">
                <div>
                    Sign up with Google</div>
            </button>

        </div>
    </div>
</template>
