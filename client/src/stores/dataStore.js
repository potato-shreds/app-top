import { ref } from "vue";
import { defineStore } from "pinia";

export const useDataStore = defineStore("data", () => {
  const category = ref([
    "Business",
    "Education",
    "Entertainment",
    "Food & Drink",
    "Health & Fitness",
    "Lifestyle",
    "Music",
    "Photo & Video",
    "Productivity",
    "Reference",
    "Social Networking",
    "Travel",
    "Utilities",
  ]);
  const headerTitle = ref({});

  return {
    category,
    headerTitle,
  };
});
