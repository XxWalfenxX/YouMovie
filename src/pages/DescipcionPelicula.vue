<template>
  <q-img class="img-fondo" :src="state.peliData.imagenFondo">
    <div class="absolute-full pading">
      <div class="column">
        <!-- Columna 1 -->
        <div class="col">
          <div class="row items-center justify-center-mv">
            <!-- Logo y botón de "Ver ahora" -->
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
            <!-- Descripción y categorías -->
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
        <!-- Columna 2 -->
        <div class="col">
          <!-- Valoración -->
          <div class="Contenedor-Texto valoracion">
            <q-circular-progress
              show-value
              font-size="12px"
              :value="state.valoracion"
              size="50px"
              :thickness="0.22"
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
      <!-- Películas similares -->
      <h4>Similares</h4>
      <q-scroll-area style="height: 28rem; max-width: 100vw">
        <div class="q-pa-lg q-pa-lg-m row items-start scrolllateral">
          <TarjetaPeli
            v-for="imagen in state.listaPelis
              .filter((peli) =>
                peli.categorias.find(
                  (ca) => ca.id === state.peliData.categorias[0].id
                )
              )
              .slice(0, 6)"
            :key="imagen.id"
            v-bind="imagen"
          />
        </div>
      </q-scroll-area>
    </div>
  </q-img>
</template>

<script>
import { reactive } from "vue"; // importa la función reactive de Vue
import { useRoute, useRouter } from "vue-router"; // importa las funciones useRoute y useRouter de vue-router
import TarjetaPeli from "components/TarjetaPeli.vue"; // importa el componente TarjetaPeli
import getUnaPelicula from "src/firebase/ObtenerUnaPelicula"; // importa la función getUnaPelicula desde la ruta especificada
import { useQuasar } from "quasar"; // importa la función useQuasar de Quasar
import { LocalStorage } from "quasar"; // importa el objeto LocalStorage de Quasar

import getPeliculas from "src/firebase/ObtenerPeliculas"; // importa la función getPeliculas desde la ruta especificada

export default {
  name: "DescipcionPelicula", // define el nombre del componente

  components: {
    TarjetaPeli, // registra el componente TarjetaPeli dentro de este componente
  },

  setup() {
    // define la función setup
    const $q = useQuasar(); // asigna el valor de la función useQuasar a la constante $q
    const router = useRouter(); // asigna el valor de la función useRouter a la constante router
    const idPeli = useRoute().params.id; // asigna el valor del parámetro id de la ruta actual a la constante idPeli
    const state = reactive({
      // crea un objeto reativo llamado state con propiedades peliData, valoracion y listaPelis
      peliData: [],
      valoracion: 0,
      listaPelis: [],
    });

    const peliActual = $q.localStorage.getItem("peliActual"); // asigna el valor del objeto peliActual guardado en LocalStorage a la constante peliActual

    getPeliculas.then((pelis) => {
      // llama a la función getPeliculas y asigna el resultado a state.listaPelis
      state.listaPelis = pelis;
    });

    if (peliActual.id != idPeli || peliActual == null) {
      // si peliActual no coincide con idPeli o es nulo, llama a la función getUnaPelicula con idPeli como parámetro
      getUnaPelicula(idPeli)
        .then(function (data) {
          // si la función getUnaPelicula devuelve datos, asigna los datos a state.peliData, redondea data.valoracion y lo asigna a state.valoracion, y guarda el objeto data en LocalStorage
          if (data === null) {
            router.push("/app"); // si data es nulo, redirige al usuario a la página /app
          }
          console.log("Ha pedido info a db"); // imprime en la consola "Ha pedido info a db"
          state.peliData = data;
          state.valoracion = Math.round(data.valoracion * 10);
          LocalStorage.set("peliActual", data);
        })
        .catch(function (error) {
          // si la función getUnaPelicula devuelve un error, imprime el error en la consola
          console.error(error);
        });
    } else {
      // Si la película actual es igual a la película solicitada, entonces la información ya está en la memoria local.
      console.log("NO pedido info a db");
      // Se obtiene la información de la memoria local.
      state.peliData = peliActual;
      state.valoracion = Math.round(peliActual.valoracion * 10);
    }

    return {
      state,
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
