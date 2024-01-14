<template>
  <div class="app" v-if="user">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Content -->
    <router-view />
  </div>
  <div v-else>
    <Login />
  </div>
</template>

<script setup>
import Sidebar from "./components/general/Sidebar.vue";
import { ref, onMounted } from "vue";
import { supabase } from "./supabase/init.js";
import { useUserStore } from "./stores/user.js";
import { useTrackerStore } from './stores/tracker.js';
import { get, post } from './helpers/api.js';
import Login from "./views/user/Login.vue";

const userStore = useUserStore();
const trackerStore = useTrackerStore();
const user = ref(null);

onMounted(() => {
  user.value = supabase.auth.user();
  if (user.value) {
    userStore.setUserId(user.value.id);
	fetchAllTrackedDay();
  }

  supabase.auth.onAuthStateChange((event, session) => {
    user.value = session?.user ?? null;
    if (user.value) {
      userStore.setUserId(user.value.id);
    } else {
      userStore.setUserId(null);
    }
  });

  console.log("user", user.value);
});

const fetchAllTrackedDay = async () => {
  try {
    const response = await get('feature', 'tracker/getAll', null, { userId: userStore.userId });
    console.log('All Tracked Day fetched:', response.data);
    // Check if the response data is an array
    if (Array.isArray(response.data)) {
      trackerStore.setTrackedDays(response.data);
    } else {
      // If the data is not an array, set an empty array
      trackerStore.setTrackedDays([]);
      console.log('No tracked day found or data format is incorrect');
    }
  } catch (error) {
    console.error('Error fetching all tracked day:', error);
  }
};

</script>

<style lang="scss">
:root {
  --primary: #4ade80;
  --primary-alt: #22c55e;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 300px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Fira sans", sans-serif;
}

body {
  background: var(--light);
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.app {
  display: flex;

  main {
    flex: 1 1 0;
    padding: 2rem;

    @media (max-width: 1024px) {
      padding-left: 6rem;
    }
  }
}
</style>
