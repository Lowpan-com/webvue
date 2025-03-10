<template>
  <v-btn-toggle v-model="mode" color="deep-orange-accent-3" rounded="0" group>
    <v-btn value="Switch">
      Switch
    </v-btn>
    <v-btn value="MLV">
      MLV
    </v-btn>
    <v-btn value="ELV">
      ELV
    </v-btn>
    <v-btn value="PWM">
      PWM
    </v-btn>
    <v-btn value="Smartbulb">
      Smartbulb
    </v-btn>
    <v-btn value="NoLoad">
      No Load
    </v-btn>

  </v-btn-toggle>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAppStore } from '@/stores/app'

const props = defineProps(['id'])
const appStore = useAppStore()

const mode = ref('Switch') // Default mode

watch(mode, (newMode) => {
  console.log('Mode changed to:', newMode)
  appStore.writeMode(props.id, newMode)
})
</script>