<template>
  <v-btn-toggle v-model="key" color="deep-orange-accent-3" rounded="0" group>
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

<script>
export default {
    data() {
        return {
            key: 0,
            1: "1",
            2: "2",
            3: "3",
            4: "4",
            5: "5",
            6: "6",
            7: "7",
            8: "8",
        };
    },
};
</script>
