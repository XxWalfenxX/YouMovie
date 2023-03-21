<template>
  <q-layout view="hhh lpR fFf">
    <q-header class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="infinite">
          <q-avatar square>
            <img style="color: white" src="~assets/YouMovieLogoWhite.svg" />
          </q-avatar>
          YouMovie
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab to="/" label="Inicio" />
        <q-route-tab to="/buscar" label="Buscar" />
        <q-route-tab to="/mi-lista" label="Mi Lista" />
      </q-tabs>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" side="left" overlay>
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img
              src="https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/FAC32106A784964476DEBAA3A4E0978A8C6C88F76195AC4F83DBFCD232991ECD/"
            />
          </q-avatar>
          <div class="text-weight-bold">Walfen</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Mi cuenta",
    icon: "person",
    link: "https://quasar.dev",
  },
  {
    title: "Ayuda",
    icon: "help",
    link: "https://quasar.dev",
  },
  {
    title: "Donar",
    icon: "attach_money",
    link: "https://quasar.dev",
  },
  {
    title: "Cerrar Sesión",
    icon: "logout",
    link: "https://quasar.dev",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
