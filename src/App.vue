<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
export default defineComponent({
  name: "App",
  setup() {
    const $q = useQuasar();
    $q.addressbarColor.set("#FF913E");

    function orientacionCambiada() {
      if (typeof window.orientation !== 'undefined') {
        alert(window.orientation);
        this.$globals.Orientacion = "csoa";
      }
      
    }

    window.addEventListener("orientationchange", orientacionCambiada, false);
  },
});
</script>
