<template>
  <q-img
    class="img-fondo"
    src="https://www.themoviedb.org/t/p/original/psAQQBTJvSs4kaShupcn9IoHXc0.jpg"
  >
    <div class="absolute-full">
      <div class="column items-center">
        <div class="row">
          <div class="col-md-4 col-8">
          <div class="flex items-center flex2">
            <q-img
              class="img-titulo"
              src="https://www.themoviedb.org/t/p/original/64vMHyQAOYuqAQeZCac33wTAySx.png"
            ></q-img>
            <q-btn
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
            Barry goes on an adventure to save the world from the clutches of
            his own actions. He must live through the realisation of the
            horrific results of his close minded an misguided, the he may very
            well (if not for his actions in the game) kill all the plants and by
            extension the animals including all his bee friends (Betty, Bob,
            Bailey, Buscemi ect)
          </div>
          <q-chip color="primary" text-color="white">Aventura</q-chip>
          <q-chip color="primary" text-color="white">Aventura</q-chip>
          <q-chip color="primary" text-color="white">Aventura</q-chip>
        </div>
        </div>
        <div class="column">
          <div class="Contenedor-Texto valodacion">
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
    </div>
  </q-img>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "DescipcionPelicula",

  setup() {
    const api = ref(null);
    const Test = useRoute().params.id;

    console.log(Test);
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
}

.flex2 {
  flex-direction: column;
}

.valodacion {
  margin-top: 2em;
  max-width: 20em;
  padding: 0 !important;
}
</style>
