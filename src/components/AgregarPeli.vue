<template>
  <div>
    <q-form @submit="agregarPeli" class="centrado">
      <div class="row flex-center" style="height: 100%">
        <div class="col col-md-4 q-gutter-md">
          <h4>Agregar pelicula</h4>
          <q-input
            name="name"
            v-model="tmdb"
            label="ID TMDB"
            filled
            clearable
          />
          <q-input
            name="name"
            v-model="synology"
            label="Link Synology"
            filled
            clearable
          />
          <q-btn label="Guardar" type="submit" color="primary" />
        </div>
      </div>
    </q-form>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

import CollectionMovie from "src/tmdb/tmdb";

export default defineComponent({
  name: "AgregarPeli",

  setup() {
    return {
      tmdb: ref(null),
      synology: ref(null),

      agregarPeli(evt) {
        console.log(evt);
        CollectionMovie(evt.target[0].value, evt.target[2].value);
      },
    };
  },
});
</script>

<style>
.centrado {
  height: calc(100vh - 98px);
}
</style>
