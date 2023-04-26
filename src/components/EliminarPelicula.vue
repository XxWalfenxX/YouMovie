<template>
  <div>
    <q-form @submit="eliminarPeli" class="centrado">
      <div class="row flex-center" style="height: 100%">
        <div class="col col-md-4 q-gutter-md">
          <h4>Eliminar pelicula</h4>
          <q-input
            name="name"
            v-model="tmdb"
            label="ID Película"
            filled
            clearable
          />
          <q-btn label="Eliminar" @click="confirm = true" color="negative" />
        </div>
      </div>
      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-icon name="info" color="primary" size="3em" />
            <span class="q-ml-sm">¿Deseas eliminar la película?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" v-close-popup />
            <q-btn
              flat
              @click="eliminarPeli()"
              label="Eliminar"
              color="primary"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-form>
  </div>
</template>
<script>
import EliminarID from "src/firebase/EliminarPelicula.js";
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "EliminarPelicula",
  setup() {
    const $q = useQuasar();

    return {
      tmdb: ref(null),
      confirm: ref(false),
      eliminarPeli() {
        console.log(this.tmdb);
        if (this.tmdb !== null) {
          EliminarID(this.tmdb);
        }
      },
    };
  },
});
</script>
