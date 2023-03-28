<template>
  <div class="q-pa-lg">
    <q-carousel class="border"
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

    <q-scroll-area
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
</template>

<script>
import { defineComponent, ref } from "vue";
import TarjetaPeli from "components/TarjetaPeli.vue";

// redondear
//console.log(Math.round(8.351*10))

const pelisList = [
  {
    imagen:
      "https://www.themoviedb.org/t/p/w220_and_h330_face/yJTmm7AOVEpfeK8BNrC5OFET3ns.jpg",
    id: 5559
  },
  {
    imagen:
      "https://www.themoviedb.org/t/p/w220_and_h330_face/vQM1Gmz6wYImeIhUHQ3ak5VUcny.jpg",
      id: 2
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
  {
    imagen:
      "https://www.themoviedb.org/t/p/w220_and_h330_face/wFdwJh3fbhp5aiRbQelVz1mbbwP.jpg",
  },
  {
    imagen:
      "https://www.themoviedb.org/t/p/w220_and_h330_face/wFdwJh3fbhp5aiRbQelVz1mbbwP.jpg",
  },
];

export default defineComponent({
  name: "IndexPage",

  components: {
    TarjetaPeli,
  },

  setup() {
    return {
      peliLista: pelisList,
      slide: ref(1),
      autoplay: ref(true)
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
