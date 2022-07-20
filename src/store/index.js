import { defineStore } from "pinia";
import { ref } from "vue";

const userStore = defineStore("userStore", {
  state: () => ({
    user: ref({}),
    userErrors: ref({}),
  }),
  getters: {},
  actions: {},
});

export default userStore;
