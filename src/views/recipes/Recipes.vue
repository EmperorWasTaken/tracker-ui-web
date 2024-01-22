<template>
    <div class="recipes-list">
        <Toolbar>
            <template #start>
                <Button @click="addRecipe">
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
import { ref, computed, onMounted } from 'vue';
import { get, post } from '../../helpers/api.js';
import { useUserStore } from '../../stores/user.js';
import RecipesCard from '../../components/recipes/RecipesCard.vue';
import Recipe from '../../components/recipes/Recipe.vue';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import MultiSelect from 'primevue/multiselect';
import InputText from 'primevue/inputtext';
import { useDialog } from 'primevue/usedialog';

const userStore = useUserStore();
const dialog = useDialog();

const selectedTypes = ref([]);
const searchQuery = ref('');
const recipes = ref([]);
const options = ref([]);

const userId = userStore.userId;

onMounted(async () => {
    try {
        const response = await get('feature', 'recipe', null, { userId: userId });
        recipes.value = response.data;
        updateFilterOptions();
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
});

const updateFilterOptions = () => {
    const tagSet = new Set();
    recipes.value.forEach(recipe => {
        recipe.tags.forEach(tag => {
            tagSet.add(tag.type);
        });
    });
    options.value = Array.from(tagSet).map(tag => ({ name: tag, code: tag }));
};

const filteredRecipes = computed(() => {
    return recipes.value.filter(recipe => {
        const selectedTypeNames = selectedTypes.value.map(type => type.name);
        const matchesType = selectedTypeNames.length === 0 || selectedTypeNames.some(typeName => recipe.tags.some(tag => tag.type === typeName));
        const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.value.toLowerCase());
        return matchesType && matchesSearch;
    });
});

const addRecipe = () => {
    dialog.open(Recipe, {
        data: {
        },
        props: {
            header: 'Add New Recipe',
            style: { width: '50vw' },
            isNew: true,
            isEditable: true
        },
        onClose: (options) => {
            const data = options.data;
            if (data) {
                const buttonType = data.buttonType;
                const summary_and_detail = buttonType ? { summary: 'No Product Selected', detail: `Pressed '${buttonType}' button` } : { summary: 'Product Selected', detail: data.name };

                toast.add({ severity: 'info', ...summary_and_detail, life: 3000 });
            }
        }
    });
};
</script>

<style></style>
