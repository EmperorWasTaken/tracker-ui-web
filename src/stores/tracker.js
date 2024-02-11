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
    selectedDayIndex: 0,
  }),
  getters: {
    caloriesLeft: (state) => (totalCalories) => {
        const dailyCalorieGoal = 2000;
        return dailyCalorieGoal - totalCalories;
      },
    getTrackedDays: (state) => state.trackedDays,
    selectedData: (state) => {
      if(state.trackedDays.length > 0 && state.trackedDays.length > state.selectedDayIndex) {
        return state.trackedDays[state.selectedDayIndex];
      }
      return undefined;
    },
  },
  actions: {
    addFoodItem(meal, name, calories) {
      this.meals[meal].push({ name, calories });
      this.totalCalories += calories;
    },
    setTrackedDays(data) {
        console.log("Setting tracked days with data:", data);
        this.trackedDays = data;
    },
    setMeals(trackedDay) {
      this.meals.breakfast = trackedDay.breakfast || [];
      this.meals.lunch = trackedDay.lunch || [];
      this.meals.dinner = trackedDay.dinner || [];
      this.meals.snacks = trackedDay.snacks || [];
      // Add logic for totalCalories calculation if needed
    },
    selectDay(index) {
      if(index >= 0 && index < this.trackedDays.length) {
        this.selectedDayIndex = index;
      }
    }
  },
});
