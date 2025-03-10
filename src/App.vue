<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, computed } from 'vue'
import { useAppStore } from './stores/app'

export default defineComponent({
  name: 'LowpanApp',
  
  setup() {
    const store = useAppStore()
    const devices = computed(() => store.devices)
    let intervalId: NodeJS.Timeout

    onMounted(() => {
      store.fetchDevices()
      intervalId = setInterval(() => {
        store.fetchDevices()
      }, 60000)
    })

    onUnmounted(() => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    })

    return {
      devices
    }
  }
})
</script>

<style scoped>
.v-app {
  height: 100%;
}
</style>