<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <SidebarItem v-if="!item.separator" :item="item" :index="i"></SidebarItem>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<script setup>
import { ref } from 'vue';

import SidebarItem from './SidebarItem.vue';

const model = ref([
    {
        label: 'Dashboard',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    {
        label: 'General',
        items: [
            { label: 'Gym', icon: 'pi pi-fw pi-heart', to: '/gym' },

        ]
    },
    {
        label: 'Nutrition',
        items: [
            { label: 'Tracker', icon: 'pi pi-fw pi-calendar', to: '/tracker' },
            { label: 'Recipes', icon: 'pi pi-fw pi-book', to: '/recipes' },
            { label: 'Test Recipe', icon: 'pi pi-fw pi-book', to: 'recipes/recipe' }

        ]
    }
]);
</script>

<style lang="scss" scoped></style>
