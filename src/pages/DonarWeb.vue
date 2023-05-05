<template>
  <div class="q-pa-md">
    <div class="row justify-center">
      <div class="q-gutter-y-md" style="width: 100em">
        <q-card>
          <!-- Definimos un componente de pestañas -->
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="donar" label="Donar" /> <!-- Agregamos una pestaña con etiqueta 'Donar' y nombre 'donar'-->
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated> <!-- Definimos el panel de pestañas -->
            <q-tab-panel name="donar"> <!-- Definimos un panel de pestañas para la pestaña 'donar' -->
              <div class="column flex-center">
                <div class="text-h6">¿Te gusta YouMovie?</div>
                <p>Con una donación puedes ayudar a que sigamos funcionando</p>
                <q-btn
                  label="Donar"
                  icon="attach_money"
                  color="primary"
                  href="https://youtu.be/dQw4w9WgXcQ"
                />
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "DonarWeb",
  setup() {
    return {
      tab: ref("donar"),  // Inicializamos el estado activo de la pestaña en 'donar'
    };
  },
});
</script>
