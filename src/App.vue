<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useAppStore } from "./stores/app";

const store = useAppStore();

let intervalId
onMounted(() => {
  store.fetchDevices();
  //intervalId = setInterval(() => {
    //store.fetchDevices();
  //}, 60000)
})

onUnmounted(() => clearInterval(intervalId))

const devices = computed(() => {
  return store.devices;
});

</script>
