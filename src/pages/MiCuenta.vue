<template>
  <div class="q-pa-md">
    <div class="row justify-center">
      <div class="col-md-5 col-8">
        <h5>Actualizar información de tu cuenta</h5>
        <q-form @submit="cambiarNombre" class="q-gutter-md">
          <p>Cambiar nombre de usuario</p>
          <div class="flex items-center">
            <q-input
              name="name"
              v-model="userName"
              label="Nombre"
              filled
              clearable
            >
            </q-input>
            <div class="q-ma-sm">
              <q-btn label="Cambiar" type="submit" color="primary" />
            </div>
          </div>
        </q-form>
        <q-form @submit="cambiarPasswd" class="q-gutter-md">
          <p>Cambiar contraseña</p>
          <div class="flex items-center">
            <q-input
              name="name"
              v-model="passwd"
              label="Contraseña"
              :type="isPwd ? 'password' : 'text'"
              filled
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
              <q-btn label="Cambiar" type="submit" color="primary" />
            </div>
          </div>
        </q-form>
        <q-form
          @submit="cambiarImagen"
          class="q-gutter-md"
          enctype="multipart/form-data"
        >
          <p>Cambiar foto de perfil</p>
          <div class="flex items-center">
            <q-file
              name="poster_file"
              v-model="file"
              outlined
              filled
              clearable
              label="Imagen"
              accept="image/*"
              style="max-width: 300px"
            >
              <template v-slot:prepend>
                <q-icon name="image" />
              </template>
            </q-file>
            <div class="q-ma-sm">
              <q-btn label="Cambiar" type="submit" color="primary" />
            </div>
          </div>
        </q-form>
      </div>
      <div class="col-md-2 col-8">
        <h5>Gestionar tu cuenta</h5>
        <q-btn color="red" @click="eliminar()">ELIMINAR CUENTA</q-btn>
      </div>
    </div>
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
    return {
      file: ref(null),
      userName: ref(null),
      passwd: ref(null),
      isPwd: ref(true),

      reset() {
        this.file.value.resetValidation();
        this.userName.value.resetValidation();
      },

      cambiarImagen(evt) {
        cambiarImagenCuenta(evt, user);
      },

      cambiarNombre(evt) {
        cambiarNombreUsuario(evt.target[0].value);
      },

      cambiarPasswd(evt) {
        actualizarPasswd(evt.target[0].value);
      },
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
