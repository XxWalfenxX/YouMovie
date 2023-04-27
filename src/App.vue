<template>
  <router-view />
  <q-banner
  id="cookie-banner"
    style="position: fixed; bottom: 0; width: 100%"
    dense
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
    v-if="!cookie"
  >
    <template v-slot:avatar>
      <q-icon name="cookie" color="primary" />
    </template>
    Esta página web utiliza cookies para analizar de forma anónima y estadística
    sobre el uso que haces de la web, mejorar los contenidos y tu experiencia de
    navegación. Para más información accede a la Política de Cookies de Google
    <template v-slot:action>
      <q-btn flat color="primary" label="OK" @click="aceptarCookie" />
    </template>
  </q-banner>
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
export default defineComponent({
  name: "App",
  setup() {
    const $q = useQuasar();
    let cookie = false;

    if ($q.localStorage.has("cookie")) {
      cookie = $q.localStorage.getItem("cookie");
    }

    function aceptarCookie(e) {
      const cookieBanner = document.getElementById("cookie-banner")
      cookieBanner.style.display = "none"
      $q.localStorage.set("cookie", true);
    }
    $q.addressbarColor.set("#FF913E");
    return {
      cookie,
      aceptarCookie,
    };
  },
});
</script>
