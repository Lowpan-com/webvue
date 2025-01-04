<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Lowpan Test</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view> 
    </v-main>
  </v-app>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useAppStore } from "../stores/app";
import { watch } from 'vue';

export default {
  data() {
    return {
      drawer: null,
      items: [],
    };
  },
  created() {
    const appStore = useAppStore()
    const { devices } = storeToRefs(appStore)

    watch(devices, (newDevices) => {
      this.items = newDevices.map(device => ({ title: device.id, to: `/device/${device.id}` }))
    }, { immediate: true })
  }
};
</script>