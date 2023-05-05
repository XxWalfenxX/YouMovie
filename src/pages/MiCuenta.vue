<template>
  <!-- Contenedor principal -->
  <div class="q-pa-md">
    <!-- Sección para actualizar nombre, contraseña e imagen de perfil -->
    <div class="row justify-center">
      <div class="col-md-5 col-8">
        <h5>Actualizar información de tu cuenta</h5>
        <q-form @submit="cambiarNombre" class="q-gutter-md">
          <div class="flex items-center" style="margin-bottom: 2em">
            <q-input
              name="name"
              v-model="userName"
              label="Nombre"
              filled
              clearable
              style="width: 30em"
            >
            </q-input>
            <div class="q-ma-sm">
              <q-btn
                v-if="userName !== null && userName !== ''"
                label="Actualizar"
                type="submit"
                color="primary"
              />
            </div>
          </div>
        </q-form>
        <q-form @submit="cambiarPasswd" class="q-gutter-md">
          <div class="flex items-center" style="margin-bottom: 2em">
            <q-input
              name="name"
              v-model="passwd"
              label="Contraseña"
              :type="isPwd ? 'password' : 'text'"
              filled
              clearable
              style="width: 30em"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <div class="q-ma-sm">
              <q-btn
                v-if="passwd !== null && passwd !== ''"
                label="Actualizar"
                type="submit"
                color="primary"
              />
            </div>
          </div>
        </q-form>
        <q-form
          @submit="cambiarImagen"
          class="q-gutter-md"
          enctype="multipart/form-data"
        >
          <div class="flex items-center">
            <q-file
              name="poster_file"
              v-model="file"
              outlined
              filled
              clearable
              label="Imagen"
              accept="image/*"
              style="width: 30em; max-width: 30em"
            >
              <template v-slot:prepend>
                <q-icon name="image" />
              </template>
            </q-file>
            <div class="q-ma-sm">
              <q-btn
                v-if="file !== null && file !== ''"
                label="Actualizar"
                type="submit"
                color="primary"
              />
            </div>
          </div>
        </q-form>
        <div class="flex items-center" style="margin-top: 2em">
          <div class="text-body1">Modo Oscuro</div>
          <q-toggle
            color="blue"
            v-model="darkMode"
            @update:model-value="updateDarkMode"
            val="dark-mode"
          />
        </div>
      </div>
      <!-- Sección para eliminar cuenta -->
      <div class="col-md-2 col-8">
        <h5>Gestionar tu cuenta</h5>
        <q-btn color="red" @click="confirm = true">ELIMINAR CUENTA</q-btn>
      </div>
    </div>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-icon name="info" color="primary" size="3em" />
          <span class="q-ml-sm">¿Deseas eliminar tu cuenta para siempre?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn
            flat
            label="ELIMINAR"
            color="primary"
            v-close-popup
            @click="eliminar()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { useQuasar, LocalStorage } from "quasar";
import { ref } from "vue";
import cambiarImagenCuenta from "src/firebase/ActualizarImagen";
import cambiarNombreUsuario from "src/firebase/ActualizarUsername";
import actualizarPasswd from "src/firebase/ActualizarPasswd";
import EliminarUsuario from "src/firebase/EliminarCuenta";
import { useRouter } from "vue-router";

export default {
  setup() {
    const $q = useQuasar();
    const user = $q.localStorage.getItem("user");
    const router = useRouter();

    // Comprueba si se ha establecido una preferencia de modo oscuro en el almacenamiento local
    // Si es así, lo usa; de lo contrario, establece la preferencia predeterminada actual y la guarda en el almacenamiento local
    let darkModeEnabled = $q.dark.isActive;
    if ($q.localStorage.has("darkMode")) {
      const darkModeStorage = $q.localStorage.getItem("darkMode");
      darkModeEnabled = darkModeStorage;
      $q.dark.set(darkModeEnabled);
    } else {
      $q.localStorage.set("darkMode", $q.dark.isActive);
    }
    const darkMode = ref(darkModeEnabled);

    // Actualiza el modo oscuro cuando el usuario lo cambia
    function updateDarkMode() {
      $q.dark.set(darkMode.value);
      $q.localStorage.set("darkMode", darkMode.value);
    }

    return {
      file: ref(null),
      userName: ref(null),
      passwd: ref(null),
      confirm: ref(false),
      isPwd: ref(true),
      darkMode,
      updateDarkMode,

      // Función que reinicia las validaciones del formulario
      reset() {
        this.file.value.resetValidation();
        this.userName.value.resetValidation();
      },

      // Función que actualiza la imagen de perfil del usuario
      cambiarImagen(evt) {
        cambiarImagenCuenta(evt, user);
      },

      // Función que actualiza el nombre de usuario del usuario
      cambiarNombre(evt) {
        cambiarNombreUsuario(evt.target[0].value);
      },

      // Función que actualiza la contraseña del usuario
      cambiarPasswd(evt) {
        actualizarPasswd(evt.target[0].value);
      },

      // Función que elimina la cuenta del usuario actual
      eliminar() {
        if (EliminarUsuario(user.email)) {
          LocalStorage.remove("user");
          router.push("/login");
        }
      },
    };
  },
};
</script>
