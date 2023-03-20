<template>
  <q-card class="my-card">
    <q-btn flat to="/pelicula">
      <img class="cartelera-img" :src="imagen">
    </q-btn>
    <q-card-actions align="left">
      <q-btn flat round color="teal" icon="bookmark" />
      <q-btn flat round color="primary" icon="share" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "TarjetaPeli",
  props: {
    imagen: {
      type: String,
      default: "",
    },
  },
});
</script>

<style>
.my-card {
  width: auto;
  max-width: 300px;
}
</style>
