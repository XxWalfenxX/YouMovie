<template>
  <div>
    <q-form @submit="agregarPeli" class="centrado">
      <div class="row flex-center" style="height: 100%">
        <div class="col-4 q-gutter-md">
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
import AdminAuth from "src/firebase/AdminAuth";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

import CollectionMovie from "src/tmdb/tmdb";

export default defineComponent({
  name: "AgregarPeli",

  setup() {
    const $q = useQuasar();
    const user = $q.localStorage.getItem("user");
    const router = useRouter();
    AdminAuth(user.email).then((v) => {
      if (v == false) {
        router.push("/app");
      }
    });

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
