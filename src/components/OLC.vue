<template>
  <v-container class="fill-height">
    <v-responsive class="align-center fill-height mx-auto" max-width="900">
      <div class="d-flex flex-column gap-4">
        <div class="d-flex align-center">
          <span class="me-4">Id is {{ id }}</span>
        </div>
        <div> 
          <v-switch label="Off/On" v-model="onOff" @change="handleOnOffChange"></v-switch>
        </div>
        
        <v-slider 
          label="Level" 
          v-model="level" 
          min=0 
          max=254 
          @end="handleLevelChange"
          class="width-match"
        ></v-slider>
        
        <v-color-picker 
          v-model="color" 
          :swatches="swatches" 
          show-swatches 
          hide-canvas 
          mode="rgb"
          @update:modelValue="handleColorChange"
          class="width-match"
        ></v-color-picker>
      </div>
    </v-responsive>
  </v-container>
</template>

<style scoped>
.width-match {
  width: 300px; /* Or whatever width matches your color picker */
}
</style>

<script setup>
import { ref } from 'vue';
import { useAppStore } from '@/stores/app';
import { debounce } from 'lodash';

const props = defineProps(['id', 'position']);
const appStore = useAppStore();

const swatches = ref([
  ['#FFFFFF', '#FFFF00', '#FF00FF'],
  ['#00FFFF', '#FF0000', '#00FF00'],
  ['#0000FF', '#000000', '#7F7F7F'],
]);

const onOff = ref(false);
const level = ref(0);
const color = ref('#FFFFFF');

function initializeValues() {
  const deviceAttributes = appStore.getDeviceAttributes(props.id);
  onOff.value = deviceAttributes.power || false;
  level.value = deviceAttributes.level || 0;
  const red = deviceAttributes.red !== undefined ? deviceAttributes.red : 255;
  const green = deviceAttributes.green !== undefined ? deviceAttributes.green : 255;
  const blue = deviceAttributes.blue !== undefined ? deviceAttributes.blue : 255;
  color.value = `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)}`;
};

onMounted(() => {
  initializeValues();
});

watch(() => props.id, () => {
  initializeValues();
});

function handleOnOffChange(value) {
  console.log('handleOnOffChange', onOff.value);
  appStore.writeOnOff(props.id, props.position, onOff.value);
}

function handleLevelChange(value) {
  console.log('handleLevelChange', level.value);
  appStore.writeLevel(props.id, props.position, Math.round(level.value));
}

const debouncedWriteColor = debounce((id, position, r, g, b) => {
  appStore.writeColor(id, position, r, g, b);
}, 1000);

function handleColorChange(hex) {
  console.log('handleColorChange', hex);
  hex = hex.replace("#", "");

  // Convert the hex values to decimal
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  debouncedWriteColor(props.id, props.position, r, g, b);
}
</script>