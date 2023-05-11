// Importar los módulos necesarios de Firebase y Quasar
import { auth } from "./index";
import { updateProfile, onAuthStateChanged } from "firebase/auth";
import { LocalStorage, Notify } from "quasar";
import { errorMSG } from "./StringsFirebase.js";

// Función para cambiar el nombre de usuario
const cambiarNombreUsuario = (username) => {
  // Verificar que el nombre de usuario no esté vacío
  if (username != "") {
    // Obtener el objeto auth de Firebase


    // Actualizar el nombre de usuario en Firebase Authentication
    updateProfile(auth.currentUser, {
      displayName: username,
    })
      .then(() => {
        // Actualizar el usuario en el almacenamiento local y mostrar una notificación de éxito al usuario
        onAuthStateChanged(auth, (user) => {
          if (user) {
            LocalStorage.set("user", user);
            Notify.create({
              type: "positive",
              position: "bottom-right",
              message: "Se ha actualizado el nombre de usuario",
            });
          }
        });
      })
      .catch((error) => {
        // Mostrar una notificación de error al usuario si se produce un error al actualizar el nombre de usuario
        Notify.create({
          type: "negative",
          position: "bottom-right",
          message: errorMSG(error.code),
        });
      });
  }
};

// Exportar la función para que pueda ser utilizada desde otros módulos
export default cambiarNombreUsuario;
