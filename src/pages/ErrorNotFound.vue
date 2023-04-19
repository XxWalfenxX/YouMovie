<template>
  <div
    class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh">
        <q-img src="~assets/shiba-error.png" />
      </div>

      <div class="text-h2" style="opacity: 0.4">Ups. Nada aquí... 404</div>

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
  name: "ErrorNotFound",
});
</script>
