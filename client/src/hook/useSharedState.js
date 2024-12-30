import { computed, ref } from 'vue';

const state = ref([]);
const current = ref({});
const currentState = computed(() => {
  return state.value.find((item) => {
    if (
      item.type === current.value.type &&
      item.region === current.value.region &&
      item.category === current.value.category
    ) {
      return item;
    }
  });
});
const otherState = ref({});
export const useSharedState = () => {
  return { state, otherState, currentState, current };
};
