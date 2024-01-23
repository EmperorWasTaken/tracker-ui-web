<template>
    <div v-if="!isNew || !isEditable">
        <Button @click="logRecipe">Test</Button>
        <div class="recipe-card">
            <!-- Recipe Image and Title -->
            <Card>
                <template #content>
                    <img class="recipe-image" :src="recipe.imageUrl" alt="Recipe Image" />
                    <h1 class="recipe-title">{{ recipe.name }}</h1>
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
                <template #title>Instructions</template>
                <template #content>
                    <div class="recipe-instructions">
                        <p v-for="(step, index) in recipe.steps" :key="index">Step {{ index + 1 }}: {{ step }}</p>
                    </div>
                </template>
            </Card>

            <!-- Nutritional Information -->
            <Card>
                <template #title>Nutrition</template>
                <template #content>
                    <p>Calories: {{ recipe?.nutrition?.calories }}</p>
                    <p>Fat: {{ recipe?.nutrition?.fat }}</p>
                    <p>Carbs: {{ recipe?.nutrition?.carbs }}</p>
                    <p>Protein: {{ recipe?.nutrition?.protein }}</p>
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
    </div>
    <div v-else>
        <h1>{{ isNew ? 'Add New Recipe' : 'Edit Recipe' }}</h1>
        <form @submit.prevent="saveRecipe">
            <InputText v-model="newRecipe.name" placeholder="Recipe Name" />
            <InputText v-model="newRecipe.author" placeholder="Author" />
            <InputText v-model="newRecipe.prepTime" placeholder="Preparation Time" />
            <InputText v-model="newRecipe.cookTime" placeholder="Cooking Time" />
            <InputText v-model="newRecipe.servings" placeholder="Servings" />
            <Textarea v-model="newRecipe.description" placeholder="Description" ></Textarea>
            <!-- Handling Ingredients -->
            <div v-for="(ingredient, index) in newRecipe.ingredients" :key="index">
                <InputText v-model="ingredient.name" placeholder="Ingredient Name" />
                <InputText v-model="ingredient.amount" placeholder="Amount" />
                <InputText v-model="ingredient.unit" placeholder="Unit" />
                <!-- Add more fields for each ingredient property -->
                <Button icon="pi pi-minus" @click="removeIngredient(index)"></Button>
            </div>
            <Button @click="addIngredient" icon="pi pi-plus">Add Ingredient</Button>

            <!-- Handling Cooking Steps -->
            <!-- Similar structure as ingredients -->
            <div v-for="(step, index) in newRecipe.steps" :key="index">
                <InputText v-model="step.description" placeholder="Step Description" />
                <Button icon="pi pi-minus" @click="removeStep(index)"></Button>
            </div>
            <Button @click="addStep" icon="pi pi-plus">Add Step</Button>
            <!-- Nutritional Information -->
            <!-- Fields for calories, fat, carbs, protein, etc. -->
            <InputText v-model="newRecipe.nutrition.calories" placeholder="Calories" />
            <InputText v-model="newRecipe.nutrition.fat" placeholder="Fat" />
            <InputText v-model="newRecipe.nutrition.carbs" placeholder="Carbs" />
            <InputText v-model="newRecipe.nutrition.protein" placeholder="Protein" />

            <Button label="Save Recipe" type="submit" class="p-button-success" ></Button>
        </form>
    </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import { get, post } from '../../helpers/api.js';
import { useUserStore } from '../../stores/user.js';
import { useField, useForm } from 'vee-validate';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Badge from 'primevue/badge';
import Textarea from 'primevue/textarea';

const dialogRef = inject('dialogRef');
const recipe = ref({
    name: '',
    author: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    description: '',
    ingredients: [],
    steps: [],
    tags: [],  
    nutrition: {
        calories: '',
        fat: '',
        carbs: '',
        protein: ''
    }
});

const newRecipe = ref({
    name: '',
    author: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    description: '',
    ingredients: [],
    steps: [],
    tags: [],  
    nutrition: {
        calories: '',
        fat: '',
        carbs: '',
        protein: ''
    }
});

const userStore = useUserStore();
const userId = userStore.userId;

const { isNew, isEditable } = dialogRef.value.options.props;

const fetchRecipeById = async (id) => {
    if (!dialogRef.value.options.props.isNew) {
        try {
            const response = await get('feature', `recipe/${id}`, null, { userId: userId });
            return response.data;
        } catch (error) {
            console.error('Error fetching recipe:', error);
            return {};
        }
    } else {
        return {};
    }
};

onMounted(async () => {
    const recipeId = dialogRef.value.data.id;
    recipe.value = await fetchRecipeById(recipeId);
});

const logRecipe = () => {
    console.log(dialogRef.value);
};

const addStep = () => {
    newRecipe.value.steps.push({ description: '' });
};

const removeStep = (index) => {
    newRecipe.value.steps.splice(index, 1);
};

const addIngredient = () => {
    newRecipe.value.ingredients.push({ name: '', amount: '', unit: '' });
};

const removeIngredient = (index) => {
    newRecipe.value.ingredients.splice(index, 1);
};

const saveRecipe = async () => {
    try {
        console.log('Saving recipe, with this body ', newRecipe.value);
        const payload = {
            name: newRecipe.value.name,
            description: newRecipe.value.description,
            ingredients: newRecipe.value.ingredients.map((ing) => ({
                name: ing.name,
                amount: ing.amount,
                unit: ing.unit
            })),
            steps: newRecipe.value.steps.map((step) => ({
                description: step.description
            })),
            tags: newRecipe.value.tags.map((tag) => ({
                type: tag.type
            })),
            nutrition: {
                calories: newRecipe.value.nutrition.calories || 0,
                fat: newRecipe.value.nutrition.fat || 0,
                carbs: newRecipe.value.nutrition.carbs || 0,
                protein: newRecipe.value.nutrition.protein || 0
            }
        };

        const response = await post('feature', 'recipe', payload, { userId: userId });
        console.log('Recipe saved', response.data);
        // Close the dialog or redirect user
    } catch (error) {
        console.error('Error saving recipe:', error);
    }
};
</script>

<style></style>
