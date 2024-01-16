<template>
    <main class="dashboard-page">
        <h1>SETTINGS</h1>
        <div class="card flex justify-content-center">
            <SelectButton @click="toggleDark()" v-model="theme" :options="options" />
            
    </div>
    <Button @click="selectLightTheme()" outlined>LIGHT</Button>
    <Button @click="selectDarkTheme()" outlined>DARK</Button>
    </main>
</template>

<script setup>
import SelectButton from 'primevue/selectbutton';
import Button from 'primevue/button';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import { ref, watch } from 'vue';
import { usePrimeVue } from 'primevue/config';
import { useDark, useToggle } from '@vueuse/core';

const theme = ref('lara-light-teal');

const isDark = useDark();
const toggleDark = useToggle(isDark);
















const options = [
    { label: 'Light Teal', value: 'lara-light-teal' },
    { label: 'Dark Teal', value: 'lara-dark-teal' },
];

const PrimeVue = usePrimeVue();

const selectLightTheme = () => {
    // 1. Current theme name
    // 2. Next theme name
    // 3. id of <link>, what reference to where set theme css file
    console.log('selectLightTheme');
    PrimeVue.changeTheme('lara-dark-purple', 'lara-light-teal', 'theme-link', () => {});    
}

// if current theme is light
const selectDarkTheme = () => {
    // 1. Current theme name
    // 2. Next theme name
    // 3. id of <link>, what reference to where set theme css file
    console.log('selectDarkTheme');
    PrimeVue.changeTheme('lara-light-purple', 'lara-dark-teal', 'theme-link', () => {});
}



watch(theme, (newTheme) => {
    console.log('newTheme', newTheme.value);
    switchTheme(newTheme.value);
});


</script>