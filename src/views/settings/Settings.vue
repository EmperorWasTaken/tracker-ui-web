<template>
    <main class="dashboard-page">
        <h1>SETTINGS</h1>
        <div class="card flex justify-content-center">
            <SelectButton v-model="theme" :options="options" />
    </div>
    </main>
</template>

<script setup>
import { ref, watch } from 'vue';
import { usePrimeVue } from 'primevue/config';

const theme = ref('lara-light-teal'); // default theme

const options = [
    { label: 'Light Teal', value: 'lara-light-teal' },
    { label: 'Dark Teal', value: 'lara-dark-teal' },
];

const PrimeVue = usePrimeVue();

const switchTheme = () => {
    const newTheme = theme.value === 'lara-light-teal' ? 'lara-dark-teal' : 'lara-light-teal';
    PrimeVue.changeTheme(newTheme, 'theme-link');
    theme.value = newTheme;
};

watch(theme, (newTheme) => {
    PrimeVue.changeTheme(newTheme, 'theme-link');
});


</script>