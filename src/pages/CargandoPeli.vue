<template>
  <!-- página que se muestra mientras se carga la película -->
  <q-page class="flex flex-center">
    <!-- spinner de carga -->
    <q-spinner color="primary" size="10em" :thickness="10" />
  </q-page>
</template>

<script>
import { useRoute, useRouter } from "vue-router"; // se importan los hooks useRoute y useRouter de vue-router
import { defineComponent } from "vue"; // se importa la función defineComponent de Vue

export default defineComponent({
  name: "CargandoPeli",
  data() {
    return {
      timerId: null, // se define una variable para almacenar el identificador del temporizador
    };
  },
  created() {
    const router = useRouter(); // se obtiene el objeto router de la instancia de vue-router
    const idPeli = useRoute().params.id; // se obtiene el id de la película desde la ruta actual
    this.timerId = setTimeout(() => { // se crea un temporizador que redirige al usuario a la página de descripción de la película
      router.push({ name: "DescipcionPelicula", params: { idPeli } });
    }, 0);
  },
  beforeUnmount() {
    clearTimeout(this.timerId); // se limpia el temporizador antes de destruir el componente para evitar posibles fugas de memoria
  },
});
</script>
