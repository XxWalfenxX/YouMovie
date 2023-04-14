<template>
  <div
    class="q-pa-lg row justify-center q-gutter-md"
    v-if="state.listaPelis.length !== 0"
  >
    <TarjetaPeli
      v-for="imagen in state.listaPelis2.filter((peli) =>
        state.listaPelis.includes(peli.id)
      )"
      :key="imagen.id"
      v-bind="imagen"
    />
  </div>
  <div class="q-pa-lg row justify-center q-gutter-md" v-else>
    <h3 class="alert alert-color">
      No tienes ninguna película guardada, agrega una pulsando en
      <q-icon name="bookmark" color="teal" />
    </h3>
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
    TarjetaPeli,
  },

  setup() {
    const $q = useQuasar();
    const user = $q.localStorage.getItem("user");

    const state = reactive({
      listaPelis: [],
      listaPelis2: [],
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
.alert-color {
  --bs-alert-color: #052c65;
  --bs-alert-bg: #cfe2ff;
  --bs-alert-border-color: #9ec5fe;
  --bs-alert-link-color: #052c65;
}

@media (prefers-color-scheme: dark) {
  .alert-color {
    --bs-alert-color: #6ea8fe;
    --bs-alert-bg: #031633;
    --bs-alert-border-color: #084298;
    --bs-alert-link-color: #6ea8fe;
  }
}

.alert {
  --bs-alert-padding-x: 1rem;
  --bs-alert-padding-y: 1rem;
  --bs-alert-margin-bottom: 1rem;
  --bs-alert-border: 1px solid var(--bs-alert-border-color);
  --bs-alert-border-radius: 0.375rem;
  position: relative;
  padding: var(--bs-alert-padding-y) var(--bs-alert-padding-x);
  margin-bottom: var(--bs-alert-margin-bottom);
  color: var(--bs-alert-color);
  background-color: var(--bs-alert-bg);
  border: var(--bs-alert-border);
  border-radius: var(--bs-alert-border-radius);
}
</style>
