<template>
  <q-card class="q-ma-xl sombra">
    <div class="row">
      <!-- Barra lateral -->
      <div class="col-0 col-sm-5 bg-primary rounded-left-borders xs-hide">
        <div
          class="row full-width q-px-xl q-pb-xl full-height flex flex-center"
        >
          <div class="">
            <div
              class="text-h4 text-uppercase text-white fredoka"
              style="min-width: 220px"
            >
              <q-img src="~assets/YouMovieLogoWhite.svg" ></q-img>
            </div>
            <div class="text-white q-my-sm text-h5 text-center infinite">YouMovie</div>
          </div>
        </div>
      </div>

      <!-- Formulario de inicio de sesión -->
      <div class="col-12 col-sm-7">
        <div class="row q-pa-sm-sm q-pa-md">
          <div class="col-12">
            <q-card-section>
              <div class="q-mb-xl">
                <div class="flex justify-center">
                  <div
                    class="text-h4 text-uppercase q-my-none text-weight-bold text-primary fredoka"
                  >
                    Iniciar sesión
                  </div>
                </div>
              </div>

              <!-- Formulario de inicio de sesión -->
              <q-form ref="form" class="q-gutter-md" @submit="submit">
                <q-input v-model="user.email" label="Email" name="Email" type="email" :rules="[val => !!val || 'Campo obligatorio']"/>

                <q-input
                  :rules="[val => !!val || 'Campo obligatorio']"
                  v-model="user.password"
                  label="Contraseña"
                  name="password"
                  type="password"
                />

                <div>
                  <!-- Botón de inicio de sesión -->
                  <q-btn
                    class="full-width fredoka"
                    color="primary"
                    label="Iniciar Sesión"
                    rounded
                    type="submit"
                  ></q-btn>

                  <div class="q-mt-lg">
                    <div class="q-mt-sm">
                      ¿Aún no tienes una cuenta?
                      <!-- Enlace para crear una cuenta nueva -->
                      <router-link class="text-primary" to="/register"
                        >Crear cuenta</router-link
                      >
                    </div>
                    <div class="q-mt-sm">
                      ¿Has olvidado tu contraseña?
                      <!-- Enlace para restablecer la contraseña -->
                      <router-link class="text-primary" to="/reset-passwd"
                        >Restablece tu contraseña</router-link
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
import { ref, reactive } from "vue"; // Importamos las funciones "ref" y "reactive" de Vue
import login from "src/firebase/firebase-login"; // Importamos la función de inicio de sesión desde Firebase
import { useRouter } from "vue-router"; // Importamos la función "useRouter" de Vue Router
import { LocalStorage } from "quasar"; // Importamos la función de almacenamiento local de Quasar

// Creamos un objeto "user" reactivo que almacena los datos del usuario para el inicio de sesión
const user = reactive({
  email: null,
  password: null,
});

// Creamos una referencia "form" que se utilizará para validar y enviar el formulario de inicio de sesión
const form = ref(null);

// Usamos la función "useRouter" para obtener la instancia del enrutador de Vue Router
const router = useRouter();

// Creamos una función "submit" que se ejecutará cuando el usuario envíe el formulario de inicio de sesión
const submit = async () => {
  // Validamos el formulario utilizando la referencia "form"
  if (form.value.validate()) {
    try {
      // Utilizamos la función de inicio de sesión desde Firebase para iniciar sesión con los datos del usuario
      await login(user);

      // Si el inicio de sesión fue exitoso, redirigimos al usuario a la página principal de la aplicación
      router.push("/app");
    } catch (err) {
      // Si hay un error durante el inicio de sesión, eliminamos cualquier información de usuario almacenada en la memoria local
      LocalStorage.remove("user");
    }
  }
};
</script>
<style>
.sombra {
  box-shadow: var(--sombra)
}

div.q-img__container.absolute-full {
  overflow: hidden;
}

</style>
