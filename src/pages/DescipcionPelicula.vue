<template>
  <q-img class="img-fondo" :src="state.peliData.imagenFondo">
    <div class="absolute-full pading">
      <div class="column">
        <div class="col">
          <div class="row items-center justify-center-mv">
            <div class="col-md-3 col-8">
              <div class="flex">
                <q-img class="img-titulo" :src="state.peliData.logo"></q-img>
                <q-btn
                  class="full-width img-titulo"
                  size="xl"
                  :to="{
                    name: 'PeliculaView',
                    params: { id: state.peliData.id },
                  }"
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
              <q-chip
                color="primary"
                text-color="white"
                v-for="genero in state.peliData.categorias"
                :key="genero.id"
                >{{ genero.name }}</q-chip
              >
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
      <q-scroll-area style="height: 28rem; max-width: 100vw">
        <div class="q-pa-lg q-pa-lg-m row items-start scrolllateral">
          <TarjetaPeli
            v-for="imagen in state.listaPelis.filter((peli) =>
              peli.categorias.find(
                (ca) => ca.id === state.peliData.categorias[0].id
              )
            ).slice(0, 6)"
            :key="imagen.id"
            v-bind="imagen"
          />
        </div>
      </q-scroll-area>
    </div>
  </q-img>
</template>

<script>
import { reactive } from "vue";
import { useRoute,useRouter } from "vue-router";
import TarjetaPeli from "components/TarjetaPeli.vue";
import getUnaPelicula from "src/firebase/ObtenerUnaPelicula";
import { useQuasar } from "quasar";
import { LocalStorage } from "quasar";

import getPeliculas from "src/firebase/ObtenerPeliculas";

export default {
  name: "DescipcionPelicula",
  components: {
    TarjetaPeli,
  },

  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const idPeli = useRoute().params.id;
    const state = reactive({
      peliData: [],
      valoracion: 0,
      listaPelis: [],
    });

    const peliActual = $q.localStorage.getItem("peliActual");

    getPeliculas.then((pelis) => {
      state.listaPelis = pelis;
    });

    if (peliActual.id != idPeli || peliActual == null) {
      getUnaPelicula(idPeli)
        .then(function (data) {
          if (data === null) {
            router.push("/app");
          }
          console.log("Ha pedido info a db");
          state.peliData = data;
          state.valoracion = Math.round(data.valoracion * 10);
          LocalStorage.set("peliActual", data);
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      console.log("NO pedido info a db");
      state.peliData = peliActual;
      state.valoracion = Math.round(peliActual.valoracion * 10);
    }

    return {
      state
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
  width: 300px;
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
