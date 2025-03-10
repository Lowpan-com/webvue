<template>
  <v-btn-toggle v-model="selectedKey" color="deep-orange-accent-3" rounded="0" group>
    <v-btn value="1">
      1
    </v-btn>

    <v-btn value="2">
      2
    </v-btn>

    <v-btn value="3">
      3
    </v-btn>

    <v-btn value="4">
      4
    </v-btn>

    <v-btn value="5">
      6
    </v-btn>

    <v-btn value="6">
      6
    </v-btn>

    <v-btn value="7">
      7
    </v-btn>

    <v-btn value="8">
      8
    </v-btn>

  </v-btn-toggle>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAppStore } from '@/stores/app'

const props = defineProps(['id'])
const appStore = useAppStore()

const selectedKey = ref(0)

watch(selectedKey, (newKey) => {
  if (!appStore.deviceAttributes[props.id]) {
    appStore.deviceAttributes[props.id] = {}
  }
  appStore.deviceAttributes[props.id].kpled = parseInt(newKey)
})
</script>
