<template>
  <!--Define la estructura visual del componente-->
  <div
    class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center"
  >
    <!--Contenido principal-->
    <div>
      <!--Imagen con un shiba en caso de error-->
      <div style="font-size: 30vh">
        <q-img src="~assets/shiba-error.png" />
      </div>

      <!--Mensaje de error-->
      <div class="text-h2" style="opacity: 0.4">Ups. Nada aquí... 404</div>

      <!--Botón para volver al inicio-->
      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="primary"
        unelevated
        to="/"
        label="Inicio"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  //Nombre del componente
  name: "ErrorNotFound",
});
</script>
