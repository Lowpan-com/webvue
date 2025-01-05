<template>
  <v-container class="fill-height">
    <v-responsive class="align-center fill-height mx-auto" max-width="900">
      <div>
        Id is {{ id }}
        <v-switch label="On/Off" v-model="onOff" @change="handleOnOffChange"></v-switch>
        <v-slider label="Brightness"></v-slider>
        <v-color-picker :swatches="swatches" show-swatches mode="rgb"></v-color-picker>
      </div>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useAppStore } from '@/stores/app';

const props = defineProps(['id', 'position']);
const appStore = useAppStore();

const swatches = ref([
  ['#FFFFFF', '#FFFF00', '#FF00FF'],
  ['#00FFFF', '#FF0000', '#00FF00'],
  ['#0000FF', '#000000', '#7F7F7F'],
]);

const onOff = ref(false);

function handleOnOffChange(value) {
  console.log('handleOnOffChange', onOff.value);
  appStore.writeOnOff(props.id, props.position, onOff.value ? 1 : 0);
}
</script>