// src/authStore.js
import { reactive } from "vue";

export const authStore = reactive({
  user: null,
  setUser(user) {
    this.user = user;
  },
});
