<template>
  <div class="q-pa-lg">
    <q-carousel
      class="border"
      animated
      v-model="slide"
      navigation
      infinite
      control-color="primary"
      arrows
      :autoplay="autoplay"
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"

    >
      <q-carousel-slide
        v-for="(peli, index) in state.pelisCarrousel"
        :key="index"
        :name="index + 1"
        :img-src="peli.imagenFondo"
        style="overflow: hidden;"
      >
        <router-link
          :to="{ name: 'DescipcionPelicula', params: { id: peli.id } }"
          style="text-decoration: none; color: white"
        >
          <div class="custom-caption">
            <div class="contenedor-logo">
              <q-img
                :src="peli.logo"
                spinner-color="white"
                class="logo-carusel"
              />
            </div>
          </div>
        </router-link>
      </q-carousel-slide>
    </q-carousel>

    <h4>Novedades</h4>
    <q-scroll-area style="height: 28rem; max-width: 100vw">
      <div class="q-pa-lg q-pa-lg-m row items-start scrolllateral">
        <TarjetaPeli
          v-for="imagen in state.listaPelis.slice(0, 15)"
          :key="imagen.id"
          v-bind="imagen"
          :reload="reload"
        />
      </div>
    </q-scroll-area>

    <div v-for="categoria in state.categorias" :key="categoria">
      <h4>{{ categoria }}</h4>
      <q-scroll-area style="height: 28rem; max-width: 100vw">
        <div class="q-pa-lg q-pa-lg-m row items-start scrolllateral">
          <TarjetaPeli
            v-for="imagen in state.listaPelis.filter((peli) =>
              peli.categorias.find((ca) => ca.name === categoria)
            )"
            :key="imagen.id"
            v-bind="imagen"
            :reload="reload"
          />
        </div>
      </q-scroll-area>
    </div>
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
            <q-btn fab icon="keyboard_arrow_up" color="primary" />
          </q-page-scroller>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";
import TarjetaPeli from "components/TarjetaPeli.vue";
import getPeliculas from "src/firebase/ObtenerPeliculas";

// redondear
//console.log(Math.round(8.351*10))

export default defineComponent({
  name: "IndexPage",

  components: {
    TarjetaPeli,
  },

  setup() {
    const state = reactive({
      categorias: [
        "Aventura",
        "Acción",
        "Acción",
        "Crimen",
        "Comedia",
        "Fantasía",
        "Animación",
        "Familia",
        "Drama",
        "Ciencia ficción",
      ],
      listaPelis: [],
      pelisCarrousel:[],
    });

    getPeliculas.then((pelis) => {
      state.listaPelis = pelis;
      const pelis2 = [...pelis];
      state.pelisCarrousel = pelis2.sort(() => Math.random() - 0.5).slice(0, 5);
    });

    return {
      state,
      slide: ref(1),
      autoplay: ref(true),
      reload: true,
    };
  },
});
</script>

<style>
.border {
  border-radius: 10px;
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

.logo-carusel {
  object-fit: cover;
  width: 20em;
  max-width: 20em;
  margin: 5em;
  margin-left: 6em;
}
.custom-caption {
  height: 100%;
  }
@media (max-width: 680px) {
  .contenedor-logo {
    display: flex;
    justify-content: center;
  }
  .logo-carusel {
    width: 65%;
    margin: 0;
  }
}
</style>
