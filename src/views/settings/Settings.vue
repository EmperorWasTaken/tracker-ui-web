<template>
    <main class="dashboard-page">
        <h1>SETTINGS</h1>
        <div class="card flex justify-content-center">
            <SelectButton v-model="theme" :options="options" />
    </div>
    </main>
</template>

<script setup>
import SelectButton from 'primevue/selectbutton';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import { ref, watch } from 'vue';
import { usePrimeVue } from 'primevue/config';

const theme = ref('lara-light-teal');

const options = [
    { label: 'Light Teal', value: 'lara-light-teal' },
    { label: 'Dark Teal', value: 'lara-dark-teal' },
];

const PrimeVue = usePrimeVue();

const switchTheme = (themeName) => {
  const themeLink = document.getElementById('theme-link');
  if (themeLink) {
    themeLink.href = `/themes/${themeName}/theme.css`;
  }
};

watch(theme, (newTheme) => {
    console.log('newTheme', newTheme.value);
    switchTheme(newTheme.value);
});


</script>