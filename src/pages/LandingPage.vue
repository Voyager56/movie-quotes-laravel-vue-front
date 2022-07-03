<script setup>
import { ref } from 'vue';
import NavBar from '../components/NavBar.vue';
import ModalForm from '../components/ModalForm.vue';

const dropDown = ref(false);
const modal = ref(false);
const lang = ref('Eng');


const loginFields = [
    {
        type: 'email',
        name: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        rules: 'required|email',
    },
    {
        type: 'password',
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        rules: 'required|min:6',
    },

]

function closeDropDown() {
    dropDown.value = false;
}
function closeModal() {
    modal.value = false;
}

function toggleModal() {
    modal.value = true;
}
function toggleDropDown() {
    dropDown.value = !dropDown.value;
}

function changeLanguage(langueage) {
    lang.value = langueage;
    dropDown.value = false;
}


</script>



<template>
    <header class="bg-black text-white h-[80vh]">
        <NavBar :dropDown="dropDown" :lang="lang" :toggleDropDown="toggleDropDown" :changeLanguage="changeLanguage"
            :toggleModal="toggleModal" :closeDropDown="closeDropDown" />
    </header>

    <ModalForm :modal="modal" :closeModal="closeModal" :fields="loginFields" />

</template>