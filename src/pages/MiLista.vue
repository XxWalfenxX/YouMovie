<template>
  <div class="q-pa-lg row justify-center q-gutter-md" v-if="state.listaPelis.length !== 0">
     <TarjetaPeli
      v-for="imagen in state.listaPelis2.filter(peli => state.listaPelis.includes(peli.id))"
      :key="imagen.id"
      v-bind="imagen"
    />
  </div>
  <div class="q-pa-lg row justify-center q-gutter-md" v-else>
     <h3 class="alert alert-primary">No tienes ninguna película guardada, agrega una pulsando en  <q-icon name="bookmark" color="teal" /></h3>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import TarjetaPeli from "components/TarjetaPeli.vue";
import { ListaPelis } from "src/firebase/GuardarTargetaUsuario";
import getPeliculas from "src/firebase/ObtenerPeliculas";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "MiLista",

  components: {
    TarjetaPeli
  },

  setup() {
    const $q = useQuasar();
    const user = $q.localStorage.getItem("user");

    const state = reactive({
      listaPelis: [],
      listaPelis2: []
    });

    ListaPelis(user.email).then((v) => {
      state.listaPelis = v.pelisID;
    });

    getPeliculas.then((pelis) => {
      state.listaPelis2 = pelis;
    });

    return {
      state,
    };
  },
});
</script>

<style>



</style>