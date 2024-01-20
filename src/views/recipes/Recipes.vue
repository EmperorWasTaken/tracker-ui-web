<template>
    <div class="recipes-list">
        <Toolbar>
            <template #start>
                <Button>
                    <i class="pi pi-plus"></i>
                    Add recipe
                </Button>
            </template>
            <template #end>
                <span>
                    <MultiSelect v-model="selectedTypes" display="chip" :options="options" optionLabel="name" placeholder="Filter recipes" :maxSelectedLabels="3" class="w-full md:w-20rem" />
                </span>

                <span class="p-input-icon-left">
                    <InputText v-model="searchQuery" placeholder="Search" />
                </span>
            </template>
        </Toolbar>
        <div v-for="recipe in filteredRecipes" :key="recipe.id">
            <RecipesCard :recipe="recipe" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import RecipesCard from '../../components/recipes/RecipesCard.vue';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import MultiSelect from 'primevue/multiselect';
import InputText from 'primevue/inputtext';

const selectedTypes = ref([]);
const searchQuery = ref('');


const recipes = ref([
    {
        id: 1,
        title: 'Delicious Pasta',
        author: 'Chef John Doe',
        imageUrl: 'path-to-pasta-image.jpg',
        description: 'A delightful pasta dish with rich flavors...',
        prepTime: '20 mins',
        cookTime: '30 mins',
        servings: 4,
        type: 'Pasta'
    },
    {
        id: 2,
        title: 'Hearty Vegetable Soup',
        author: 'Chef Jane Smith',
        imageUrl: 'path-to-soup-image.jpg',
        description: 'A healthy and warming vegetable soup, perfect for cold days...',
        prepTime: '15 mins',
        cookTime: '40 mins',
        servings: 6,
        type: 'Soup'
    }
    // Add more recipes as needed
]);

const options = ref([
    { name: 'Pasta', code: 'P' },
    { name: 'Soup', code: 'S' },
    { name: 'Salad', code: 'S' },
    { name: 'Dessert', code: 'D' },
    { name: 'Beverage', code: 'B' }
]);

const filteredRecipes = computed(() => {
    return recipes.value.filter(recipe => {
        const selectedTypeNames = selectedTypes.value.map(type => type.name);
        const matchesType = selectedTypeNames.length === 0 || selectedTypeNames.includes(recipe.type);
        const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.value.toLowerCase());
        return matchesType && matchesSearch;
    });
});
</script>

<style></style>
