<template>
  <q-img
    class="img-fondo"
    src="https://www.themoviedb.org/t/p/original/psAQQBTJvSs4kaShupcn9IoHXc0.jpg"
  >
    <div class="absolute-full pading">
      <div class="column">
        <div class="col">
          <div class="row items-center justify-center-mv">
            <div class="col-md-3 col-8">
              <div class="flex">
                <q-img
                  class="img-titulo"
                  src="https://www.themoviedb.org/t/p/original/64vMHyQAOYuqAQeZCac33wTAySx.png"
                ></q-img>
                <q-btn
                  class="full-width img-titulo"
                  size="xl"
                  to="/ver-online"
                  icon="play_circle"
                  label="Ver ahora"
                  color="purple"
                  style="border-radius: 1em; margin: 1em"
                />
              </div>
            </div>
            <div class="col-md-4 col-8">
              <div class="Contenedor-Texto">
                Barry goes on an adventure to save the world from the clutches
                of his own actions. He must live through the realisation of the
                horrific results of his close minded an misguided, the he may
                very well (if not for his actions in the game) kill all the
                plants and by extension the animals including all his bee
                friends (Betty, Bob, Bailey, Buscemi ect)
              </div>
              <q-chip color="primary" text-color="white">Aventura</q-chip>
              <q-chip color="primary" text-color="white">Aventura</q-chip>
              <q-chip color="primary" text-color="white">Aventura</q-chip>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="Contenedor-Texto valoracion">
            <q-circular-progress
              show-value
              font-size="12px"
              value="60"
              size="50px"
              thickness="0.22"
              color="teal"
              track-color="grey-3"
              class="q-ma-md"
            >
              60%
            </q-circular-progress>
            Puntiacion de usuario
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
import { ref, onMounted, getCurrentInstance } from "vue";
import { useRoute } from "vue-router";
import TarjetaPeli from "components/TarjetaPeli.vue";

const pelisList = [
  {
    imagen:
      "https://www.themoviedb.org/t/p/w220_and_h330_face/yJTmm7AOVEpfeK8BNrC5OFET3ns.jpg",
    id: 5559,
  },
  {
    imagen:
      "https://www.themoviedb.org/t/p/w220_and_h330_face/vQM1Gmz6wYImeIhUHQ3ak5VUcny.jpg",
    id: 2,
  },
  {
    imagen:
      "https://www.themoviedb.org/t/p/w220_and_h330_face/wFdwJh3fbhp5aiRbQelVz1mbbwP.jpg",
  },
  {
    imagen:
      "https://www.themoviedb.org/t/p/w220_and_h330_face/wFdwJh3fbhp5aiRbQelVz1mbbwP.jpg",
  },
  {
    imagen:
      "https://www.themoviedb.org/t/p/w220_and_h330_face/wFdwJh3fbhp5aiRbQelVz1mbbwP.jpg",
  },
  {
    imagen:
      "https://www.themoviedb.org/t/p/w220_and_h330_face/wFdwJh3fbhp5aiRbQelVz1mbbwP.jpg",
  },
];

export default {
  name: "DescipcionPelicula",
  components: {
    TarjetaPeli,
  },
  setup() {
    const api = ref(null);
    const Test = useRoute().params.id;

    console.log(Test);
    return {
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
