<template>
  <q-card class="my-card">
    <!-- Botón para abrir un enlace o redirigir a una ruta según la prop 'reload' -->
    <q-btn
      v-ripple
      class="btn-card cursor-pointer q-hoverable img-hover"
      flat
      @click="linkClick"
      :to=" reload ? { name: 'DescipcionPelicula', params: { id: id } } : { name: 'CargandoPeli', params: { id: id } } "
    >
      <span class="q-focus-helper"></span>
      <img class="cartelera-img" :src="poster" />
    </q-btn>

    <!-- Botones de acción para guardar la tarjeta y compartir el enlace -->
    <q-card-actions align="left">
      <q-btn flat round color="teal" icon="bookmark" @click="GuardarLista" />
      <q-btn
        flat
        round
        class="color-focus"
        color="primary"
        icon="share"
        @click="Compartir"
      />
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
  props: {
    id: String,
    nombre: String,
    descripcion: String,
    categorias: Array,
    valoracion: Number,
    poster: String,
    imagenFondo: String,
    logo: String,
    linkVideostation: String,
    reload: Boolean, // Propiedad para determinar si el botón de acción debe redirigir a una nueva página o abrir un enlace
  },

  setup(props) {
    const $q = useQuasar();
    const user = $q.localStorage.getItem("user"); // Obtiene el usuario de LocalStorage

    function GuardarLista() {
      GuardarTargetaUsuario(props.id, user.email); // Llama a una función para guardar la tarjeta en la lista del usuario actual
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
      LocalStorage.set("peliActual", propsGuardados); // Guarda las propiedades de la tarjeta actual en LocalStorage
      e.preventDefault(); // Previene el comportamiento por defecto del evento click
      setTimeout(() => {
        go(); // Redirige a la página correspondiente después de 500ms
      }, 500);
    }

    function Compartir() {
      navigator.clipboard
        .writeText(window.location.host + "/pelicula/" + props.id) // Copia el enlace de la página actual al portapapeles
        .then(() => {
          $q.notify({
            message: "Enlace copiado al portapapeles",
            type: "positive",
            position: "bottom-right",
          }); // Muestra una notificación de éxito al usuario
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
  color: #ff6f00 !important;
}

.img-hover {
  border: 2px solid transparent;
}

.img-hover:hover {
  border: 2px solid;
}
</style>
