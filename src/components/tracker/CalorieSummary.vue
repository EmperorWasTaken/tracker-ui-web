<template>
  <div>
    <h2>Calorie Summary</h2>
    <p>
      Total Calories: {{ totalCalories }}
    </p>
    <p>
      Calories Left: {{ caloriesLeft }}
    </p>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useTrackerStore } from '../../stores/tracker.js';

const selectedData = computed(() => {
  return trackerStore.selectedData;
});


const trackerStore = useTrackerStore();

const totalCalories = computed(() => {
  let total = 0;
  if (selectedData.value) {
    ['breakfast', 'lunch', 'dinner', 'snacks'].forEach(mealType => {
      total += selectedData.value[mealType].reduce((sum, item) => sum + item.calories, 0);
    });
  }
  return total;
});

const caloriesLeft = computed(() => {
  return trackerStore.caloriesLeft(totalCalories.value);
});

</script>

<style scoped>
/* Your styles here */
</style>
