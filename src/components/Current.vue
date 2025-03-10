<template>
  <v-container fluid>
    <h3>Current</h3>
    <v-sparkline :line-width="lineWidth" :model-value="current" max="800" min="0"
      :padding="padding" :smooth="smooth" color="#ff76ff">>
      <template v-slot:label="item">
            {{ item.value }}
          </template>
    </v-sparkline>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useAppStore } from '@/stores/app';

const props = defineProps(['id', 'position']);
const appStore = useAppStore();

const current = ref([]);

function initializeValues() {
  const deviceAttributes = appStore.getDeviceAttributes(props.id);
  current.value = deviceAttributes.current || [1, 2, 3, 4, 5, 6];
  console.log('current.value', deviceAttributes.current);
};

onMounted(() => {
  initializeValues();
});

watch(() => props.id, () => {
  initializeValues();
});

watch(() => appStore.getDeviceAttributes(props.id).current, (newCurrent) => {
  current.value = newCurrent || [];
});

const padding = ref(8);
const smooth = ref(true);
const lineWidth = ref(2);
</script>

<style scoped>
  .switch {
    position: relative;
    top: -12px;
  }
</style>
