<template>
    <div class="recipes-list">
      <Button label="Add Recipe" icon="pi pi-plus" class="p-button-success" />
      <div v-for="recipe in recipes" :key="recipe.id">
        <RecipesCard :recipe="recipe" />
      </div>
    </div>
  </template>
<script setup>
import { ref, onMounted } from 'vue';
import RecipesCard from '../../components/recipes/RecipesCard.vue';
import Recipe from '../../components/recipes/Recipe.vue';
import Button from 'primevue/button';



const recipes = ref([
  {
    id: 1,
    title: 'Delicious Pasta',
    author: 'Chef John Doe',
    imageUrl: 'path-to-pasta-image.jpg',
    description: 'A delightful pasta dish with rich flavors...',
    prepTime: '20 mins',
    cookTime: '30 mins',
    servings: 4
  },
  {
    id: 2,
    title: 'Hearty Vegetable Soup',
    author: 'Chef Jane Smith',
    imageUrl: 'path-to-soup-image.jpg',
    description: 'A healthy and warming vegetable soup, perfect for cold days...',
    prepTime: '15 mins',
    cookTime: '40 mins',
    servings: 6
  }
  // Add more recipes as needed
]);

</script>

<style>

</style>