<template>
  <q-img class="img-fondo" :src="state.peliData.imagenFondo">
    <div class="absolute-full pading">
      <div class="column">
        <div class="col">
          <div class="row items-center justify-center-mv">
            <div class="col-md-3 col-8">
              <div class="flex">
                <q-img
                  class="img-titulo"
                  :src="state.peliData.logo"
                ></q-img>
                <q-btn
                  class="full-width img-titulo"
                  size="xl"
                  :to="{ name: 'PeliculaView', params: { id: state.peliData.id }}"
                  icon="play_circle"
                  label="Ver ahora"
                  color="purple"
                  style="border-radius: 1em; margin: 1em"
                />
              </div>
            </div>
            <div class="col-md-4 col-8">
              <div class="Contenedor-Texto">
                {{ state.peliData.descripcion }}
              </div>
              <q-chip color="primary" text-color="white" v-for="genero in state.peliData.categorias" :key="genero.id">{{genero.name}}</q-chip>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="Contenedor-Texto valoracion">
            <q-circular-progress
              show-value
              font-size="12px"
              :value="state.valoracion"
              size="50px"
              thickness="0.22"
              color="teal"
              track-color="grey-3"
              class="q-ma-md"
            >
              {{ state.valoracion }}%
            </q-circular-progress>
            Puntuación de usuario
          </div>
        </div>
      </div>
      <h4>Similares</h4>
      <q-scroll-area
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        style="height: 28rem; max-width: 100vw"
      >
        <div class="q-pa-lg q-pa-lg-m row items-start scrolllateral">
          <TarjetaPeli
            v-for="imagen in peliLista"
            :key="imagen.title"
            v-bind="imagen"
          />
        </div>
      </q-scroll-area>
    </div>
  </q-img>
</template>

<script>
import { ref, onMounted, getCurrentInstance, reactive } from "vue";
import { useRoute } from "vue-router";
import TarjetaPeli from "components/TarjetaPeli.vue";
import getUnaPelicula from "src/firebase/ObtenerUnaPelicula";

const pelisList = [
  {
    poster:
      "https://www.themoviedb.org/t/p/w220_and_h330_face/yJTmm7AOVEpfeK8BNrC5OFET3ns.jpg",
    id: 5559,
  },
  {
    poster:
      "https://www.themoviedb.org/t/p/w220_and_h330_face/vQM1Gmz6wYImeIhUHQ3ak5VUcny.jpg",
    id: 2,
  },
  {
    poster:
      "https://www.themoviedb.org/t/p/w220_and_h330_face/wFdwJh3fbhp5aiRbQelVz1mbbwP.jpg",
  },
  {
    poster:
      "https://www.themoviedb.org/t/p/w220_and_h330_face/wFdwJh3fbhp5aiRbQelVz1mbbwP.jpg",
  },
  {
    poster:
      "https://www.themoviedb.org/t/p/w220_and_h330_face/wFdwJh3fbhp5aiRbQelVz1mbbwP.jpg",
  },
  {
    poster:
      "https://www.themoviedb.org/t/p/w220_and_h330_face/wFdwJh3fbhp5aiRbQelVz1mbbwP.jpg",
  },
];

export default {
  name: "DescipcionPelicula",
  components: {
    TarjetaPeli,
  },
  setup() {
    const idPeli = useRoute().params.id;
    const state = reactive({
      peliData: [],
      valoracion: 0,
    });

    getUnaPelicula(idPeli)
      .then(function (data) {
        state.peliData = data;
        state.valoracion = Math.round(data.valoracion * 10);
      })
      .catch(function (error) {
        console.error(error);
      });

    return {
      state,
      peliLista: pelisList,
    };
  },
};
</script>

<style>
.img-fondo {
  height: calc(100vh - 98px);
}

.absolute-full {
  overflow: auto;
}

.Contenedor-Texto {
  background-color: rgba(185, 185, 185, 0.726);
  color: black;
  border-radius: 10px;
  padding: 1em;
}

.img-titulo {
  max-width: 27em;
  margin-bottom: 1em;
  margin-right: 3em !important;
}

.flex2 {
  flex-direction: column;
}

.valoracion {
  margin-top: 2em;
  max-width: 20em;
  padding: 0 !important;
  background-color: rgb(185, 185, 185);
}

.scrolllateral {
  overflow: auto;
  flex-wrap: nowrap !important;
}

.q-pa-lg-m {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

h4 {
  margin-bottom: 0;
}

.pading {
  padding-left: 10em !important;
}

@media (max-width: 680px) {
  .justify-center-mv {
    justify-content: center;
  }
  .pading {
    padding-left: 16px !important;
  }
}
</style>
