import { defineStore } from 'pinia';

export const useTrackerStore = defineStore('tracker', {
  state: () => ({
    meals: {
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
    },
    totalCalories: 0,
  }),
  getters: {
    caloriesLeft: (state) => {
      // Assuming you have a daily calorie goal
      const dailyCalorieGoal = 2000;
      return dailyCalorieGoal - state.totalCalories;
    },
  },
  actions: {
    addFoodItem(meal, foodItem, calories) {
      this.meals[meal].push({ foodItem, calories });
      this.totalCalories += calories;
    },
  },
});
