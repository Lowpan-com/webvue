<template>
  <v-btn-toggle v-model="key" color="deep-orange-accent-3" rounded="0" group>
    <v-btn value="1">
      Red
    </v-btn>

    <v-btn value="2">
      Green
    </v-btn>

    <v-btn value="3">
      Blue
    </v-btn>

    <v-btn value="4">
      RGB
    </v-btn>

  </v-btn-toggle>
</template>

<script>
export default {
    data() {
        return {
            key: 0,
            1: "1",
            2: "2",
            3: "3",
            4: "4",
        };
    },
};
</script>
