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
  <header class="bg-black text-white h-screen">
    <NavBar
      :drop-down="dropDown"
      :toggle-drop-down="toggleDropDown"
      :toggle-registration="toggleRegistration"
      :toggle-login="toggleLogin"
      :close-drop-down="closeDropDown"
    />
  </header>
  <div
    class="interstellar flex items-center justify-center h-screen pb-12 relative"
  >
    <div class="font-serif mx-4 p-4 text-center md:p-8">
      <div class="bg-white font-serif text-center">
        <div
          class="absolute text-white flex flex-col items-start top-[500px] left-[300px]"
        >
          <p class="text-3xl">
            — “You have to leave somethig behind to go forward”
          </p>
          <p class="pl-10 text-xl">Interstellar, 2014</p>
        </div>
      </div>
    </div>
  </div>
  <div class="tenembaum flex items-center justify-center h-screen relative">
    <div class="font-serif text-center w-screen">
      <div class="bg-white font-serif text-center">
        <div
          class="absolute text-white flex flex-col items-start top-[500px] left-[300px]"
        >
          <p class="text-3xl">
            — “I think we’re just gonna have to be secretly in love with earch
            other and leave it that”
          </p>
          <p class="pl-10 text-xl">The Royal Tenenbaums,2001</p>
        </div>
      </div>
    </div>
  </div>
  <div class="lotr flex items-center justify-center h-screen relative">
    <div class="font-serif text-center w-screen">
      <div class="bg-white font-serif text-center">
        <div
          class="absolute text-white flex flex-col items-start top-[500px] left-[300px]"
        >
          <p class="text-3xl">
            — “Po-tay-toes! Boil 'em, mash 'em, stick 'em in a stew... Lovely
            big golden chips with a nice piece of fried fish.”
          </p>
          <p class="pl-10 text-xl">The Two Towers,2002</p>
        </div>
      </div>
    </div>
  </div>

  <RegistrationModal
    :modal="registrationModal"
    :close-modal="closeRegistrationModal"
    :epen-email-sent="toggleEmailSent"
    :open-login="toggleLogin"
  />
  <LoginModal
    :modal="loginModal"
    :close-modal="closeLoginModal"
    :toggle-registration="toggleRegistration"
  />
  <EmailSent :modal-open="emailSent" />

  <router-view />
</template>

<style>
.interstellar {
  background: url("src/assets/images/landingpage/interstellar.png") center
    center no-repeat;
  background-attachment: fixed;
}
.tenembaum {
  background: url("src/assets/images/landingpage/tenembaum.png") center center
    no-repeat;
  background-attachment: fixed;
}

.lotr {
  background: url("src/assets/images/landingpage/lotr.png") center center
    no-repeat;
  background-attachment: fixed;
}
</style>
