<template>
  <q-page padding style="overflow: hidden;">
    <!-- Spinner de carga -->
    <div class="spinner"><q-spinner color="primary" size="10em" /></div>
    <!-- Botón de cerrar que retrocede en la historia del navegador -->
    <q-btn
      class="btn"
      round
      color="primary"
      icon="close"
      href="javascript:history.back()"
    />

    <!-- Contenedor del video -->
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

    // Obtiene el id de la película de la ruta actual
    const idPeli = useRoute().params.id;

    // Estado reactivo de los datos de la película
    const state = reactive({
      peliData: [],
    });

    // Obtiene la última película vista en el almacenamiento local
    const peliActual = $q.localStorage.getItem("peliActual");

    // Si la última película vista no es la misma que la actual, se obtiene la información de la película de la base de datos
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
      // Si la última película vista es la misma que la actual, se utiliza la información del almacenamiento local
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

@media only screen and (max-width: 600px) and (orientation: portrait) {
  .video {
    position: absolute;
    width: calc(100vh - 115px);
    height: 100vw;
    transform: rotate(90deg);
    transform-origin: top left;
    left: 100%;
  }

  iframe {
    padding: 1em;
  }
}

.spinner {
  position: absolute;
  width: 100vw;
  height: calc(100vh - (115px + 16px + 16px));
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
}

.btn {
  position: absolute;
  float: right;
  right: 3em;
  top: 3em;
  z-index: 999;
}
</style>
