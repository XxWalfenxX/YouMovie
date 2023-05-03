<template>
  <div class="q-pa-lg">
    <!-- Inicio del componente Q-Carousel -->
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
      <!-- Se generan los slides del carousel -->
      <q-carousel-slide
        v-for="(peli, index) in state.pelisCarrousel"
        :key="index"
        :name="index + 1"
        :img-src="peli.imagenFondo"
        style="overflow: hidden"
      >
        <!-- Se crea un link hacia la descripción de la película -->
        <router-link
          :to="{ name: 'DescipcionPelicula', params: { id: peli.id } }"
          style="text-decoration: none; color: white"
        >
          <div class="custom-caption">
            <!-- Se agrega el logo de la película en el caption del slide -->
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

    <!-- Sección de "Novedades" -->
    <h4>Novedades</h4>
    <q-scroll-area style="height: 28rem; max-width: 100vw">
      <div class="q-pa-lg q-pa-lg-m row items-start scrolllateral">
        <!-- Se generan las tarjetas de las películas para la sección de "Novedades" -->
        <TarjetaPeli
          v-for="imagen in state.listaPelis.slice(0, 15)"
          :key="imagen.id"
          v-bind="imagen"
          :reload="reload"
        />
      </div>
    </q-scroll-area>

    <!-- Secciones de categorías -->
    <div v-for="categoria in state.categorias" :key="categoria">
      <h4>{{ categoria }}</h4>
      <q-scroll-area style="height: 28rem; max-width: 100vw">
        <div class="q-pa-lg q-pa-lg-m row items-start scrolllateral">
          <!-- Se generan las tarjetas de las películas para cada categoría -->
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
    <!-- Botón para subir al inicio de la página -->
    <q-page-scroller
      position="bottom-right"
      :scroll-offset="150"
      :offset="[18, 18]"
    >
      <q-btn fab icon="keyboard_arrow_up" color="primary" />
    </q-page-scroller>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";
import TarjetaPeli from "components/TarjetaPeli.vue";
import getPeliculas from "src/firebase/ObtenerPeliculas";

// Definimos el componente
export default defineComponent({
  name: "IndexPage",

  // Importamos el componente de tarjeta de película
  components: {
    TarjetaPeli,
  },

  // Configuramos el componente con Vue 3 Composition API
  setup() {
    // Definimos el estado del componente
    const state = reactive({
      categorias: [
        "Aventura",
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
      pelisCarrousel: [],
    });

    // Obtenemos las películas desde Firebase y las asignamos al estado
    getPeliculas.then((pelis) => {
      state.listaPelis = pelis;

      // Configuramos las películas del carrusel
      state.pelisCarrousel = [...pelis]
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
    });

    // Retornamos las propiedades reactivas y las referencias necesarias
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
