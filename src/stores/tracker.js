import { defineStore } from 'pinia';

export const useTrackerStore = defineStore('tracker', {
  state: () => ({
    trackedDays: [],
    meals: {
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: [],
    },
    totalCalories: 0,
  }),
  getters: {
    caloriesLeft: (state) => {
      const dailyCalorieGoal = 2000;
      return dailyCalorieGoal - state.totalCalories;
    },
    getTrackedDays: (state) => state.trackedDays,
  },
  actions: {
    addFoodItem(meal, name, calories) {
      this.meals[meal].push({ name, calories });
      this.totalCalories += calories;
    },
    setTrackedDays(data) {
        this.trackedDays = data;
    },
    setMeals(trackedDay) {
      this.meals.breakfast = trackedDay.breakfast || [];
      this.meals.lunch = trackedDay.lunch || [];
      this.meals.dinner = trackedDay.dinner || [];
      this.meals.snacks = trackedDay.snacks || [];
      // Add logic for totalCalories calculation if needed
    },
  },
});
