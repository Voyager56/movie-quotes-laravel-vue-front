import { defineStore } from "pinia";
import { ref } from "vue";

const userStore = defineStore("userStore", {
  state: () => ({
    user: ref({}),
    userErrors: ref({}),
    language: ref("Eng"),
  }),
  getters: {},
  actions: {
    changeLanguage(lang) {
      this.language.value = lang;
    },
    setUser(user) {
      this.user.value = user;
    },
  },
});

export default userStore;
