<template>
  <v-container class="fill-height">
    <v-responsive class="align-centerfill-height mx-auto" max-width="900">
      <div>
        <v-switch label="On/Off"></v-switch>
        <v-slider label="Brightness"></v-slider>
        <v-color-picker :swatches="swatches" show-swatches mode="rgb"></v-color-picker>
      </div>
    </v-responsive>
  </v-container>
</template>

<script >
  export default {
    data: () => ({
      swatches: [
        ['#FFFFFF', '#FFFF00', '#FF00FF'],
        ['#00FFFF', '#FF0000', '#00FF00'],
        ['#0000FF', '#000000', '#7F7F7F'],
      ],
    }),
  }
</script>

<script setup>
defineProps(['id'])
</script>
