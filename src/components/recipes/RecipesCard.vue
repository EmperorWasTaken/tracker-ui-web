<template>
    <Card style="margin: 10px;">
        <template #content>
            <img :src="recipe.imageUrl" alt="Recipe Image" />
            <h2>{{ recipe.name }}</h2>
            <p>{{ recipe.description }}</p>
            <Button label="View Recipe" @click="goToRecipe(recipe.id)" class="p-button-info"></Button>
        </template>
    </Card>
</template>

<script setup>
import Button from 'primevue/button';
import Recipe from './Recipe.vue';
import Card from 'primevue/card';
import { useDialog } from 'primevue/usedialog';

const props = defineProps({
    recipe: {
        type: Object,
        required: true
    }
});

const dialog = useDialog();

const goToRecipe = (id) => {
    const dialogRef = dialog.open(Recipe, {
        data: { id: id },
        props: {
            header: 'Recipe Details',
            style: { width: '50vw' }
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
