<template>
    <div>
      <h1>Log</h1>
    </div>
      <pre>{{ log }}</pre>
</template>

<script setup>
import { ref } from 'vue';
import { useAppStore } from '@/stores/app';

const props = defineProps(['id', 'position']);
const appStore = useAppStore();

const log = ref("");

function initializeValues() {
  const deviceAttributes = appStore.getDeviceAttributes(props.id);
  log.value = deviceAttributes.log || "";
  console.log('log.value', deviceAttributes.log);
};

onMounted(() => {
  initializeValues();
});

watch(() => props.id, () => {
  initializeValues();
});

watch(() => appStore.getDeviceAttributes(props.id).log, (newLog) => {
  log.value = newLog || "";
});

</script>