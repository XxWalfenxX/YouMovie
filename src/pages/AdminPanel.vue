<template>
  <div>
    <q-splitter
      v-model="splitterModel"
      class="centrado"
      disable
      unit="px"
    >

      <template v-slot:before>
        <q-tabs
          v-model="tab"
          vertical
          class="text-primary"
        >
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
          <q-tab-panel name="add">
            <AgregarPeli/>
          </q-tab-panel>

          <q-tab-panel name="modify">
            <div class="text-h4 q-mb-md">Alarms</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
          </q-tab-panel>

          <q-tab-panel name="remove">
            <EliminarPelicula/>
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

export default defineComponent({
  name: "AdminPanel",

  components:{
    AgregarPeli,
    EliminarPelicula,
  },

  setup() {
    return {
      tab: ref('add'),
      splitterModel: ref(200)
    };
  },
});
</script>
<style>
.centrado {
    height: calc(100vh - 98px);
}

</style>
