<template>
  <q-card class="my-card">
    <q-btn v-ripple class="btn-card cursor-pointer q-hoverable" flat @click="linkClick" :to="{ name: 'DescipcionPelicula', params: { id: id }}">
      <span class="q-focus-helper"></span>
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
    id: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    function linkClick(e, go) {
      e.preventDefault();
      setTimeout(() => {
        go();
      }, 500);
    }
    return { linkClick };
  },
});
</script>

<style>
:root {
  --card-border: 10px;
}

.my-card {
  width: auto;
  max-width: 300px;
  border-radius: var(--card-border);
  margin-right: 1rem;
}

.btn-card {
  position: relative;
  padding: 0;
  border-radius: var(--card-border);
}

.cartelera-img {
  border-radius: var(--card-border);
  pointer-events: none;
}
</style>
