<template>
  <q-page padding>
      <q-btn class="btn" round color="primary" icon="close" href="javascript:history.back()"/>
      <div class="video">
        <iframe
          width="100%"
          height="100%"
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

export default {
  name: "PeliculaView",
  setup() {
    const idPeli = useRoute().params.id;
    const state = reactive({
      peliData: [],
    });

    getUnaPelicula(idPeli)
      .then(function (data) {
        state.peliData = data;
      })
      .catch(function (error) {
        console.error(error);
      });

    return {
      state
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
