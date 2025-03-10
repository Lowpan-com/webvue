<template>
  <v-container fluid>
    <h3>Temperature</h3>
    <v-sparkline :line-width="lineWidth" :model-value="temperature" max="800" min="350"
      :padding="padding" :smooth="smooth" color="#ffff7f">>
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

const temperature = ref([]);

function initializeValues() {
  const deviceAttributes = appStore.getDeviceAttributes(props.id);
  temperature.value = deviceAttributes.temperature || [1, 2, 3, 4, 5, 6];
  console.log('temperature.value', deviceAttributes.temperature);
};

onMounted(() => {
  initializeValues();
});

watch(() => props.id, () => {
  initializeValues();
});

watch(() => appStore.getDeviceAttributes(props.id).temperature, (newTemp) => {
  temperature.value = newTemp || [];
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
