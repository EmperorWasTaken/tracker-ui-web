import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: null,
    theme: null
  }),
  actions: {
    setUserId(id) {
      this.userId = id;
    },
    setUserTheme(theme) {
      this.theme = theme;
    }
  },
});
