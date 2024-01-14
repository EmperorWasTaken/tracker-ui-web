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

    <div class="card flex flex-wrap gap-3 p-fluid">
      <h2>Today's Meals</h2>
      <div class="flex-auto">
        <label for="icondisplay" class="font-bold block mb-2"> Icon Display </label>
        <Calendar v-model="selectedDate" showIcon iconDisplay="input" />
      </div>
      <div v-if="selectedData">
        <h3>{{ selectedData.date }}</h3>
        <p>Breakfast:</p>
        <ul>
          <li v-for="(item, index) in selectedData.breakfast" :key="index">
            {{ item.name }}: {{ item.calories }} calories
          </li>
        </ul>
        <p>Lunch:</p>
        <ul>
          <li v-for="(item, index) in selectedData.lunch" :key="index">
            {{ item.name }}: {{ item.calories }} calories
          </li>
        </ul>
        <p>Dinner:</p>
        <ul>
          <li v-for="(item, index) in selectedData.dinner" :key="index">
            {{ item.name }}: {{ item.calories }} calories
          </li>
        </ul>
        <p>Snacks:</p>
        <ul>
          <li v-for="(item, index) in selectedData.snacks" :key="index">
            {{ item.name }}: {{ item.calories }} calories
          </li>
        </ul>
        <!-- Similar for lunch, dinner, and snacks -->
      </div>
    </div>

    <FoodItem v-if="selectedMeal" :meal="selectedMeal" />

    <br />
    <Button @click="saveTrackedDay" outlined>Save</Button>
    <br />
    <Button @click="consoleLog" outlined>Log</Button>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useTrackerStore } from "../../stores/tracker.js";
import { useUserStore } from "../../stores/user.js";
import { get, post } from "../../helpers/api.js";
import Calendar from 'primevue/calendar';
import FoodItem from "./FoodItem.vue";
import FoodItemList from "./FoodItemList.vue";

const trackerStore = useTrackerStore();
const userStore = useUserStore();
const selectedMeal = ref(null);
const selectedDate = ref(new Date());
const buttondisplay = ref();
const icondisplay = ref();
const templatedisplay = ref();
const today = new Date().toISOString().split("T")[0];

const selectMeal = (meal) => {
  selectedMeal.value = meal;
};

const selectedData = computed(() => {
  const formattedDate = toLocalISOString(selectedDate.value);
  return trackerStore.trackedDays?.find(
    (trackedDay) => trackedDay.date === formattedDate
  );
});

watch(selectedDate, (newValue, oldValue) => {
  console.log("Selected date changed to:", toLocalISOString(newValue));
});

const todaysData = computed(() => {
  return trackerStore.trackedDays?.find(
    (trackedDay) => trackedDay.date === today
  );
});

const consoleLog = () => {
  console.log("TodaysData", todaysData.value);
};

const saveTrackedDay = async () => {
  const formattedDate = toLocalISOString(selectedDate.value);
  const trackedDay = {
    date: formattedDate,
    breakfast: trackerStore.meals.breakfast,
    lunch: trackerStore.meals.lunch,
    dinner: trackerStore.meals.dinner,
    snacks: trackerStore.meals.snacks,
  };

  try {
    const response = await post("feature", "tracker", trackedDay, {
      userId: userStore.userId,
    });
    console.log("Tracked Day saved:", response.data);
  } catch (error) {
    console.error("Error saving tracked day:", error);
  }
};
function toLocalISOString(date) {
  const offset = date.getTimezoneOffset();
  const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
  return adjustedDate.toISOString().split('T')[0];
}
</script>

<style scoped>
/* Your styles here */
</style>
