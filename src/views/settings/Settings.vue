<template>
    <main class="dashboard-page">
        <h1>SETTINGS</h1>
        <div class="card flex justify-content-center">
            <Button @click="toggleDark()" outlined>{{ buttonText }}</Button>
        </div>
    </main>
</template>

<script setup>
import Button from 'primevue/button';
import 'primevue/resources/primevue.min.css';
import { supabase } from '../../supabase/init.js';
import { useUserStore } from '../../stores/user.js';
import 'primeicons/primeicons.css';
import { ref, computed } from 'vue';
import { useDark } from '@vueuse/core';

const isDark = useDark();
const userStore = useUserStore();

const lightTheme = 'light-theme';
const darkTheme = 'dark-theme';

const storedTheme = userStore.theme;
isDark.value = storedTheme === darkTheme;

const buttonText = computed(() => (isDark.value ? 'LIGHT' : 'DARK'));

const toggleDark = () => {
    const newTheme = isDark.value ? lightTheme : darkTheme;
    switchTheme(newTheme);
    isDark.value = !isDark.value;
    updateThemeData();
};

const switchTheme = (theme) => {
    const themeLink = document.getElementById('theme-link');
    if (themeLink) {
        const newThemeUrl = `./themes/styles/${theme}.css`;
        themeLink.setAttribute('href', newThemeUrl);
    }
};


const updateThemeData = async () => {
    const userMetadata = {
        theme: isDark.value ? darkTheme : lightTheme
    };
    userStore.setUserTheme(userMetadata.theme);

    await supabase.auth.update({
        data: userMetadata,
        options: { refresh: true }
    });
};

switchTheme(storedTheme);
</script>
