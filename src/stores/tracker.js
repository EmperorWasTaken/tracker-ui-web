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
    addFoodItem(meal, name, calories) {
      this.meals[meal].push({ name, calories });
      this.totalCalories += calories;
    },

    setMeals(data) {
        // Assuming 'data' is the array of tracked days
        data.forEach(trackedDay => {
          // Update each meal type with the corresponding items from trackedDay
          // You might need to adjust this based on your data structure
          this.meals.breakfast = trackedDay.breakfast || [];
          this.meals.lunch = trackedDay.lunch || [];
          this.meals.dinner = trackedDay.dinner || [];
          this.meals.snack = trackedDay.snacks || [];
          // Calculate total calories if needed
        });
      },

  },
});
