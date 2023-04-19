<template>
  <q-page padding>
    <q-btn
      class="btn"
      round
      color="primary"
      icon="close"
      href="javascript:history.back()"
    />
    <div class="video">
      <iframe
        width="100%"
        height="100%"
        style="border-radius: 5px"
        :src="state.peliData.linkVideostation"
        frameborder="0"
        allowfullscreen
      />
    </div>
  </q-page>
</template>

<script>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import getUnaPelicula from "src/firebase/ObtenerUnaPelicula";
import { useQuasar } from "quasar";
import { LocalStorage } from "quasar";

export default {
  name: "PeliculaView",
  setup() {
    const $q = useQuasar();
    const idPeli = useRoute().params.id;
    const state = reactive({
      peliData: [],
    });

    const peliActual = $q.localStorage.getItem("peliActual");
    if (peliActual.id != idPeli || peliActual == null) {
      console.log("Ha pedido info a db");
      getUnaPelicula(idPeli)
        .then(function (data) {
          state.peliData = data;
          LocalStorage.set("peliActual", data);
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      console.log("NO pedido info a db");
      state.peliData = peliActual;
    }

    return {
      state,
    };
  },
};
</script>

<style>
.video {
  height: calc(100vh - (115px + 16px + 16px));
}

.btn {
  position: absolute;
  float: right;
  right: 3em;
  top: 3em;
}
</style>
