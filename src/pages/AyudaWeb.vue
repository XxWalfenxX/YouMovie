<template>
  <div class="q-pa-md">
    <h3>Ayuda</h3>
    <q-list bordered class="rounded-borders">
      <q-expansion-item expand-separator label="¿Qué es YouMovie?">
        <q-card>
          <q-card-section>
            YouMovie es un servicio de streaming que permite a sus usuarios ver
            películas a través de su página web o aplicación movil.
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item expand-separator label="¿Cómo cambio mi contraseña?">
        <q-card>
          <q-card-section>
            Para cambiar tu contraseña, pulsa en el botón de haburguesa, situado
            en la parte superior izquierda de la pantalla. Se desplegará el menú
            de usuario <q-icon name="menu" color="primary"></q-icon> y pulsamos
            en la opción "<q-icon name="person" color="primary"></q-icon> Mi
            Cuenta". Que nos redigirá a la página de gestión de usuario, en esta
            página, puslamos sobre el campo de contraseña e introducimos una
            nueva, para aplicar los cambios pulsamos en el botón Cambiar
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item
        expand-separator
        label="¿Es necesario una conexión de alta velocidad para reproducir una pelicula?"
      >
        <q-card>
          <q-card-section>
            No, no necesitas una alta velocidad, se recomienda que la velocidad
            sea de 25mbps, pero puedes ajustar la calidad de la película en los
            ajustes del reproductor
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AyudaWeb",
});
</script>
