<template>
  <div>
    <div v-if="deviceAttributes">
      <p>Type: {{ deviceAttributes.deviceType }}</p>
      <Status></Status>
      <OLC :id="device" :position="0"></OLC>
      <Mode></Mode>
      <div v-if="deviceAttributes.deviceType === 'Keypad'">
        <KpLED></KpLED>
      </div>
      <Current></Current>
      <Temp></Temp>
      <Events></Events>
      <Log></Log>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAppStore } from '../../stores/app';
import OLC from '@/components/OLC.vue';
import KpLED from '@/components/KpLED.vue';
import Current from '@/components/Current.vue';
import Log from '@/components/Log.vue';

const route = useRoute();
const device = ref(route.params.device);
const appStore = useAppStore();
const deviceAttributes = ref({});

watch(() => route.params.device, (newDevice) => {
  device.value = newDevice;
  fetchAttributes(newDevice);
});

onMounted(() => {
  fetchAttributes(device.value);
});

async function fetchAttributes(deviceId) {
  await appStore.fetchDeviceType(deviceId);
  deviceAttributes.value = appStore.getDeviceAttributes(deviceId);
}


</script>