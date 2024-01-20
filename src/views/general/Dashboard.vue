<template>
  <main class="dashboard-page">
      <CalorieSummary />
      <FoodSelector />
  </main>
</template>

<script setup>
import CalorieSummary from '@/components/tracker/CalorieSummary.vue';
import FoodSelector from '@/components/tracker/FoodSelector.vue';

</script>