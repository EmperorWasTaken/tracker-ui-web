<template>
  <div>
    <h2>Select Meal</h2>
    <Button @click="selectMeal('breakfast')" outlined>Breakfast</Button>
    <br />
    <Button @click="selectMeal('lunch')" outlined>Lunch</Button>
    <br />
    <Button @click="selectMeal('dinner')" outlined>Dinner</Button>
    <!-- More meals if needed -->

    <FoodItemList
      v-if="selectedMeal"
      :items="trackerStore.meals[selectedMeal]"
    />

    <FoodItem v-if="selectedMeal" :meal="selectedMeal" />

    <br />
    <Button @click="saveTrackedDay" outlined>Save</Button>
    <br />
    <Button @click="fetchTrackedDay" outlined>Fetch</Button>
    <br />
    <Button @click="fetchAllTrackedDay" outlined>Fetch All</Button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTrackerStore } from '../../stores/tracker.js';
import { useUserStore } from '../../stores/user.js';
import { get, post } from '../../helpers/api.js';
import FoodItem from "./FoodItem.vue";
import FoodItemList from "./FoodItemList.vue";

const trackerStore = useTrackerStore();
const userStore = useUserStore();
const selectedMeal = ref(null);

const selectMeal = (meal) => {
  selectedMeal.value = meal;
};

const saveTrackedDay = async () => {
  const trackedDay = {
    date: new Date().toISOString().split('T')[0],
    breakfast: trackerStore.meals.breakfast,
    lunch: trackerStore.meals.lunch,
    dinner: trackerStore.meals.dinner,
    snacks: trackerStore.meals.snacks,
  };

  try {
    const response = await post('feature', 'tracker', trackedDay, { userId: userStore.userId });
    console.log('Tracked Day saved:', response.data);
  } catch (error) {
    console.error('Error saving tracked day:', error);
  }
};

const fetchTrackedDay = async () => {
  try {
    const response = await get('feature', 'tracker', null ,{ userId: userStore.userId });
    console.log('Tracked Day fetched:', response.data);
    // trackerStore.setMeals(response.data);
  } catch (error) {
    console.error('Error fetching tracked day:', error);
  }
};

const fetchAllTrackedDay = async () => {
  try {
    const response = await get('feature', 'tracker/getAll', null ,{ userId: userStore.userId });
    console.log('All Tracked Day fetched:', response.data);
    // trackerStore.setMeals(response.data);
  } catch (error) {
    console.error('Error fetching all tracked day:', error);
  }
};

</script>

<style scoped>
/* Your styles here */
</style>
