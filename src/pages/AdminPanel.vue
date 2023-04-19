<template>
  <div>
    <q-splitter v-model="splitterModel" class="centrado" disable unit="px">
      <template v-slot:before>
        <q-tabs v-model="tab" vertical class="text-primary">
          <q-tab name="add" icon="add" label="Agregar Pelicula" />
          <q-tab name="modify" icon="edit" label="Modificar Pelicula" />
          <q-tab name="remove" icon="remove" label="Eliminar Pelicula" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="add" style="padding: 0">
            <AgregarPeli />
          </q-tab-panel>

          <q-tab-panel name="modify" style="padding: 0">
            <EditarPeli />
          </q-tab-panel>

          <q-tab-panel name="remove" style="padding: 0">
            <EliminarPelicula />
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import AgregarPeli from "src/components/AgregarPeli.vue";
import EliminarPelicula from "src/components/EliminarPelicula.vue";
import EditarPeli from "src/components/EditarPeli.vue";

export default defineComponent({
  name: "AdminPanel",

  components: {
    AgregarPeli,
    EliminarPelicula,
    EditarPeli,
  },

  setup() {
    return {
      tab: ref("add"),
      splitterModel: ref(200),
    };
  },
});
</script>
<style>
.centrado {
  height: 100vh - 98px;
}
</style>
