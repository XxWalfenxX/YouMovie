<template>
  <div class="q-pa-lg">
    <q-carousel animated v-model="slide" arrows navigation infinite>
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
  </div>
  <div class="q-pa-md row items-start q-gutter-md">
    <TarjetaPeli
      v-for="imagen in peliLista"
      :key="imagen.title"
      v-bind="imagen"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import TarjetaPeli from "components/TarjetaPeli.vue";

const pelisList = [
  {
    imagen:
      "https://www.themoviedb.org/t/p/w220_and_h330_face/yJTmm7AOVEpfeK8BNrC5OFET3ns.jpg",
  },
  {
    imagen:
      "https://www.themoviedb.org/t/p/w220_and_h330_face/vQM1Gmz6wYImeIhUHQ3ak5VUcny.jpg",
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
    };
  },
});
</script>
