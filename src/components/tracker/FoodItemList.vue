<template>
    <div>
      <h3>Items in {{ meal }}</h3>
      <ul>
        <li v-for="(item, index) in items" :key="index">
          {{ item.name }} - {{ item.calories }} calories
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    meal: String,
    items: Array
  });
  </script>
  
  <style scoped>
  /* Your styles here */
  </style>
  