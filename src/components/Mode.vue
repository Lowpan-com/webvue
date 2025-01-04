<template>
  <v-btn-toggle v-model="mode" color="deep-orange-accent-3" rounded="0" group>
    <v-btn value="MLV">
      MLV
    </v-btn>

    <v-btn value="ELV">
      ELV
    </v-btn>

  </v-btn-toggle>
</template>

<script>
export default {
    data() {
        return {
            mode: 0,
            MLV: "MLV",
            ELV: "ELV",
        };
    },
};
</script>
