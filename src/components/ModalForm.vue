<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core'
import { Form, Field, ErrorMessage } from 'vee-validate';


const modalRef = ref(null);

const props = defineProps({
    modal: Boolean,
    closeModal: Function,
    fields: Array,
});

onClickOutside(modalRef, () => {
    props.closeModal();
});


</script>


<template>
    <Form @submit.prevent="closeModal" v-slot="{ values }">
        <div v-if="modal"
            class="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] w-[100vw] h-[100vh] max-w-[100%] z-10 backdrop-blur-sm flex justify-center items-center ">
            <div ref="modalRef" class="bg-[#222030] w-[600px] text-white flex flex-col items-center">
                <h1 class="py-6 text-2xl">Create an account</h1>
                <p class="text-[#6C757D]">Start your journey!</p>
                <div v-for="(field, i) in fields" :key="i" class="flex justify-center flex-col items-center  py-3">
                    <div class="flex w-[300px]">
                        <label class="text-left" :for="field.name">{{ field.label }}</label>
                        <p class="text-red-400">*</p>
                    </div>
                    <Field :type="field.type" :name="field.name" :rules="field.rules"
                        class="py-2 pl-4 rounded-sm w-[300px] text-[#6C757D]" />
                    <ErrorMessage :name="field.name" class="text-red-400 text-left w-[300px] h-[0px]" />
                </div>
                <button class="w-[300px] p-3 bg-[#E31221] mt-3">Get Started</button>
                <button class="w-[300px] p-3 border border-1-white mt-3 mb-10">Sign up with Google</button>
            </div>
        </div>
    </Form>
</template>