<template>
  <div>
    <div v-if="deviceAttributes">
      <p>Type: {{ deviceAttributes.deviceType }}</p>
      <OLC :id="device" :position="deviceAttributes.kpled || 0"></OLC>
      <Mode :id="device"></Mode>
      <div v-if="deviceAttributes.deviceType === 'Keypad'">
        <KpLED :id="device"></KpLED>
      </div>
      <div v-if="deviceAttributes.deviceType === 'Screen'">
        <LCD :id="device"></LCD>
      </div>
      <OTA :id="device"></OTA>
      <Current :id="device"></Current>
      <Temp :id="device"></Temp>
      <Events :id="device"></Events>
      <Log :id="device"></Log>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAppStore } from '../../stores/app';
import OTA from '@/components/OTA.vue';
import OLC from '@/components/OLC.vue';
import KpLED from '@/components/KpLED.vue';
import LCD from '@/components/LCD.vue';
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

let intervalLog
let intervalSensor
onMounted(() => {
  fetchAttributes(device.value);
  intervalLog = setInterval(() => {
    appStore.fetchLog(device.value);
  }, 2000)
  intervalSensor = setInterval(() => {
    appStore.fetchCurrent(device.value);
    appStore.fetchTemperature(device.value);
  }, 1000)
});

onUnmounted(() => {
  clearInterval(intervalLog)
  clearInterval(intervalSensor)
})

async function fetchAttributes(deviceId) {
  await appStore.fetchDeviceType(deviceId);
  deviceAttributes.value = appStore.getDeviceAttributes(deviceId);
}



</script>