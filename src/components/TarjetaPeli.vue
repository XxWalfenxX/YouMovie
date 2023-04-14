<template>
  <q-card class="my-card">
    <q-btn
      v-ripple
      class="btn-card cursor-pointer q-hoverable"
      flat
      @click="linkClick"
      :to="{ name: 'DescipcionPelicula', params: { id: id } }"
    >
      <span class="q-focus-helper"></span>
      <img class="cartelera-img" :src="poster" />
    </q-btn>

    <q-card-actions align="left">
      <q-btn flat round color="teal" icon="bookmark" @click="GuardarLista" />
      <q-btn flat round class="color-focus" color="primary" icon="share" @click="Compartir" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";
import { LocalStorage } from "quasar";
import GuardarTargetaUsuario from "src/firebase/GuardarTargetaUsuario";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "TarjetaPeli",
  props: [
    "id",
    "nombre",
    "descripcion",
    "categorias",
    "valoracion",
    "poster",
    "imagenFondo",
    "logo",
    "linkVideostation",
  ],

  setup(props) {
    const $q = useQuasar();
    const user = $q.localStorage.getItem("user");

    function GuardarLista() {
      GuardarTargetaUsuario(props.id, user.email);
    }

    function linkClick(e, go) {
      const propsGuardados = {
        id: props.id,
        nombre: props.nombre,
        descripcion: props.descripcion,
        categorias: props.categorias,
        valoracion: props.valoracion,
        poster: props.poster,
        imagenFondo: props.imagenFondo,
        logo: props.logo,
        linkVideostation: props.linkVideostation,
      };
      LocalStorage.set("peliActual", propsGuardados);
      e.preventDefault();
      setTimeout(() => {
        go();
      }, 500);
    }
    function Compartir() {
      navigator.clipboard.writeText(window.location.host+"/pelicula/"+props.id).then(() => {
        $q.notify({
          message: "Enlace copiado al portapapeles",
          type: "positive",
          position: "bottom-right",
        });
      });
    }
    return { linkClick, GuardarLista, Compartir };
  },
});
</script>

<style>
:root {
  --card-border: 10px;
}

.my-card {
  width: auto;
  max-width: 300px;
  border-radius: var(--card-border);
  margin-right: 1rem;
}

.btn-card {
  position: relative;
  padding: 0;
  border-radius: var(--card-border);
}

.cartelera-img {
  border-radius: var(--card-border);
  pointer-events: none;
}

.color-focus:hover {
  color: #ff6f00 !important;;
}
</style>
