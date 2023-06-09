<template>
  <q-layout view="hHh Lpr fFf">
    <!-- Encabezado -->
    <q-header class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="infinite">
          <router-link to="/" style="text-decoration: none; color: white">
            <q-avatar square>
              <img style="color: white" src="~assets/YouMovieLogoWhite.svg" />
            </q-avatar>
            YouMovie
          </router-link>
        </q-toolbar-title>
        <q-btn flat @click="confirm = true">Cerrar sesión</q-btn>
      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab to="/app" label="Inicio" />
        <q-route-tab to="/buscar" label="Buscar" />
        <q-route-tab to="/mi-lista" label="Mi Lista" />
      </q-tabs>
    </q-header>

    <!-- Cajón izquierdo -->
    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      overlay
      :class="$q.dark.isActive ? 'bg-dark' : 'bg-grey-3'"
    >
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <!-- Renderiza los enlaces esenciales -->
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="~assets/bg-user.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img v-if="avatar != null" :src="avatar" />
            <img v-else src="~assets/default.jpg" />
          </q-avatar>
          <div class="text-weight-bold">{{ name }}</div>
        </div>
      </q-img>
    </q-drawer>

    <!-- Contenido principal -->
    <q-page-container>
      <q-dialog v-model="confirm" persistent>
        <!-- Dialogo de confirmación para cerrar sesión -->
        <q-card>
          <q-card-section class="row items-center">
            <q-icon name="info" color="primary" size="3em" />
            <span class="q-ml-sm">¿Deseas cerrar tu sesión?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" v-close-popup />
            <q-btn
              flat
              label="Cerrar sesión"
              color="primary"
              v-close-popup
              @click="logout"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <!-- Renderiza el componente asociado a la ruta actual -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import signout from "src/firebase/firebase-signout";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import AdminAuth from "src/firebase/AdminAuth";

const linksList = [
  {
    title: "Mi cuenta",
    icon: "person",
    link: "/mi-cuenta",
  },
  {
    title: "Ayuda",
    icon: "help",
    link: "/ayuda",
  },
  {
    title: "Donar",
    icon: "attach_money",
    link: "/donar",
  },
];

const router = useRouter();

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const $q = useQuasar();
    const leftDrawerOpen = ref(false);
    const router = useRouter();
    const user = $q.localStorage.getItem("user");

    const state = reactive({
      linksList: linksList,
    });

    // Escuchar eventos del teclado
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 27) {
        leftDrawerOpen.value = false;
      }
    });

    // Verificar si el usuario es administrador
    state.admin = AdminAuth(user.email).then((v) => {
      const admin = linksList.some((link) => link.link === '/admin');
      if (v == true && admin == false) {
        linksList.push({
          title: "Administración",
          icon: "build",
          link: "/admin",
        });
      } else if (v == false && admin == true) {
        linksList.pop()
      }
    });

    // Función para cerrar sesión
    const logout = () => {
      signout().then(() => {
        router.push("/login");
      });
    };

    let linkIMG = user.photoURL;

    // Retornar variables y funciones para ser usadas en el template
    return {
      avatar: linkIMG,
      name: user.displayName,
      essentialLinks: linksList,
      logout: logout,
      confirm: ref(false),
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      state,
    };
  },
});
</script>

<style>
.icono {
  font-size: 2em;
}
</style>
