<template>
  <q-img class="img-fondo" src="https://www.themoviedb.org/t/p/original/psAQQBTJvSs4kaShupcn9IoHXc0.jpg">
    <div class="absolute-full">
        <img src="https://www.themoviedb.org/t/p/original/64vMHyQAOYuqAQeZCac33wTAySx.png" alt="">
        <img src="https://www.themoviedb.org/t/p/original/64vMHyQAOYuqAQeZCac33wTAySx.png" alt="">
        <img src="https://www.themoviedb.org/t/p/original/64vMHyQAOYuqAQeZCac33wTAySx.png" alt="">
        <img src="https://www.themoviedb.org/t/p/original/64vMHyQAOYuqAQeZCac33wTAySx.png" alt="">
        <img src="https://www.themoviedb.org/t/p/original/64vMHyQAOYuqAQeZCac33wTAySx.png" alt="">
        <img src="https://www.themoviedb.org/t/p/original/64vMHyQAOYuqAQeZCac33wTAySx.png" alt="">
      <q-btn to="/ver-online" label="Ver PELI" outline color="purple" />
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
    .img-fondo{
        height: calc(100vh - 98px);
    }

    .absolute-full {
        overflow: auto;
    }
</style>