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
        :name="1"
        img-src="https://www.themoviedb.org/t/p/original/nlgujXsHp2YPZg8gVpSEcyW6Xcu.jpg"
      />
      <q-carousel-slide
        :name="2"
        img-src="https://www.themoviedb.org/t/p/original/uMSxXLfH7v30gRNBqsQaSP3yqX5.jpg"
      />
      <q-carousel-slide
        :name="3"
        img-src="https://www.themoviedb.org/t/p/original/9IDJpHROaC0S1ZlIxrvzOcOX5yC.jpg"
      />
    </q-carousel>

    <q-scroll-area style="height: 28rem; max-width: 100vw">
        <div class="q-pa-lg q-pa-lg-m row items-start scrolllateral">
          <TarjetaPeli
            v-for="imagen in state.listaPelis"
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
</style>
