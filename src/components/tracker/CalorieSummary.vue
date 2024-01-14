<template>
  <div>
    <h2>Calorie Summary</h2>
    <p>
      Total Calories: {{ trackerStore.totalCalories }}
    </p>
    <p>
      Calories Left: {{ trackerStore.caloriesLeft }}
    </p>
  </div>
</template>

<script setup>
import { useTrackerStore } from '../../stores/tracker.js';


const trackerStore = useTrackerStore();
</script>

<style scoped>
/* Your styles here */
</style>
