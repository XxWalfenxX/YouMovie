<template>
  <q-page class="flex flex-center">
    <q-spinner color="primary" size="10em" :thickness="10" />
  </q-page>
</template>

<script>
import { useRoute, useRouter } from "vue-router";

export default {
  name: "CargandoPeli",
  data() {
    return {
      timerId: null,
    };
  },
  created() {
    const router = useRouter();
    const idPeli = useRoute().params.id;
    this.timerId = setTimeout(() => {
      router.push({ name: "DescipcionPelicula", params: { idPeli } });
    }, 0);
  },
  beforeUnmount() {
    clearTimeout(this.timerId);
  },
};
</script>
