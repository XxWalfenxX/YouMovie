<template>
  <q-layout view="lHh Lpr lFf"> <!-- Definimos el diseño de la página -->
    <q-page-container class="pt-0-important"> <!-- Creamos el contenedor de la página -->
      <q-page> <!-- Agregamos una página -->
        <div class="row" style="height: 100vh"> <!-- Agregamos una fila con una altura del 100% de la pantalla -->
          <div class="col-12 flex content-center justify-center"> <!-- Agregamos una columna con ancho de 12 y centrada en el contenido -->
            <router-view /> <!-- Agregamos la vista del router -->
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>


<style scoped>
.wave {
  position: fixed;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: 0;
}

.login-image {
  z-index: 1;
}

.bg-auth {
  background-color: #f0f4f3;
  background-image: url("src/assets/bg-auth.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.blur {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
}
</style>
