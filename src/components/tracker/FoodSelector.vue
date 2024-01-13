<template>
    <div>
      <h2>Select Meal</h2>
      <Button @click="selectMeal('breakfast')" outlined>Breakfast</Button>
      <br />
      <Button @click="selectMeal('lunch')" outlined>Lunch</Button>
      <br />
      <Button @click="selectMeal('dinner')" outlined>Dinner</Button>
      <!-- More meals if needed -->
      <FoodItem v-if="selectedMeal" :meal="selectedMeal" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import FoodItem from './FoodItem.vue';
  
  const selectedMeal = ref(null);
  
  const selectMeal = (meal) => {
    selectedMeal.value = meal;
  };
  </script>
  
  <style scoped>
  /* Your styles here */
  </style>
  