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
import 'primeicons/primeicons.css';
import { ref, computed } from 'vue';
import { useDark } from '@vueuse/core';

const isDark = useDark();

const lightTheme = 'light-theme';
const darkTheme = 'dark-theme';

const storedTheme = localStorage.getItem('theme') || lightTheme;
isDark.value = storedTheme === darkTheme;

const buttonText = computed(() => (isDark.value ? 'LIGHT' : 'DARK'));

const toggleDark = () => {
    const newTheme = isDark.value ? lightTheme : darkTheme;
    switchTheme(newTheme);
    isDark.value = !isDark.value;
    localStorage.setItem('theme', newTheme);
};

const switchTheme = (theme) => {
    const themeLink = document.getElementById('theme-link');
    if (themeLink) {
        const newThemeUrl = `./themes/styles/${theme}.css`;
        themeLink.setAttribute('href', newThemeUrl);
    }
};

switchTheme(storedTheme);
</script>
