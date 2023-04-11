<template>
  <div style="margin: 2em">
    <q-input standout v-model="search" placeholder="Titulo" :dense="dense" />
  </div>
  <div class="q-pa-lg q-pa-lg-m row items-start">
    <TarjetaPeli
      v-for="imagen in state.listaPelis2"
      :key="imagen.id"
      v-bind="imagen"
    />
  </div>
</template>

<script>
import { defineComponent, ref, reactive, watch } from "vue";
import TarjetaPeli from "components/TarjetaPeli.vue";
import getPeliculas from "src/firebase/ObtenerPeliculas";

export default defineComponent({
  name: "BuscarPeli",

  components: {
    TarjetaPeli,
  },

  setup() {
    const state = reactive({
      listaPelis: [],
      listaPelis2: [],
    });

    const search = ref("")

    getPeliculas.then((pelis) => {
      state.listaPelis = pelis;
    });

    watch(search, () => {
      if (search.value === "") {
        state.listaPelis2 = "";
      } else {
        state.listaPelis2 = state.listaPelis.filter((peli) =>
        peli.nombre.toLowerCase().includes(search.value.toLowerCase())
        );
      }
    });

    return {
      state,
      search,
      dense: ref(false),
    };
  },
});
</script>
