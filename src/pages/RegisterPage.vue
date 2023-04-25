<template>
  <q-card class="q-ma-xl sombra">
    <div class="row">
      <div class="col-0 col-sm-5 bg-primary rounded-left-borders xs-hide">
        <div
          class="row full-width q-px-xl q-pb-xl full-height flex flex-center"
        >
          <div class="">
            <div
              class="text-h4 text-uppercase text-white fredoka"
              style="min-width: 220px"
            >
              <q-img src="~assets/YouMovieLogoWhite.svg"></q-img>
            </div>
            <div class="text-white q-my-sm text-h5 text-center">YouMovie</div>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-7">
        <div class="row q-pa-sm-sm q-pa-md">
          <div class="col-12">
            <q-card-section>
              <div class="q-mb-xl">
                <div class="flex justify-center">
                  <div
                    class="text-h4 text-uppercase q-my-none text-weight-bold text-primary fredoka"
                  >
                    Registrar cuenta
                  </div>
                </div>
              </div>

              <q-form ref="form" class="q-gutter-md" @submit="submit">
                <q-input
                  v-model="user.name"
                  label="Nombre de usuario"
                  name="First Name"
                />
                <q-input v-model="user.email" label="Email" name="Email" />
                <q-input
                  v-model="user.password"
                  label="Contraseña"
                  name="password"
                  type="password"
                />

                <div>
                  <q-btn
                    class="full-width fredoka"
                    color="primary"
                    label="Crear Cuenta"
                    rounded
                    type="submit"
                  ></q-btn>

                  <div class="q-mt-lg">
                    <div class="q-mt-sm">
                      ¿Ya tienes una cuenta?
                      <router-link class="text-primary" to="/login"
                        >Iniciar sesión</router-link
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
import register from "src/firebase/firebase-register";
import { useRouter } from "vue-router";

const user = reactive({
  name: null,
  email: null,
  password: null,
});

const form = ref(null);
const router = useRouter();

const submit = async () => {
  if (form.value.validate() && !!(await register(user))) {
    router.push("/app");
  }
};
</script>

<style>
.sombra {
  box-shadow: var(--sombra);
}

</style>
