<template>
    <div>
      <h3>Add Food to {{ meal }}</h3>
      <!-- Form to add food item -->
      <input type="text" placeholder="Food Item" v-model="foodItem" />
      <input type="number" placeholder="Calories" v-model="calories" />
      <button @click="addFoodItem">Add</button>
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue';
import { useTrackerStore } from '../../stores/tracker.js';

const props = defineProps({
  meal: String
});

const trackerStore = useTrackerStore();
const foodItem = ref('');
const calories = ref(0);

const addFoodItem = () => {
  trackerStore.addFoodItem(props.meal, foodItem.value, Number(calories.value));
  foodItem.value = '';
  calories.value = 0;
};
</script>
  
  <style scoped>
  /* Your styles here */
  </style>
  