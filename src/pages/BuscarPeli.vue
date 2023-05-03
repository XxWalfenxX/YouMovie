<template>
  <div style="margin: 2em">
    <!-- Barra de búsqueda -->
    <q-input standout v-model="search" placeholder="Titulo" :dense="dense" />
  </div>
  <div class="row justify-center q-gutter-md">
    <!-- Lista de TarjetaPeli -->
    <TarjetaPeli
      v-for="imagen in state.listaPelis2"
      :key="imagen.id"
      v-bind="imagen"
    />
  </div>
</template>

<script>
import { defineComponent, ref, reactive, watch } from "vue";
import TarjetaPeli from "components/TarjetaPeli.vue";  // Importa el componente TarjetaPeli
import getPeliculas from "src/firebase/ObtenerPeliculas";  // Importa la función para obtener las películas

export default defineComponent({
  name: "BuscarPeli",  // Nombre del componente

  components: {
    TarjetaPeli,  // Se registra el componente TarjetaPeli
  },

  setup() {
    const state = reactive({
      listaPelis: [],  // Lista de todas las películas
      listaPelis2: [],  // Lista de películas filtradas por la barra de búsqueda
    });

    const search = ref("");  // Barra de búsqueda vacía al principio

    getPeliculas.then((pelis) => {  // Obtiene las películas de Firebase
      state.listaPelis = pelis;  // Guarda las películas en la lista original
    });

    watch(search, () => {  // Observa cambios en la barra de búsqueda
      if (search.value === "") {  // Si la barra de búsqueda está vacía
        state.listaPelis2 = "";  // No hay películas filtradas
      } else {
        // Filtra las películas por el título (ignorando mayúsculas y minúsculas)
        state.listaPelis2 = state.listaPelis.filter((peli) =>
          peli.nombre.toLowerCase().includes(search.value.toLowerCase())
        );
      }
    });

    return {
      state,
      search,
      dense: ref(false),  // Barra de búsqueda no densa
    };
  },
});
</script>