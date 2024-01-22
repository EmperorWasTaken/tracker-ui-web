import { defineStore } from 'pinia';

export const useRecipeStore = defineStore('recipes', {
    state: () => ({
        recipes: [],
    }),
    actions: {
        async fetchRecipes(userId) {
            try {
                const response = await get('feature', 'recipe', null, { userId: userId });
                this.recipes = response.data;
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        },
        async fetchAllRecipes(userId) {
            try {
                const response = await get('feature', 'recipe', null, { userId: userId });
                this.recipes = response.data;
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        },
        addRecipe(recipe) {
            this.recipes.push(recipe);
        },
        
    },
    getters: {
        filteredRecipes: (state) => (searchQuery, selectedTypes) => {
            return state.recipes.filter(recipe => {
                const matchesType = selectedTypes.length === 0 || selectedTypes.some(typeName => recipe.tags.some(tag => tag.type === typeName));
                const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesType && matchesSearch;
            });
        },
        
    },
});
