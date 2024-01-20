<template>
    <Button @click="logRecipe">Test</Button>
    <div class="recipe-card">
        <!-- Recipe Image and Title -->
        <Card>
            <template #content>
                <img class="recipe-image" :src="recipe.imageUrl" alt="Recipe Image" />
                <h1 class="recipe-title">{{ recipe.title }}</h1>
                <p class="recipe-author">by {{ recipe.author }}</p>
            </template>
            
        </Card>

        <!-- Key Details -->
        <Card>
            <template #content>
            <div class="recipe-details p-d-flex p-jc-between">
                <Badge :label="`Prep Time: ${recipe.prepTime}`" severity="info" class="p-mr-2" />
                <Badge :label="`Cook Time: ${recipe.cookTime}`" severity="warning" class="p-mr-2" />
                <Badge :label="`Servings: ${recipe.servings}`" severity="success" />
            </div>
        </template>
        </Card>

        <!-- Recipe Description -->
        <Card>
            <template #content>
                <p class="recipe-description">{{ recipe.description }}</p>
            </template>
            
        </Card>

        <!-- Ingredients List -->
        <Card>
            <template #title>Ingredients</template>
            <template #content>
                <ul class="recipe-ingredients">
                <li v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient }}</li>
                </ul>
            </template>
        
        </Card>

        <!-- Cooking Instructions -->
        <Card>
            <template #title>Ingredients</template>
            <template #content>
                <div class="recipe-instructions">
                <p v-for="(step, index) in recipe.instructions" :key="index">Step {{ index + 1 }}: {{ step }}</p>
                </div>
            </template>

        </Card>

        <!-- Nutritional Information -->
        <Card>
            <template #title>Ingredients</template>
            <template #content>
                <p>Calories: {{ recipe.nutrition.calories }}</p>
            <!-- Add more nutritional info here -->
            </template>
        
        </Card>

        <!-- Interactive Elements (Buttons, etc.) -->
        <Card>
            <template #content>
                <Button label="Save Recipe" icon="pi pi-check" class="p-button-success" />
                <Button label="Share" icon="pi pi-share-alt" class="p-button-info" />
            <!-- More buttons as needed -->
            </template>
        </Card>
    </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Badge from 'primevue/badge';

const dialogRef = inject('dialogRef');
const recipe = ref({});

onMounted(() => {
    const recipeId = dialogRef.value.data.id;
    // Fetch the recipe data based on the recipeId
    // For now, let's use a placeholder recipe
    recipe.value = fetchRecipeById(recipeId);
});

// Placeholder function to simulate fetching recipe by ID
function fetchRecipeById(id) {
    // This should be replaced with your actual data fetching logic
    return {
        id: id,
        title: 'Test Recipe',
        author: 'Test Author',
        calories: 100,
        imageUrl: 'https://picsum.photos/200/300',
        description: 'This is a test recipe.',
        prepTime: '10 mins',
        cookTime: '20 mins',
        servings: 4,
        ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
        instructions: ['Instruction 1', 'Instruction 2', 'Instruction 3']
        
        // ...other recipe fields
    };
}

const logRecipe = () => {
    console.log(dialogRef.value);
};
</script>


<style>

</style>
