<template>
  <!-- Este es el componente principal de la tarjeta que envuelve el formulario -->
  <q-card class="q-ma-xl sombra">
    <div class="row">
      <!-- Este div es una columna que muestra un fondo azul solo en pantallas de escritorio -->
      <div class="col-0 col-sm-5 bg-primary rounded-left-borders xs-hide">
        <div
          class="row full-width q-px-xl q-pb-xl full-height flex flex-center"
        >
          <div class="">
            <div
              class="text-h4 text-uppercase text-white fredoka"
              style="min-width: 220px"
            >
              <!-- Logo de YouMovie -->
              <q-img src="~assets/YouMovieLogoWhite.svg"></q-img>
            </div>
            <div class="text-white q-my-sm text-h5 text-center infinite">YouMovie</div>
          </div>
        </div>
      </div>

      <!-- Este div es una columna que ocupa el resto del ancho en todas las pantallas -->
      <div class="col-12 col-sm-7">
        <div class="row q-pa-sm-sm q-pa-md">
          <div class="col-12">
            <q-card-section>
              <div class="q-mb-xl">
                <div class="flex justify-center">
                  <div
                    class="text-h4 text-uppercase q-my-none text-weight-bold text-primary fredoka"
                  >
                    <!-- Título de la sección de restablecimiento de contraseña -->
                    Restablecer Contraseña
                  </div>
                </div>
              </div>

              <!-- Formulario de restablecimiento de contraseña -->
              <q-form ref="form" class="q-gutter-md" @submit="submit">
                <q-input v-model="user.email" label="Email" type="email" name="Email" :rules="[val => !!val || 'Campo obligatorio']"/>

                <div>
                  <!-- Botón para enviar el formulario -->
                  <q-btn
                    class="full-width fredoka"
                    color="primary"
                    label="Enviar correo de recuperación"
                    rounded
                    type="submit"
                  ></q-btn>

                  <div class="q-mt-lg">
                    <div class="q-mt-sm">
                      ¿Aún no tienes una cuenta?
                      <!-- Enlace para ir a la página de registro -->
                      <router-link class="text-primary" to="/register"
                        >Crear cuenta</router-link
                      >
                    </div>
                    <div class="q-mt-sm">
                      <!-- Enlace para ir a la página de inicio de sesión -->
                      <router-link class="text-primary" to="/"
                        >Iniciar Sesión</router-link
                      >
                    </div>
                  </div>
                </div>
              </q-form>
            </q-card-section>
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { ref, reactive } from "vue";
import restablecerPass from "src/firebase/EmailRecuperacion";
import { useRouter } from "vue-router";

const user = reactive({
  email: null,
});

const form = ref(null);
const router = useRouter();

const submit = async () => {
  if (form.value.validate()) {
    // Función para enviar el correo de recuperación de contraseña
    restablecerPass(user.email);
    // Redireccionar al usuario a la página de inicio de sesión
    router.push("/");
  }
};
</script>

<style>
.sombra {
  box-shadow: var(--sombra);
}
div.q-img__container.absolute-full {
  overflow: hidden;
}

</style>
