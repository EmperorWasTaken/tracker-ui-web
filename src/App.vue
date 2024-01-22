<template>
    <div class="app" v-if="user">
        <!-- Content -->
        <router-view />
    </div>
    <div v-else>
        <Login />
    </div>
    <Toast />
    <DynamicDialog />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { supabase } from './supabase/init.js';
import { useUserStore } from './stores/user.js';
import { useTrackerStore } from './stores/tracker.js';
import { get, post } from './helpers/api.js';
import Login from './views/user/Login.vue';
import { useLayout } from './layout/composables/layout';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const trackerStore = useTrackerStore();
const user = ref(null);



const { changeThemeSettings } = useLayout();

const onChangeTheme = (theme) => {
    const elementId = 'theme-link';
    const linkElement = document.getElementById(elementId);
    const newThemeUrl = linkElement.getAttribute('href').replace(/themes\/.*?\/theme.css/, `themes/${theme}/theme.css`);
    linkElement.setAttribute('href', newThemeUrl);
    changeThemeSettings(theme);
};

const switchTheme = (theme) => {
  const themeLink = document.getElementById('theme-link');
  if (themeLink) {
    const newThemeUrl = `/themes/styles/${theme}.css`;
    themeLink.setAttribute('href', newThemeUrl);
  }
};
const storedTheme = localStorage.getItem('theme')  ||"light-theme";

onMounted(async () => {
    switchTheme(storedTheme);
    const session = supabase.auth.session();
    user.value = session?.user || null;

    if (!user.value) {
        router.push({ name: 'Login' });
    } else {
        userStore.setUserId(user.value.id);
        fetchAllTrackedDay();
        subscribeToTrackedDayChanges();
    }

    supabase.auth.onAuthStateChange((event, session) => {
        user.value = session?.user ?? null;
        if (user.value) {
            userStore.setUserId(user.value.id);
        } else {
            userStore.setUserId(null);
        }
    });

    console.log('user', user.value);
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

const subscribeToTrackedDayChanges = () => {
    supabase
        .from('tracked_day')
        .on('*', (payload) => {
            console.log('Change received!', payload);
            fetchAllTrackedDay();
        })
        .subscribe();
};

onUnmounted(() => {
    supabase.removeSubscription(supabase.getSubscriptions()[0]);
});
</script>

<style lang="scss">

</style>
