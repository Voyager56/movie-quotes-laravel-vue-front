<script setup>
import { ref, onMounted } from "vue";
import NavBar from "../components/NavBar.vue";
import EmailSent from "../components/EmailSent.vue";
import userStore from "../store/index";
import { storeToRefs } from "pinia";
import LoginModal from "../components/LoginModal.vue";
import RegistrationModal from "../components/RegistrationModal.vue";
import { useRoute } from "vue-router";



const dropDown = ref(false);
const registrationModal = ref(false);
const loginModal = ref(false);
const emailSent = ref(false);
const store = userStore();
const { userErrors } = storeToRefs(store);
const route = useRoute();



onMounted(() => {
  const token = route.fullPath.split("token=")[1];
  if (token) {
    localStorage.token = token;
    window.location.href = "/main/feed";
  }
});

function closeDropDown() {
  dropDown.value = false;
}
function closeRegistrationModal() {
  registrationModal.value = false;
  userErrors.value = {};

}
function closeLoginModal() {
  loginModal.value = false;
  userErrors.value = {};
}

function toggleRegistration() {
  registrationModal.value = true;
}
function toggleLogin() {
  loginModal.value = true;
}
function toggleDropDown() {
  dropDown.value = !dropDown.value;
}
function toggleEmailSent() {
  emailSent.value = true;
}

</script>

<template>


  <header class="bg-black text-white h-[80vh] relative">
    <NavBar :dropDown="dropDown" :toggleDropDown="toggleDropDown" :toggleRegistration="toggleRegistration"
      :toggleLogin="toggleLogin" :closeDropDown="closeDropDown" />
    <div class="absolute">
      <img src="../assets/images/landingpage/topshadow.png" class="absolute w-[100vw] h-[300px]" alt="">
      <img src="../assets/images/landingpage/leftshadow.png" class="absolute h-[1200px] w-[500px]" alt="">
      <img src="../assets/images/landingpage/interstellar.png" alt="interstellar">
      <div class="absolute text-white flex flex-col items-start top-[500px] left-[300px]" data-aos="fade-up">
        <p class="text-3xl">— “You have to leave somethig
          behind to go forward”</p>
        <p class="pl-10 text-xl">Interstellar, 2014</p>
      </div>
    </div>
    <div class="absolute mt-[62%]" data-aos="fade-up">
      <img src="../assets/images/landingpage/topshadow.png" class="absolute w-[100vw] h-[300px]" alt="">
      <img src="../assets/images/landingpage/leftshadow.png" class="absolute h-[1200px] w-[500px]" alt="">
      <img src="../assets/images/landingpage/interstellar.png" alt="interstellar">
      <div class="absolute text-white flex flex-col items-start top-[500px] left-[300px]">
        <p class="text-3xl">— “You have to leave somethig
          behind to go forward”</p>
        <p class="pl-10 text-xl">Interstellar, 2014</p>
      </div>
    </div>
  </header>


  <RegistrationModal :modal="registrationModal" :closeModal="closeRegistrationModal" :epenEmailSent="toggleEmailSent" />
  <LoginModal :modal="loginModal" :closeModal="closeLoginModal" />
  <EmailSent :modalOpen="emailSent" />

  <router-view />

</template >


<style>
</style>