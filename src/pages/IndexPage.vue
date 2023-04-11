<template>
  <div class="q-pa-lg">
    <q-carousel
      class="border"
      animated
      v-model="slide"
      navigation
      infinite
      :autoplay="autoplay"
      arrows
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      <q-carousel-slide
        v-for="(peli, index) in state.listaPelis.slice(0, 5)"
        :key="index"
        :name="index + 1"
        :img-src="peli.imagenFondo"
      />
    </q-carousel>

    <h4>Novedades</h4>
    <q-scroll-area style="height: 28rem; max-width: 100vw">
      <div class="q-pa-lg q-pa-lg-m row items-start scrolllateral">
        <TarjetaPeli
          v-for="imagen in state.listaPelis.slice(0, 15)"
          :key="imagen.id"
          v-bind="imagen"
        />
      </div>
    </q-scroll-area>

    <h4>Aventura</h4>
    <q-scroll-area style="height: 28rem; max-width: 100vw">
      <div class="q-pa-lg q-pa-lg-m row items-start scrolllateral">
        <TarjetaPeli
          v-for="imagen in state.listaPelis.filter((peli) =>
            peli.categorias.find((ca) => ca.name === 'Aventura')
          )"
          :key="imagen.id"
          v-bind="imagen"
        />
      </div>
    </q-scroll-area>
    <h4>Acción</h4>
    <q-scroll-area style="height: 28rem; max-width: 100vw">
      <div class="q-pa-lg q-pa-lg-m row items-start scrolllateral">
        <TarjetaPeli
          v-for="imagen in state.listaPelis.filter((peli) =>
            peli.categorias.find((ca) => ca.name === 'Acción')
          )"
          :key="imagen.id"
          v-bind="imagen"
        />
      </div>
    </q-scroll-area>
    <h4>Crimen</h4>
    <q-scroll-area style="height: 28rem; max-width: 100vw">
      <div class="q-pa-lg q-pa-lg-m row items-start scrolllateral">
        <TarjetaPeli
          v-for="imagen in state.listaPelis.filter((peli) =>
            peli.categorias.find((ca) => ca.name === 'Crimen')
          )"
          :key="imagen.id"
          v-bind="imagen"
        />
      </div>
    </q-scroll-area>
    <h4>Comedia</h4>
    <q-scroll-area style="height: 28rem; max-width: 100vw">
      <div class="q-pa-lg q-pa-lg-m row items-start scrolllateral">
        <TarjetaPeli
          v-for="imagen in state.listaPelis.filter((peli) =>
            peli.categorias.find((ca) => ca.name === 'Comedia')
          )"
          :key="imagen.id"
          v-bind="imagen"
        />
      </div>
    </q-scroll-area>
    <h4>Fantasía</h4>
    <q-scroll-area style="height: 28rem; max-width: 100vw">
      <div class="q-pa-lg q-pa-lg-m row items-start scrolllateral">
        <TarjetaPeli
          v-for="imagen in state.listaPelis.filter((peli) =>
            peli.categorias.find((ca) => ca.name === 'Fantasía')
          )"
          :key="imagen.id"
          v-bind="imagen"
        />
      </div>
    </q-scroll-area>
    <h4>Animación</h4>
    <q-scroll-area style="height: 28rem; max-width: 100vw">
      <div class="q-pa-lg q-pa-lg-m row items-start scrolllateral">
        <TarjetaPeli
          v-for="imagen in state.listaPelis.filter((peli) =>
            peli.categorias.find((ca) => ca.name === 'Animación')
          )"
          :key="imagen.id"
          v-bind="imagen"
        />
      </div>
    </q-scroll-area>
    <h4>Familia</h4>
    <q-scroll-area style="height: 28rem; max-width: 100vw">
      <div class="q-pa-lg q-pa-lg-m row items-start scrolllateral">
        <TarjetaPeli
          v-for="imagen in state.listaPelis.filter((peli) =>
            peli.categorias.find((ca) => ca.name === 'Familia')
          )"
          :key="imagen.id"
          v-bind="imagen"
        />
      </div>
    </q-scroll-area>
    <h4>Drama</h4>
    <q-scroll-area style="height: 28rem; max-width: 100vw">
      <div class="q-pa-lg q-pa-lg-m row items-start scrolllateral">
        <TarjetaPeli
          v-for="imagen in state.listaPelis.filter((peli) =>
            peli.categorias.find((ca) => ca.name === 'Drama')
          )"
          :key="imagen.id"
          v-bind="imagen"
        />
      </div>
    </q-scroll-area>
    <h4>Ciencia ficción</h4>
    <q-scroll-area style="height: 28rem; max-width: 100vw">
      <div class="q-pa-lg q-pa-lg-m row items-start scrolllateral">
        <TarjetaPeli
          v-for="imagen in state.listaPelis.filter((peli) =>
            peli.categorias.find((ca) => ca.name === 'Ciencia ficción')
          )"
          :key="imagen.id"
          v-bind="imagen"
        />
      </div>
    </q-scroll-area>
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
      listaPelis: [],
    });

    getPeliculas.then((pelis) => {
      state.listaPelis = pelis;
    });

    return {
      state,
      slide: ref(1),
      autoplay: ref(true),
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
</style>
